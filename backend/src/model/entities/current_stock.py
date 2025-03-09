from src.model.configs.base import Base
from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import relationship

class CurrentStock(Base):
    __tablename__ = 'current_stock'

    product_id = Column(Integer, primary_key=True)
    total_quantity = Column(Integer, nullable=False, default=0)
    last_updated = Column(DateTime, default=func.utcnow())

    # Relacionamentos
    product = relationship('Product', backref='current_stock')