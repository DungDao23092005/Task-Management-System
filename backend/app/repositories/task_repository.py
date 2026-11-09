"""Persistence operations for the Task entity.

Every method is scoped by the owning user id. There is intentionally no
unscoped task lookup anywhere in this repository.
"""

from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.models.task import Task, TaskStatus, utcnow
from app.schemas.task import TaskCreate, TaskUpdate


class TaskRepository:
    """Database access layer for tasks."""

    def __init__(self, session: Session) -> None:
        self.session = session

    def get_by_id(self, task_id: int, user_id: int) -> Task | None:
        statement = select(Task).where(
            Task.id == task_id,
            Task.user_id == user_id,
        )
        return self.session.scalar(statement)

    def list_by_user(self, user_id: int) -> list[Task]:
        statement = (
            select(Task)
            .where(Task.user_id == user_id)
            .order_by(Task.created_at.desc(), Task.id.desc())
        )
        return list(self.session.scalars(statement).all())

    def create(self, user_id: int, payload: TaskCreate) -> Task:
        task = Task(
            user_id=user_id,
            title=payload.title,
            description=payload.description,
            status=payload.status.value,
            priority=payload.priority.value,
            due_date=payload.due_date,
        )
        self.session.add(task)
        self._commit()
        self.session.refresh(task)
        return task

    def update(
        self,
        task_id: int,
        user_id: int,
        payload: TaskUpdate,
    ) -> Task | None:
        task = self.get_by_id(task_id, user_id)
        if task is None:
            return None

        task.title = payload.title
        task.description = payload.description
        task.status = payload.status.value
        task.priority = payload.priority.value
        task.due_date = payload.due_date
        task.updated_at = utcnow()

        self._commit()
        self.session.refresh(task)
        return task

    def update_status(
        self,
        task_id: int,
        user_id: int,
        status: TaskStatus,
    ) -> Task | None:
        task = self.get_by_id(task_id, user_id)
        if task is None:
            return None

        task.status = status.value
        task.updated_at = utcnow()

        self._commit()
        self.session.refresh(task)
        return task

    def delete(self, task_id: int, user_id: int) -> bool:
        task = self.get_by_id(task_id, user_id)
        if task is None:
            return False

        self.session.delete(task)
        self._commit()
        return True

    def _commit(self) -> None:
        try:
            self.session.commit()
        except SQLAlchemyError:
            self.session.rollback()
            raise
