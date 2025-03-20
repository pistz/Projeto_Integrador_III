from src.model.configs.base import Base
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

class User(Base):
    __tablename__ = 'users'

    id:Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name:Mapped[str] = mapped_column(String(100), nullable=False)
    email:Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    password:Mapped[str] = mapped_column(String(255), nullable=False)
    created_at:Mapped[DateTime] = mapped_column(DateTime, default=func.current_timestamp())
