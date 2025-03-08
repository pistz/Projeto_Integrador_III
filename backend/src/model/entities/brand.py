from src.model.configs.base import Base
from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import relationship

class Brand(Base):
    __tablename__ = 'brand'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False, unique=True)
    created_at = Column(DateTime, default=func.utcnow())

    # Relacionamentos
    products = relationship('Product', back_populates='brand')
    donation_items = relationship('DonationItem', back_populates='brand')
    purchase_order_items = relationship('PurchaseOrderItem', back_populates='brand')
