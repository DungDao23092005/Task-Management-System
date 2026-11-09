"""Task business logic."""

from app.models.task import Task, TaskStatus
from app.repositories.task_repository import TaskRepository
from app.schemas.task import TaskCreate, TaskUpdate


class TaskNotFoundError(Exception):
    """Raised when a task does not exist or is not owned by the user."""


class TaskService:
    """Coordinates task operations for the authenticated user."""

    def __init__(self, task_repository: TaskRepository) -> None:
        self.task_repository = task_repository

    def create_task(self, user_id: int, payload: TaskCreate) -> Task:
        return self.task_repository.create(user_id, payload)

    def get_task(self, user_id: int, task_id: int) -> Task:
        task = self.task_repository.get_by_id(task_id, user_id)
        if task is None:
            raise TaskNotFoundError
        return task

    def list_tasks(self, user_id: int) -> list[Task]:
        return self.task_repository.list_by_user(user_id)

    def update_task(
        self,
        user_id: int,
        task_id: int,
        payload: TaskUpdate,
    ) -> Task:
        task = self.task_repository.update(task_id, user_id, payload)
        if task is None:
            raise TaskNotFoundError
        return task

    def update_task_status(
        self,
        user_id: int,
        task_id: int,
        status: TaskStatus,
    ) -> Task:
        task = self.task_repository.update_status(task_id, user_id, status)
        if task is None:
            raise TaskNotFoundError
        return task

    def delete_task(self, user_id: int, task_id: int) -> None:
        if not self.task_repository.delete(task_id, user_id):
            raise TaskNotFoundError
