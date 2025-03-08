from src.model.configs.base import Base
from sqlalchemy import Column, Integer, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship

class Donation(Base):
    __tablename__ = 'donations'

    id = Column(Integer, primary_key=True, autoincrement=True)
    donor_id = Column(Integer, ForeignKey('donors.id'), nullable=False)
    created_at = Column(DateTime, default=func.utcnow())

    donor = relationship('Donor', backref='donations')
