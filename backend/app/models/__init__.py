"""SQLAlchemy models.

Importing the models here ensures their tables are registered on the shared
metadata object, which Alembic uses for migration discovery.
"""

from app.models.user import User

__all__ = ["User"]
