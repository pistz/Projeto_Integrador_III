from src.model.configs.base import Base
from sqlalchemy import Integer, ForeignKey, String, DateTime, func
from sqlalchemy.orm import relationship, Mapped, mapped_column
from datetime import datetime

class StockMovement(Base):
    __tablename__ = 'stock_movements'

    id:Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    product_id:Mapped[int] = mapped_column(Integer, ForeignKey('products.id'), nullable=False)
    movement_type:Mapped[str] = mapped_column(String, nullable=False)
    movement_source:Mapped[str] = mapped_column(String, nullable=False)
    quantity:Mapped[int] = mapped_column(Integer, nullable=False)
    created_by:Mapped[str] = mapped_column(String, nullable=False)
    movement_date:Mapped[datetime] = mapped_column(DateTime, default=func.current_timestamp())

    product = relationship('Product', backref='stock_movements')
