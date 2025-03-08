from src.model.configs.base import Base
from sqlalchemy import Column, Integer, ForeignKey, DateTime, String, func
from sqlalchemy.orm import relationship

class PurchaseOrder(Base):
    __tablename__ = 'purchase_orders'

    id = Column(Integer, primary_key=True, autoincrement=True)
    supplier_id = Column(Integer, ForeignKey('suppliers.id'), nullable=False)
    order_date = Column(DateTime, default=func.utcnow())
    status = Column(String(50), nullable=False, default='PENDING')

    supplier = relationship('Supplier', backref='purchase_orders')
