from src.model.configs.base import Base
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

class DonationItem(Base):
    __tablename__ = 'donation_items'

    id = Column(Integer, primary_key=True, autoincrement=True)
    donation_id = Column(Integer, ForeignKey('donations.id'), nullable=False)
    product_id = Column(Integer, ForeignKey('products.id'), nullable=False)
    quantity = Column(Integer, nullable=False)
    brand_id = Column(Integer, ForeignKey('brand.id'), nullable=True)


    donation = relationship('Donation', backref='items')
    product = relationship('Product', backref='donation_items')
    brand = relationship('Brand', back_populates='donation_items')

