from src.domain.services.Brand.brand_service import BrandService
from src.domain.services.Brand.brand_service_interface import IBrandService
from src.domain.services.Category.category_service import CategoryService
from src.domain.services.Category.category_service_interface import ICategoryService
from src.domain.services.Login.login_service import LoginService
from src.domain.services.Login.login_service_interface import ILoginService
from src.domain.services.User.user_service import UserService
from src.domain.services.User.user_service_interface import IUserService
from src.infra.repositories.Brand.brand_repository import BrandRepository
from src.infra.repositories.Category.category_repository import CategoryRepository
from src.infra.repositories.User.user_repository import UserRepository


class ServiceContainer:
    @staticmethod
    def user_service() -> IUserService:
        user_repository = UserRepository()
        return UserService(user_repository)
    
    @staticmethod
    def login_service() -> ILoginService:
        user_repository = UserRepository()
        return LoginService(user_repository)
    
    @staticmethod
    def category_service() ->ICategoryService:
        category_repository = CategoryRepository()
        return CategoryService(category_repository)
    
    @staticmethod
    def brand_service() -> IBrandService:
        brand_repository = BrandRepository()
        return BrandService(brand_repository)
    