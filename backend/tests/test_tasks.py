"""Task CRUD, ownership (IDOR), and cascade tests."""

from fastapi.testclient import TestClient
from sqlalchemy import delete, select
from sqlalchemy.orm import Session

from app.core.security import create_access_token, hash_password
from app.models.task import Task
from app.models.user import User

PASSWORD = "SecurePassword123!"


def _create_user(
    db_session: Session,
    email: str,
    full_name: str = "Test User",
) -> User:
    user = User(
        email=email,
        hashed_password=hash_password(PASSWORD),
        full_name=full_name,
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user


def _headers(user: User) -> dict[str, str]:
    return {"Authorization": f"Bearer {create_access_token(user.id)}"}


def _payload(**overrides: object) -> dict[str, object]:
    data: dict[str, object] = {
        "title": "Task title",
        "description": "Task description",
        "status": "TODO",
        "priority": "MEDIUM",
        "due_date": None,
    }
    data.update(overrides)
    return data


def _create_task(
    client: TestClient,
    user: User,
    **overrides: object,
) -> object:
    return client.post(
        "/api/v1/tasks",
        json=_payload(**overrides),
        headers=_headers(user),
    )


def test_create_task(
    client: TestClient,
    db_session: Session,
) -> None:
    user = _create_user(db_session, "owner@example.com")

    response = _create_task(client, user)

    assert response.status_code == 201
    body = response.json()
    assert body["title"] == "Task title"
    assert body["description"] == "Task description"
    assert body["status"] == "TODO"
    assert body["priority"] == "MEDIUM"
    assert body["due_date"] is None
    assert body["user_id"] == user.id


def test_create_task_with_minimal_fields(
    client: TestClient,
    db_session: Session,
) -> None:
    user = _create_user(db_session, "owner@example.com")

    response = client.post(
        "/api/v1/tasks",
        json={"title": "Minimal"},
        headers=_headers(user),
    )

    assert response.status_code == 201
    body = response.json()
    assert body["status"] == "TODO"
    assert body["priority"] == "MEDIUM"
    assert body["description"] is None
    assert body["due_date"] is None


def test_create_task_with_past_due_date(
    client: TestClient,
    db_session: Session,
) -> None:
    user = _create_user(db_session, "owner@example.com")

    response = _create_task(
        client,
        user,
        due_date="2000-01-01T00:00:00Z",
    )

    assert response.status_code == 201
    assert response.json()["due_date"].startswith("2000-01-01")


def test_title_is_trimmed(
    client: TestClient,
    db_session: Session,
) -> None:
    user = _create_user(db_session, "owner@example.com")

    response = _create_task(client, user, title="  Buy milk  ")

    assert response.status_code == 201
    assert response.json()["title"] == "Buy milk"


def test_list_own_tasks_newest_first(
    client: TestClient,
    db_session: Session,
) -> None:
    user = _create_user(db_session, "owner@example.com")
    first = _create_task(client, user, title="First").json()
    second = _create_task(client, user, title="Second").json()

    response = client.get("/api/v1/tasks", headers=_headers(user))

    assert response.status_code == 200
    ids = [item["id"] for item in response.json()]
    assert ids == [second["id"], first["id"]]


def test_get_own_task(
    client: TestClient,
    db_session: Session,
) -> None:
    user = _create_user(db_session, "owner@example.com")
    task = _create_task(client, user).json()

    response = client.get(
        f"/api/v1/tasks/{task['id']}",
        headers=_headers(user),
    )

    assert response.status_code == 200
    assert response.json()["id"] == task["id"]


def test_get_nonexistent_task_returns_404(
    client: TestClient,
    db_session: Session,
) -> None:
    user = _create_user(db_session, "owner@example.com")

    response = client.get(
        "/api/v1/tasks/999999",
        headers=_headers(user),
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Task not found"


def test_full_update_task(
    client: TestClient,
    db_session: Session,
) -> None:
    user = _create_user(db_session, "owner@example.com")
    task = _create_task(client, user).json()

    response = client.put(
        f"/api/v1/tasks/{task['id']}",
        json={
            "title": "Updated title",
            "description": None,
            "status": "DONE",
            "priority": "HIGH",
            "due_date": None,
        },
        headers=_headers(user),
    )

    assert response.status_code == 200
    body = response.json()
    assert body["title"] == "Updated title"
    assert body["description"] is None
    assert body["status"] == "DONE"
    assert body["priority"] == "HIGH"
    assert body["due_date"] is None
    assert body["user_id"] == user.id


def test_put_requires_all_declared_fields(
    client: TestClient,
    db_session: Session,
) -> None:
    user = _create_user(db_session, "owner@example.com")
    task = _create_task(client, user).json()

    incomplete_payloads = [
        {"title": "Only title"},
        {
            "title": "No description key",
            "status": "DONE",
            "priority": "HIGH",
            "due_date": None,
        },
        {
            "title": "No due date key",
            "description": None,
            "status": "DONE",
            "priority": "HIGH",
        },
        {
            "description": None,
            "status": "DONE",
            "priority": "HIGH",
            "due_date": None,
        },
    ]

    for payload in incomplete_payloads:
        response = client.put(
            f"/api/v1/tasks/{task['id']}",
            json=payload,
            headers=_headers(user),
        )
        assert response.status_code == 422, payload


def test_update_task_status(
    client: TestClient,
    db_session: Session,
) -> None:
    user = _create_user(db_session, "owner@example.com")
    task = _create_task(client, user).json()

    response = client.patch(
        f"/api/v1/tasks/{task['id']}/status",
        json={"status": "IN_PROGRESS"},
        headers=_headers(user),
    )

    assert response.status_code == 200
    assert response.json()["status"] == "IN_PROGRESS"


def test_delete_task(
    client: TestClient,
    db_session: Session,
) -> None:
    user = _create_user(db_session, "owner@example.com")
    task = _create_task(client, user).json()

    response = client.delete(
        f"/api/v1/tasks/{task['id']}",
        headers=_headers(user),
    )

    assert response.status_code == 204

    follow_up = client.get(
        f"/api/v1/tasks/{task['id']}",
        headers=_headers(user),
    )
    assert follow_up.status_code == 404


def test_blank_title_is_rejected(
    client: TestClient,
    db_session: Session,
) -> None:
    user = _create_user(db_session, "owner@example.com")

    for title in ["", "   "]:
        response = _create_task(client, user, title=title)
        assert response.status_code == 422


def test_invalid_status_is_rejected(
    client: TestClient,
    db_session: Session,
) -> None:
    user = _create_user(db_session, "owner@example.com")

    response = _create_task(client, user, status="INVALID")

    assert response.status_code == 422


def test_invalid_priority_is_rejected(
    client: TestClient,
    db_session: Session,
) -> None:
    user = _create_user(db_session, "owner@example.com")

    response = _create_task(client, user, priority="URGENT")

    assert response.status_code == 422


def test_user_id_cannot_be_spoofed_on_create(
    client: TestClient,
    db_session: Session,
) -> None:
    user = _create_user(db_session, "owner@example.com")
    other = _create_user(db_session, "other@example.com")

    response = _create_task(client, user, user_id=other.id)

    assert response.status_code == 422


def test_unauthenticated_task_requests_are_rejected(
    client: TestClient,
) -> None:
    assert client.post("/api/v1/tasks", json={"title": "x"}).status_code == 401
    assert client.get("/api/v1/tasks").status_code == 401


def test_user_cannot_access_other_users_task(
    client: TestClient,
    db_session: Session,
) -> None:
    user_a = _create_user(db_session, "a@example.com")
    user_b = _create_user(db_session, "b@example.com")
    task_b = _create_task(client, user_b, title="User B task").json()

    headers_a = _headers(user_a)
    task_url = f"/api/v1/tasks/{task_b['id']}"

    assert client.get(task_url, headers=headers_a).status_code == 404
    assert (
        client.put(
            task_url,
            json=_payload(title="Hijacked"),
            headers=headers_a,
        ).status_code
        == 404
    )
    assert (
        client.patch(
            f"{task_url}/status",
            json={"status": "DONE"},
            headers=headers_a,
        ).status_code
        == 404
    )
    assert client.delete(task_url, headers=headers_a).status_code == 404

    db_session.expire_all()
    stored_task = db_session.get(Task, task_b["id"])

    assert stored_task is not None
    assert stored_task.user_id == user_b.id
    assert stored_task.title == "User B task"
    assert stored_task.status == "TODO"
    assert stored_task.priority == "MEDIUM"


def test_user_cannot_see_other_users_tasks_in_list(
    client: TestClient,
    db_session: Session,
) -> None:
    user_a = _create_user(db_session, "a@example.com")
    user_b = _create_user(db_session, "b@example.com")
    task_a = _create_task(client, user_a, title="A task").json()
    task_b = _create_task(client, user_b, title="B task").json()

    response = client.get("/api/v1/tasks", headers=_headers(user_a))

    assert response.status_code == 200
    returned_ids = [item["id"] for item in response.json()]
    assert task_a["id"] in returned_ids
    assert task_b["id"] not in returned_ids


def test_update_cannot_transfer_ownership(
    client: TestClient,
    db_session: Session,
) -> None:
    user_a = _create_user(db_session, "a@example.com")
    user_b = _create_user(db_session, "b@example.com")
    task = _create_task(client, user_a).json()

    response = client.put(
        f"/api/v1/tasks/{task['id']}",
        json=_payload(user_id=user_b.id),
        headers=_headers(user_a),
    )

    assert response.status_code == 422

    stored = db_session.get(Task, task["id"])
    assert stored is not None
    assert stored.user_id == user_a.id


def test_deleting_user_cascades_to_tasks_at_database_level(
    client: TestClient,
    db_session: Session,
) -> None:
    user = _create_user(db_session, "cascade@example.com")
    task = _create_task(client, user).json()
    task_id = task["id"]

    db_session.execute(delete(User).where(User.id == user.id))
    db_session.commit()
    db_session.expire_all()

    remaining = db_session.scalar(select(Task).where(Task.id == task_id))
    assert remaining is None
