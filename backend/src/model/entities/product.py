from src.model.configs.base import Base
from sqlalchemy import Column, Integer, String, Text, Numeric, DateTime, func

class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(150), nullable=False)
    description = Column(Text)
    price = Column(Numeric(10, 2), nullable=False)
    quantity = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime, default=func.utcnow())
