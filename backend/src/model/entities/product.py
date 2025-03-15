from src.model.configs.base import Base
from sqlalchemy import Column, ForeignKey, Integer, String, Text, Numeric, DateTime, func
from sqlalchemy.orm import relationship


class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(150), nullable=False)
    description = Column(Text, nullable=True)
    brand_id = Column(Integer, ForeignKey('brands.id'), nullable=False)
    category_id = Column(Integer, ForeignKey('categories.id'), nullable=False)
    created_at = Column(DateTime, default=func.current_timestamp())
    updated_at = Column(DateTime, default=func.current_timestamp())

    # Relacionamentos
    brand = relationship('Brand', back_populates='products')
    category = relationship('Category', back_populates='products')

