from src.model.configs.base import Base
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, Enum, func
from sqlalchemy.orm import relationship

class MovementType(Enum):
    IN = "IN"
    OUT = "OUT"

class MovementSource(Enum):
    BUY = "BUY"
    DONATION = "DONATION"

class StockMovement(Base):
    __tablename__ = 'stock_movements'

    id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey('products.id'), nullable=False)
    movement_type = Column(Enum(MovementType), nullable=False)
    movement_source = Column(Enum(MovementSource), nullable=False)
    source_id = Column(Integer)  # ID da compra ou doação
    quantity = Column(Integer, nullable=False)
    movement_date = Column(DateTime, default=func.utcnow())

    product = relationship('Product', backref='stock_movements')
