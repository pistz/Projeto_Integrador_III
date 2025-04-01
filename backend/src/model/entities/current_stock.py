from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.model.configs.base import Base


class CurrentStock(Base):
    __tablename__ = 'current_stock'

    product_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    total_quantity: Mapped[int] = mapped_column(
        Integer, ForeignKey('products.id'), nullable=False, default=0
    )
    last_updated: Mapped[datetime] = mapped_column(
        DateTime, default=func.current_timestamp()
    )

    # Relacionamentos
    product = relationship('Product', backref='current_stock')
