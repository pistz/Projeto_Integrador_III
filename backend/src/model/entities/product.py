from src.model.configs.base import Base
from sqlalchemy import ForeignKey, Integer, String, Text, DateTime, func
from sqlalchemy.orm import relationship, Mapped, mapped_column
from datetime import datetime

class Product(Base):
    __tablename__ = 'products'

    id:Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name:Mapped[str] = mapped_column(String(150), nullable=False)
    description:Mapped[str] = mapped_column(Text, nullable=True)
    brand_id:Mapped[int] = mapped_column(Integer, ForeignKey('brands.id'), nullable=False)
    category_id:Mapped[int] = mapped_column(Integer, ForeignKey('categories.id'), nullable=False)
    created_at:Mapped[datetime] = mapped_column(DateTime, default=func.current_timestamp())
    updated_at:Mapped[datetime] = mapped_column(DateTime, default=func.current_timestamp())

    # Relacionamentos
    brand = relationship('Brand', back_populates='products')
    category = relationship('Category', back_populates='products')

