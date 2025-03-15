from src.domain.services.Brand.brand_service import BrandService
from src.domain.services.Brand.brand_service_interface import IBrandService
from src.domain.services.Category.category_service import CategoryService
from src.domain.services.Category.category_service_interface import ICategoryService
from src.domain.services.Login.login_service import LoginService
from src.domain.services.Login.login_service_interface import ILoginService
from src.domain.services.Product.product_service import ProductService
from src.domain.services.Product.product_service_interface import IProductService
from src.domain.services.User.user_service import UserService
from src.domain.services.User.user_service_interface import IUserService
from src.infra.repositories.Brand.brand_repository import BrandRepository
from src.infra.repositories.Brand.brand_repository_interface import IBrandRepository
from src.infra.repositories.Category.category_repository import CategoryRepository
from src.infra.repositories.Category.category_repository_interface import ICategoryRepository
from src.infra.repositories.Products.products_repository import ProductsRepository
from src.infra.repositories.Products.products_repository_interface import IProductsRepository
from src.infra.repositories.User.user_repository import UserRepository
from src.infra.repositories.User.user_repository_interface import IUserRepository


class ServiceContainer:
    @staticmethod
    def user_service() -> IUserService:
        user_repository:IUserRepository = UserRepository()
        return UserService(user_repository)
    
    @staticmethod
    def login_service() -> ILoginService:
        user_repository:IUserRepository = UserRepository()
        return LoginService(user_repository)
    
    @staticmethod
    def category_service() ->ICategoryService:
        category_repository:ICategoryRepository = CategoryRepository()
        return CategoryService(category_repository)
    
    @staticmethod
    def brand_service() -> IBrandService:
        brand_repository:IBrandRepository = BrandRepository()
        return BrandService(brand_repository)
    
    @staticmethod
    def product_service() -> IProductService:
        product_repository:IProductsRepository = ProductsRepository()
        return ProductService(product_repository)
    