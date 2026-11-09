"""Task CRUD HTTP endpoints, scoped to the authenticated user."""

from fastapi import APIRouter, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.api.deps import CurrentUser, DbSession
from app.models.task import Task
from app.repositories.task_repository import TaskRepository
from app.schemas.task import (
    TaskCreate,
    TaskResponse,
    TaskStatusUpdate,
    TaskUpdate,
)
from app.services.task_service import TaskNotFoundError, TaskService

router = APIRouter(prefix="/tasks", tags=["Tasks"])

TASK_NOT_FOUND_DETAIL = "Task not found"


def _build_service(db: Session) -> TaskService:
    return TaskService(TaskRepository(db))


def _task_not_found() -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=TASK_NOT_FOUND_DETAIL,
    )


@router.post(
    "",
    response_model=TaskResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a task",
)
def create_task(
    payload: TaskCreate,
    current_user: CurrentUser,
    db: DbSession,
) -> Task:
    service = _build_service(db)
    return service.create_task(current_user.id, payload)


@router.get(
    "",
    response_model=list[TaskResponse],
    summary="List the current user's tasks",
)
def list_tasks(current_user: CurrentUser, db: DbSession) -> list[Task]:
    service = _build_service(db)
    return service.list_tasks(current_user.id)


@router.get(
    "/{task_id}",
    response_model=TaskResponse,
    summary="Get a task",
)
def get_task(
    task_id: int,
    current_user: CurrentUser,
    db: DbSession,
) -> Task:
    service = _build_service(db)
    try:
        return service.get_task(current_user.id, task_id)
    except TaskNotFoundError as exc:
        raise _task_not_found() from exc


@router.put(
    "/{task_id}",
    response_model=TaskResponse,
    summary="Fully update a task",
)
def update_task(
    task_id: int,
    payload: TaskUpdate,
    current_user: CurrentUser,
    db: DbSession,
) -> Task:
    service = _build_service(db)
    try:
        return service.update_task(current_user.id, task_id, payload)
    except TaskNotFoundError as exc:
        raise _task_not_found() from exc


@router.patch(
    "/{task_id}/status",
    response_model=TaskResponse,
    summary="Update a task's status",
)
def update_task_status(
    task_id: int,
    payload: TaskStatusUpdate,
    current_user: CurrentUser,
    db: DbSession,
) -> Task:
    service = _build_service(db)
    try:
        return service.update_task_status(
            current_user.id,
            task_id,
            payload.status,
        )
    except TaskNotFoundError as exc:
        raise _task_not_found() from exc


@router.delete(
    "/{task_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a task",
)
def delete_task(
    task_id: int,
    current_user: CurrentUser,
    db: DbSession,
) -> Response:
    service = _build_service(db)
    try:
        service.delete_task(current_user.id, task_id)
    except TaskNotFoundError as exc:
        raise _task_not_found() from exc
    return Response(status_code=status.HTTP_204_NO_CONTENT)
