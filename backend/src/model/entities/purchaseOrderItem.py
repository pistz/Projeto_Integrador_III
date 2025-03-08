from src.model.configs.base import Base
from sqlalchemy import Column, Integer, ForeignKey, Numeric
from sqlalchemy.orm import relationship

class PurchaseOrderItem(Base):
    __tablename__ = 'purchase_order_items'

    id = Column(Integer, primary_key=True, autoincrement=True)
    purchase_order_id = Column(Integer, ForeignKey('purchase_orders.id'), nullable=False)
    product_id = Column(Integer, ForeignKey('products.id'), nullable=False)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Numeric(10, 2), nullable=False)
    brand_id = Column(Integer, ForeignKey('brand.id'), nullable=True)


    purchase_order = relationship('PurchaseOrder', backref='items')
    product = relationship('Product', backref='purchase_order_items')
    brand = relationship('Brand', back_populates='purchase_order_items')
