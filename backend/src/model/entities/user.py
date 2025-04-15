from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from src.model.configs.base import Base


class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    roles: Mapped[str] = mapped_column(String(150), nullable=False)
    created_at: Mapped[DateTime] = mapped_column(
        DateTime, default=func.current_timestamp()
    )
