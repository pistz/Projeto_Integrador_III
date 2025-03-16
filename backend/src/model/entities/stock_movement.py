from src.model.configs.base import Base
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, func
from sqlalchemy.orm import relationship

class StockMovement(Base):
    __tablename__ = 'stock_movements'

    id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey('products.id'), nullable=False)
    movement_type = Column(String, nullable=False)
    movement_source = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    movement_date = Column(DateTime, default=func.current_timestamp())
    created_by = Column(String, nullable=False)

    product = relationship('Product', backref='stock_movements')
