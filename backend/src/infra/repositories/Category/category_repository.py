from src.application.exceptions.database_exception import DatabaseException
from src.infra.repositories.Category.category_repository_interface import ICategoryRepository
from src.model.configs.connection import DbConnectionHandler
from src.model.entities.category import Category


class CategoryRepository(ICategoryRepository):

    def create_category(self, name: str) -> None:
        with DbConnectionHandler() as db:
            try:
                new_category = Category(name=name)

                db.session.add(new_category)
                db.session.commit()

                return
            except Exception as e:
                db.session.rollback()
                raise DatabaseException(f'Error creating category: {e}')

    def get_category_by_name(self, name: str) -> Category:
        with DbConnectionHandler() as db:
            category = db.session.query(Category).filter_by(name=name).one_or_none()
            return category

    def get_category_by_id(self, category_id: int) -> Category:
        with DbConnectionHandler() as db:
            category = db.session.query(Category).filter_by(id=category_id).one_or_none()
            return category

    def get_all_categories(self) -> list[Category]:
        with DbConnectionHandler() as db:
            categories = db.session.query(Category).all()
            return categories

    def update_category(self, category_id:int, name:str) -> None:
        with DbConnectionHandler() as db:
            try:
                found_category = db.session.query(Category).filter_by(id=category_id).one_or_none()
                found_category.name = name

                db.session.add(found_category)
                db.session.commit()
                return
            except Exception as e:
                db.session.rollback()
                raise DatabaseException(f'Error updating category: {e}')

    def delete_category(self, category_id:int) -> None:
        with DbConnectionHandler() as db:
            try:
                category = db.session.query(Category).filter_by(id=category_id).one_or_none()
                db.session.delete(category)
                db.session.commit()
                return
            except Exception as e:
                db.session.rollback()
                raise DatabaseException(f'Error deleting category: {e}')