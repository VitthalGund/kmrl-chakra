import pytest
from httpx import AsyncClient, ASGITransport
from fastapi import status
from app.main import app
import uuid
import os
from app.db.session import client

# Override MongoDB URI for testing
os.environ["MONGODB_URI"] = "mongodb://localhost:27017/test_kmrl_chakra"


@pytest.fixture(scope="module", autouse=True)
def test_db():
    """Fixture to use a separate test database and clean it up after tests."""
    db = client.get_database("test_kmrl_chakra")
    yield db
    client.drop_database("test_kmrl_chakra")


@pytest.mark.asyncio
async def test_register_user():
    """Test user registration successfully."""
    unique_email = f"testuser_{uuid.uuid4()}@example.com"
    user_data = {
        "email": unique_email,
        "name": "Test User",
        "department": "Testing",
        "role": "Tester",
        "password": "testpassword123",
    }
    # CORRECTED: Use ASGITransport for in-memory testing
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/api/v1/users/register", json=user_data)

    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["email"] == user_data["email"]
    assert "id" in data
    assert "password" not in data


@pytest.mark.asyncio
async def test_register_duplicate_user():
    """Test that registering a user with a duplicate email fails."""
    unique_email = f"testuser_{uuid.uuid4()}@example.com"
    user_data = {
        "email": unique_email,
        "name": "Test User",
        "department": "Testing",
        "role": "Tester",
        "password": "testpassword123",
    }
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        await ac.post("/api/v1/users/register", json=user_data)
        response = await ac.post("/api/v1/users/register", json=user_data)

    assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.asyncio
async def test_login_for_access_token():
    """Test successful user login and token generation."""
    unique_email = f"testuser_{uuid.uuid4()}@example.com"
    password = "testpassword123"
    user_data = {
        "email": unique_email,
        "name": "Login Test User",
        "department": "Testing",
        "role": "Tester",
        "password": password,
    }
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        await ac.post("/api/v1/users/register", json=user_data)
        login_data = {"username": unique_email, "password": password}
        response = await ac.post("/api/v1/users/login", data=login_data)

    assert response.status_code == status.HTTP_200_OK
    token = response.json()
    assert "access_token" in token
    assert token["token_type"] == "bearer"


@pytest.mark.asyncio
async def test_login_incorrect_password():
    """Test login with an incorrect password."""
    unique_email = f"testuser_{uuid.uuid4()}@example.com"
    user_data = {
        "email": unique_email,
        "name": "Login Test User",
        "department": "Testing",
        "role": "Tester",
        "password": "correctpassword",
    }
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        await ac.post("/api/v1/users/register", json=user_data)
        login_data = {"username": unique_email, "password": "wrongpassword"}
        response = await ac.post("/api/v1/users/login", data=login_data)

    assert response.status_code == status.HTTP_401_UNAUTHORIZED
