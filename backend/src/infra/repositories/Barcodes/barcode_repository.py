from src.application.dtos.barcodes.barcode_dtos import (
    BarcodeDto,
    CreateBarcodeDto,
    UpdateBarcodeDto,
)
from src.application.exceptions.database_exception import DatabaseException
from src.infra.repositories.Barcodes.barcode_repository_interface import (
    IBarcodeRepository,
)
from src.model.configs.connection import DbConnectionHandler
from src.model.entities.barcode import Barcode


class BarcodeRepositoy(IBarcodeRepository):

    def create_barcode(self, barcode: CreateBarcodeDto) -> None:
        with DbConnectionHandler() as db:
            try:
                new_barcode = Barcode(
                    product_id=barcode.product_id,
                    barcode=barcode.barcode,
                )

                db.session.add(new_barcode)
                db.session.commit()

                return
            except Exception as e:
                db.session.rollback()
                raise DatabaseException(
                    message='Erro ao criar código de barras', aditional=str(e)
                )

    def update_barcode(self, id: int, barcode: UpdateBarcodeDto) -> None:
        with DbConnectionHandler() as db:
            try:
                found_barcode: BarcodeDto = self.__find_barcode(id)
                found_barcode.product_id = (
                    barcode.product_id
                    if barcode.product_id
                    else found_barcode.product_id
                )
                found_barcode.barcode = (
                    barcode.barcode if barcode.barcode else found_barcode.barcode
                )

                db.session.add(found_barcode)
                db.session.commit()
                return
            except Exception as e:
                db.session.rollback()
                raise DatabaseException(
                    message='Erro ao atualizar código de barras', aditional=str(e)
                )

    def delete_barcode(self, barcode_id: int) -> None:
        with DbConnectionHandler() as db:
            try:
                barcode = self.__find_barcode(barcode_id)
                db.session.delete(barcode)
                db.session.commit()
                return
            except Exception as e:
                db.session.rollback()
                raise DatabaseException(
                    message='Erro ao deletar código de barras', aditional=str(e)
                )

    def get_barcodes_by_product_id(self, product_id: int) -> list[Barcode]:
        with DbConnectionHandler() as db:
            try:
                barcodes = (
                    db.session.query(Barcode)
                    .filter(Barcode.product_id == product_id)
                    .all()
                )
                return barcodes
            except Exception as e:
                db.session.rollback()
                raise DatabaseException(
                    message='Erro ao buscar códigos de barras', aditional=str(e)
                )

    def get_barcode_by_id(self, barcode_id: int) -> Barcode:
        return self.__find_barcode(barcode_id)

    def __find_barcode(self, barcode_id: int) -> Barcode:
        with DbConnectionHandler() as db:
            barcode = db.session.query(Barcode).get(barcode_id)
            if not barcode:
                raise DatabaseException(
                    message='Código de barras não encontrado',
                    aditional=f'ID: {barcode_id}',
                )
            return barcode
