from unittest.mock import MagicMock

def get_mock_brand_repository():
    mock = MagicMock()

    mock_brand = MagicMock()
    mock_brand.id = 1
    mock_brand.name = "NewBrand"

    mock.get_brand_by_name.return_value = [mock_brand]
    mock.get_brand_by_id.return_value = mock_brand
    mock.get_all_brands.return_value = [mock_brand]
    mock.get_brand_by_name.side_effect = lambda name: [mock_brand] if name == "NewBrand" else []


    return mock
