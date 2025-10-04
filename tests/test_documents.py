import pytest
from httpx import AsyncClient, ASGITransport
from fastapi import status
from app.main import app
from app.core.security import create_access_token, get_current_user
from app.services.rag_pipeline import RAGPipeline
import os

# Define TEST_FILES_DIR at the module level
TEST_FILES_DIR = os.path.join(os.path.dirname(__file__), "files")


# A fixture to provide a valid token for tests
@pytest.fixture(scope="module")
def auth_headers():
    test_user_email = "test@example.com"
    access_token = create_access_token(data={"sub": test_user_email})
    return {"Authorization": f"Bearer {access_token}"}


# Mock user data
mock_user = {
    "email": "test@example.com",
    "name": "Test User",
    "department": "Testing",
    "role": "Tester",
}


# Override the get_current_user dependency
def get_test_user():
    return mock_user


app.dependency_overrides[get_current_user] = get_test_user


# Mock the RAGPipeline class
@pytest.fixture(autouse=True)
def mock_rag_pipeline(mocker):
    mocker.patch.object(
        RAGPipeline,
        "process_file_and_store",
        return_value={
            "id": "mock_id",
            "filename": "test_document.txt",
            "status": "processed",
        },
    )
    mocker.patch.object(
        RAGPipeline,
        "process_text_and_store",
        return_value={
            "id": "mock_id",
            "filename": "Manual Input",
            "status": "processed",
        },
    )
    mocker.patch.object(
        RAGPipeline,
        "process_url_and_store",
        return_value={
            "id": "mock_id",
            "filename": "https://www.google.com",
            "status": "processed",
        },
    )


@pytest.mark.asyncio
async def test_upload_file_success(auth_headers):
    """Test successful document upload from a file."""
    filepath = os.path.join(TEST_FILES_DIR, "test_document.txt")
    with open(filepath, "rb") as f:
        files = {"file": (os.path.basename(filepath), f, "text/plain")}
        data = {"category": "Testing", "department": "QA"}

        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as ac:
            response = await ac.post(
                "/api/v1/documents/upload-file",
                files=files,
                data=data,
                headers=auth_headers,
            )

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["filename"] == "test_document.txt"


@pytest.mark.asyncio
async def test_upload_text_success(auth_headers):
    """Test successful document upload from raw text."""
    payload = {"content": "This is a raw text upload.", "source_name": "Manual Input"}
    data = {"category": "Testing", "department": "QA"}

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post(
            "/api/v1/documents/upload-text",
            json=payload,
            params=data,
            headers=auth_headers,
        )

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["filename"] == "Manual Input"


@pytest.mark.asyncio
async def test_upload_url_success(auth_headers):
    """Test successful document upload from a URL (using a mock)."""
    payload = {"url": "https://www.google.com"}
    data = {"category": "Web", "department": "IT"}

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post(
            "/api/v1/documents/upload-url",
            json=payload,
            params=data,
            headers=auth_headers,
        )

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["filename"] == "https://www.google.com"


@pytest.mark.asyncio
async def test_upload_url_handles_html(mocker, auth_headers):
    """Test that the URL endpoint correctly scrapes an HTML page."""
    mock_url = "http://mock-webpage.com"
    mocker.patch.object(
        RAGPipeline,
        "process_url_and_store",
        return_value={"id": "mock_id", "filename": mock_url, "status": "processed"},
    )

    payload = {"url": mock_url}
    data = {"category": "Web", "department": "IT"}

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post(
            "/api/v1/documents/upload-url",
            json=payload,
            params=data,
            headers=auth_headers,
        )

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["filename"] == mock_url


@pytest.mark.asyncio
async def test_upload_url_handles_pdf_download(mocker, auth_headers):
    """Test that the URL endpoint correctly downloads and processes a PDF file."""
    mock_url = (
        "https://kochimetro.org/wp-content/uploads/2024/12/AR_2023-24_English.pdf"
    )
    mocker.patch.object(
        RAGPipeline,
        "process_url_and_store",
        return_value={"id": "mock_id", "filename": mock_url, "status": "processed"},
    )

    payload = {"url": mock_url}
    data = {"category": "Reports", "department": "Finance"}

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post(
            "/api/v1/documents/upload-url",
            json=payload,
            params=data,
            headers=auth_headers,
        )

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["filename"] == mock_url
