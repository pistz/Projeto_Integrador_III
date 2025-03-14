from src.application.dtos.product.product_dtos import CreateProductDTO, UpdateProductDTO
from src.application.exceptions.database_exception import DatabaseException
from src.infra.repositories.Products.products_repository_interface import IProductsRepository
from src.model.configs.connection import DbConnectionHandler
from src.model.entities.product import Product


class ProductsRepository(IProductsRepository):
    
    def get_all_products(self) -> list[Product]:
        with DbConnectionHandler() as db:
            products = db.session.query(Product).all()
            return products

    def get_product_by_id(self, product_id: int) -> Product:
        with DbConnectionHandler() as db:
            product = self.__find_product(product_id=product_id)
            return product

    def get_product_by_name(self, product_name: str) -> Product:
        with DbConnectionHandler() as db:
            product = self.__find_product(product_name=product_name)
            return product

    def get_products_by_category_id(self, category_id: int) -> list[Product]:
        with DbConnectionHandler() as db:
            products = db.session.query(Product).filter(Product.category_id == category_id).all()
            return products

    def get_products_by_brand_id(self, brand_id: int) -> list[Product]:
        with DbConnectionHandler() as db:
            products = db.session.query(Product).filter(Product.brand_id == brand_id).all()
            return products

    def create_product(self, product: CreateProductDTO) -> None:
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
                return
            except Exception as e:
                db.session.rollback()
                raise DatabaseException(f'Error creating product: {e}')

    def update_product(self, product_id: int, product: UpdateProductDTO) -> None:
        with DbConnectionHandler() as db:
            try:
                found_product = self.__find_product(product_id=product_id)
                found_product.name = product.name
                found_product.category_id = product.category_id
                found_product.brand_id = product.brand_id
                found_product.description = product.description

                db.session.add(found_product)
                db.session.commit()
                return
            except Exception as e:
                db.session.rollback()
                raise DatabaseException(f'Error updating product: {e}')

    def delete_product(self, product_id: int) -> None:
        with DbConnectionHandler() as db:
            try:
                product = self.__find_product(product_id=product_id)
                db.session.delete(product)
                db.session.commit()
                return
            except Exception as e:
                db.session.rollback()
                raise DatabaseException(f'Error deleting product: {e}')
    
    def __find_product(self, product_id:int=None, product_name:str=None, brand_id:int=None, category_id:int=None) -> Product:
        if product_id is not None:
            with DbConnectionHandler() as db:
                product = db.session.query(Product).filter(Product.id == product_id).one_or_none()
                return product
            
        if product_name is not None:
            with DbConnectionHandler() as db:
                product = db.session.query(Product).filter(Product.name == product_name).one_or_none()
                return product
        
        if brand_id is not None:
            with DbConnectionHandler() as db:
                products = db.session.query(Product).filter(Product.brand_id == brand_id).all()
                return products
        
        if category_id is not None:
            with DbConnectionHandler() as db:
                products = db.session.query(Product).filter(Product.category_id == category_id).all()
                return products