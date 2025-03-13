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

    def get_category_by_name(self, name: str) -> Category:pass

    def get_category_by_id(self, category_id: int) -> Category:pass

    def get_all_categories(self) -> list[Category]:pass

    def update_category(self, category_id:int, name:str) -> None:pass

    def delete_category(self, category_id:int) -> None:pass