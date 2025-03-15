from typing import Optional
from src.application.exceptions.database_exception import DatabaseException
from src.infra.repositories.Brand.brand_repository_interface import IBrandRepository
from src.model.configs.connection import DbConnectionHandler
from src.model.entities.brand import Brand


class BrandRepository(IBrandRepository):

    def create_brand(self, name: str) -> None:
        with DbConnectionHandler() as db:
            try:
                new_brand = Brand(name=name)

                db.session.add(new_brand)
                db.session.commit()

                return
            except Exception as e:
                db.session.rollback()
                raise DatabaseException(f'Error creating Brand: {e}')

    def get_brand_by_name(self, name: str) -> list[Brand]:
        with DbConnectionHandler() as db:
            brand = self.__find_brand(name=name)
            return brand

    def get_brand_by_id(self, id: int) -> Brand:
        with DbConnectionHandler() as db:
            brand = self.__find_brand(id=id)
            return brand

    def get_all_brands(self) -> list[Brand]:
        with DbConnectionHandler() as db:
            brands = db.session.query(Brand).all()
            return brands

    def update_brand(self, id:int, name:str) -> None:
        with DbConnectionHandler() as db:
            try:
                found_brand = self.__find_brand(id=id)
                found_brand.name = name

                db.session.add(found_brand)
                db.session.commit()
                return
            except Exception as e:
                db.session.rollback()
                raise DatabaseException(f'Error updating Brand: {e}')

    def delete_brand(self, id:int) -> None:
        with DbConnectionHandler() as db:
            try:
                brand = self.__find_brand(id=id)
                db.session.delete(brand)
                db.session.commit()
                return
            except Exception as e:
                db.session.rollback()
                raise DatabaseException(f'Error deleting Brand: {e}')
            
    def __find_brand(self, id:int = None, name:str = None) -> Optional[Brand]:
        if id is not None:
            with DbConnectionHandler() as db:
                brand = db.session.query(Brand).filter_by(id=id).one_or_none()
                return brand
            
        if name is not None:
            with DbConnectionHandler() as db:
                brand = db.session.query(Brand).filter_by(name=name).all()
                return brand