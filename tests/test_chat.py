import pytest
from httpx import AsyncClient, ASGITransport
from fastapi import status
from app.main import app


@pytest.mark.asyncio
async def test_search_endpoint(mocker, auth_headers):
    """Test the /search endpoint with realistic mock data."""
    mock_search_result = [
        {
            "_id": "277fca6f-ff96-48c0-bd9f-fae84c353dcb",
            "file_name": "test_document.txt",
            "uploader_email": "test@example.com",
            "upload_date": "2025-09-20T19:48:45.970Z",
            "storage_url": "gcs_placeholder/test_document.txt",
            "category": "Testing",
            "department": "QA",
            "tags": [],
            "access_roles": [],
            "file_type": "text/plain",
            "file_size": 8142,
        }
    ]

    mocker.patch(
        "app.services.rag_pipeline.rag_pipeline.search", return_value=mock_search_result
    )

    payload = {"query": "What are the latest safety protocols?"}
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post(
            "/api/v1/query/search", json=payload, headers=auth_headers
        )
    print(response.json()[0]["id"])
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == 1
    assert response.json()[0]["file_name"] == "test_document.txt"
    assert response.json()[0]["id"] == "doc_safety_001"


@pytest.mark.asyncio
async def test_chat_endpoint(mocker, auth_headers):
    """Test the /chat endpoint with realistic mock data."""
    mock_chat_response = {
        "answer": "As per the KMRL Safety Protocol 2025, all staff must wear high-visibility jackets and steel-toed boots in designated trackside areas.",
        "sources": [
            {
                "id": "doc_safety_001",
                "file_name": "KMRL_Safety_Protocol_2025.pdf",
                "storage_url": "gcs_placeholder/KMRL_Safety_Protocol_2025.pdf",
                "context": "Section 3.1: All personnel operating within 5 meters of the track must wear high-visibility jackets and steel-toed boots.",
            }
        ],
    }

    mocker.patch(
        "app.services.rag_pipeline.rag_pipeline.get_chat_response",
        return_value=mock_chat_response,
    )

    payload = {
        "query": "What is the dress code for trackside staff?",
        "session_id": "session_abc123",
    }
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post(
            "/api/v1/query/chat", json=payload, headers=auth_headers
        )

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "high-visibility jackets" in data["answer"]
    assert len(data["sources"]) == 1
    assert data["sources"][0]["file_name"] == "KMRL_Safety_Protocol_2025.pdf"
