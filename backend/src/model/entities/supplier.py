from src.model.configs.base import Base
from sqlalchemy import Column, Integer, String, DateTime, func

class Supplier(Base):
    __tablename__ = 'suppliers'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    contact = Column(String(100))
    email = Column(String(100), unique=True)
    created_at = Column(DateTime, default=func.utcnow())
