from unittest.mock import MagicMock

def get_mock_product_repository():
    mock = MagicMock()

    mock_product = MagicMock()
    mock_product.id = 1
    mock_product.name = "Laptop"
    mock_product.description = "A gaming laptop"
    mock_product.brand_id = 10
    mock_product.category_id = 20

    mock.get_product_by_id.side_effect = lambda pid: mock_product if pid == 1 else None
    mock.get_product_by_name.side_effect = lambda name: [mock_product] if name == "Laptop" else []
    mock.get_all_products.return_value = [mock_product]
    mock.get_all_products_by_brand_id.side_effect = lambda bid: [mock_product] if bid == 10 else []
    mock.get_all_products_by_category_id.side_effect = lambda cid: [mock_product] if cid == 20 else []

    return mock
