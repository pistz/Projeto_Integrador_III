from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.model.configs.base import Base


class Barcode(Base):
    __tablename__ = 'barcodes'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    product_id: Mapped[int] = mapped_column(
        Integer, ForeignKey('products.id'), nullable=False
    )
    barcode: Mapped[str] = mapped_column(String(100), nullable=False)

    # Relacionamento com Product
    product = relationship("Product", back_populates="barcodes")
