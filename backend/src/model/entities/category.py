from sqlalchemy import Integer, String, DateTime, func
from sqlalchemy.orm import mapped_column, relationship, Mapped
from src.model.configs.base import Base
from datetime import datetime

class Category(Base):
    __tablename__ = 'categories'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=func.current_timestamp())

    # Relacionamento
    products = relationship('Product', back_populates='category')
