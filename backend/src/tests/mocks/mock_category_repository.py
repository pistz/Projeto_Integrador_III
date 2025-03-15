from unittest.mock import MagicMock

def get_mock_category_repository():
    mock = MagicMock()

    mock_category = MagicMock()
    mock_category.id = 1
    mock_category.name = "Food"

    mock.get_category_by_name.return_value = [mock_category]
    mock.get_category_by_id.return_value = mock_category
    mock.get_all_categories.return_value = [mock_category]
    mock.get_category_by_name.side_effect = lambda name: [mock_category] if name == "Food" else []


    return mock
