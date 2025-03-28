from src.application.dtos.product.product_dtos import CreateProductDTO, UpdateProductDTO
from src.application.exceptions.database_exception import DatabaseException
from src.infra.repositories.Products.products_repository_interface import IProductsRepository
from src.model.configs.connection import DbConnectionHandler
from src.model.entities.product import Product
from sqlalchemy import func



class ProductsRepository(IProductsRepository):
    
    def get_all_products(self) -> list[Product]:
        with DbConnectionHandler() as db:
            products = db.session.query(Product).all()
            return products

    def get_product_by_id(self, product_id: int) -> Product:
        product = self.__find_product_by_name_or_id(product_id=product_id)
        return product

    def get_product_by_name(self, product_name: str) -> list[Product]:
        product = self.__find_product_by_name_or_id(product_name=product_name)
        return product

    def get_all_products_by_category_id(self, category_id: int) -> list[Product]:
        products = self.__find_products_by_brand_or_category_id(category_id=category_id)
        return products

    def get_all_products_by_brand_id(self, brand_id: int) -> list[Product]:
        products = self.__find_products_by_brand_or_category_id(brand_id=brand_id)
        return products

    def create_product(self, product: CreateProductDTO) -> Product:
        with DbConnectionHandler() as db:
            try:
                new_product = Product(
                    name=product.name,
                    description=product.description,
                    brand_id=product.brand_id,
                    category_id=product.category_id
                    )

                db.session.add(new_product)
                db.session.commit()
                db.session.refresh(new_product)
                return new_product
            
            except Exception as e:
                db.session.rollback()
                raise DatabaseException(message='Erro ao criar produto', aditional=str(e))

    def update_product(self, product_id: int, product: UpdateProductDTO) -> None:
        with DbConnectionHandler() as db:
            try:
                found_product = self.__find_product_by_name_or_id(product_id=product_id)
                found_product.name = product.name
                found_product.category_id = product.category_id
                found_product.brand_id = product.brand_id
                found_product.description = product.description

                db.session.add(found_product)
                db.session.commit()
                return
            except Exception as e:
                db.session.rollback()
                raise DatabaseException(message='Erro ao atualizar produto', aditional=str(e))

    def delete_product(self, product_id: int) -> None:
        with DbConnectionHandler() as db:
            try:
                product = self.__find_product_by_name_or_id(product_id=product_id)
                db.session.delete(product)
                db.session.commit()
                return
            except Exception as e:
                db.session.rollback()
                raise DatabaseException(message='Erro ao deletar produto', aditional=str(e))
    
    def __find_product_by_name_or_id(self, product_id:int=None, product_name:str=None) -> Product:
        if product_id is not None:
            with DbConnectionHandler() as db:
                product = db.session.query(Product).filter(Product.id == product_id).one_or_none()
                return product
        if product_name is not None:
            with DbConnectionHandler() as db:
                product = db.session.query(Product).filter(
                    func.lower(Product.name).like(f"%{product_name.lower()}%")
                ).all()
                return product
        
    def __find_products_by_brand_or_category_id(self, brand_id:int=None, category_id:int=None) -> list[Product]:    
        if brand_id is not None:
            with DbConnectionHandler() as db:
                products = db.session.query(Product).filter(Product.brand_id == brand_id).all()
                return products
        
        if category_id is not None:
            with DbConnectionHandler() as db:
                products = db.session.query(Product).filter(Product.category_id == category_id).all()
                return products