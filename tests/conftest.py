import sys
import os
import pytest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.core.security import create_access_token, get_current_user
from app.main import app


@pytest.fixture(scope="module")
def auth_headers():
    """Provides a valid JWT token in the authorization header."""
    test_user_email = "test@example.com"
    access_token = create_access_token(data={"sub": test_user_email})
    return {"Authorization": f"Bearer {access_token}"}


# Mock user data to be returned by the dependency override
mock_user = {
    "email": "test@example.com",
    "name": "Test User",
    "department": "Testing",
    "role": "Tester",
}


# This function will replace the real get_current_user during tests
def get_test_user():
    return mock_user


# Apply the dependency override for all tests
app.dependency_overrides[get_current_user] = get_test_user
