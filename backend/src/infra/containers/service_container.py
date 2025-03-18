from src.domain.services.Brand.brand_service import BrandService
from src.domain.services.Brand.brand_service_interface import IBrandService
from src.domain.services.Category.category_service import CategoryService
from src.domain.services.Category.category_service_interface import ICategoryService
from src.domain.services.Login.login_service import LoginService
from src.domain.services.Login.login_service_interface import ILoginService
from src.domain.services.Product.product_service import ProductService
from src.domain.services.Product.product_service_interface import IProductService
from src.domain.services.Stock.CurrentStock.current_stock_service import CurrentStockService
from src.domain.services.Stock.CurrentStock.current_stock_service_interface import ICurrentStockService
from src.domain.services.Stock.StockMovement.stock_movement_service import StockMovementService
from src.domain.services.Stock.StockMovement.stock_movement_service_interface import IStockMovementService
from src.domain.services.User.user_service import UserService
from src.domain.services.User.user_service_interface import IUserService
from src.infra.repositories.Brand.brand_repository import BrandRepository
from src.infra.repositories.Brand.brand_repository_interface import IBrandRepository
from src.infra.repositories.Category.category_repository import CategoryRepository
from src.infra.repositories.Category.category_repository_interface import ICategoryRepository
from src.infra.repositories.Products.products_repository import ProductsRepository
from src.infra.repositories.Products.products_repository_interface import IProductsRepository
from src.infra.repositories.Stock.CurrentStock.current_stock_repository import CurrentStockRepository
from src.infra.repositories.Stock.CurrentStock.current_stock_repository_interface import ICurrentStockRepository
from src.infra.repositories.Stock.StockMovement.stock_movement_repository import StockMovementRepository
from src.infra.repositories.Stock.StockMovement.stock_movement_repository_interface import IStockMovementRepository
from src.infra.repositories.User.user_repository import UserRepository
from src.infra.repositories.User.user_repository_interface import IUserRepository


class ServiceContainer:
    @staticmethod
    def user_service() -> IUserService:
        user_repository:IUserRepository = UserRepository()
        return UserService(user_repository=user_repository)
    
    @staticmethod
    def login_service() -> ILoginService:
        user_repository:IUserRepository = UserRepository()
        return LoginService(user_repository=user_repository)
    
    @staticmethod
    def category_service() ->ICategoryService:
        category_repository:ICategoryRepository = CategoryRepository()
        return CategoryService(category_repository=category_repository)
    
    @staticmethod
    def brand_service() -> IBrandService:
        brand_repository:IBrandRepository = BrandRepository()
        return BrandService(brand_repository=brand_repository)
    
    @staticmethod
    def product_service() -> IProductService:
        product_repository:IProductsRepository = ProductsRepository()
        return ProductService(product_repository=product_repository)
    
    @staticmethod
    def stock_movement_service() -> IStockMovementService:
        stock_movement_repository:IStockMovementRepository = StockMovementRepository()
        product_repository:IProductsRepository = ProductsRepository()
        return StockMovementService(
            stock_movement_repository=stock_movement_repository, 
            products_repository=product_repository
            )
    
    @staticmethod
    def current_stock_service() -> ICurrentStockService:
        current_stock_repository:ICurrentStockRepository = CurrentStockRepository()
        return CurrentStockService(current_stock_repository=current_stock_repository)
    