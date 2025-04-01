from datetime import datetime

from sqlalchemy import DateTime, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.model.configs.base import Base


class Brand(Base):
    __tablename__ = 'brands'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=func.current_timestamp()
    )

    # Relacionamentos
    products = relationship('Product', back_populates='brand')
