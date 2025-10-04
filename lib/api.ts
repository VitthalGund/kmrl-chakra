const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  department: string
  password: string
}

export interface AuthResponse {
  access_token: string
  refresh_token: string
  token_type: string
}

export interface User {
  id: string
  name: string
  email: string
  department: string
  role: string
  status: string
}

export interface ChatMessage {
  role: "user" | "assistant"
  content: string
  sources?: Array<{ title: string; url: string }>
}

export interface Document {
  id: string
  filename: string
  category: string
  department: string
  tags: string[]
  uploaded_at: string
}

export interface Notification {
  id: string
  title: string
  message: string
  author: string
  created_at: string
}

class ApiClient {
  private getHeaders(includeAuth = true): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (includeAuth && typeof window !== "undefined") {
      const token = localStorage.getItem("access_token")
      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }
    }

    return headers
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const formData = new URLSearchParams()
    formData.append("username", data.username)
    formData.append("password", data.password)

    const response = await fetch(`${API_BASE_URL}/api/v1/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Login failed")
    }

    return response.json()
  }

  async register(data: RegisterRequest): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/register`, {
      method: "POST",
      headers: this.getHeaders(false),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Registration failed")
    }

    return response.json()
  }

  async getCurrentUser(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch user")
    }

    return response.json()
  }

  async getDocuments(skip = 0, limit = 50): Promise<Document[]> {
    const response = await fetch(`${API_BASE_URL}/api/v1/documents/?skip=${skip}&limit=${limit}`, {
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch documents")
    }

    return response.json()
  }

  async uploadDocument(formData: FormData): Promise<{ message: string }> {
    const token = localStorage.getItem("access_token")
    const response = await fetch(`${API_BASE_URL}/api/v1/documents/upload-file`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to upload document")
    }

    return response.json()
  }

  async getNotifications(): Promise<Notification[]> {
    const response = await fetch(`${API_BASE_URL}/api/v1/notifications/feed`, {
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch notifications")
    }

    return response.json()
  }

  async getAdminUsers(status?: string): Promise<User[]> {
    const url = status ? `${API_BASE_URL}/api/v1/admin/users/?status=${status}` : `${API_BASE_URL}/api/v1/admin/users/`

    const response = await fetch(url, {
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch users")
    }

    return response.json()
  }

  async approveUser(userId: string, role: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/users/${userId}/approve`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ role }),
    })

    if (!response.ok) {
      throw new Error("Failed to approve user")
    }

    return response.json()
  }

  async rejectUser(userId: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/users/${userId}/reject`, {
      method: "POST",
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      throw new Error("Failed to reject user")
    }

    return response.json()
  }

  async getAnalytics(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/api/v1/analytics/`, {
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch analytics")
    }

    return response.json()
  }

  getChatStreamUrl(sessionId: string, query: string, targetLanguage = "en"): string {
    const token = localStorage.getItem("access_token")
    const params = new URLSearchParams({
      query,
      session_id: sessionId,
      target_language: targetLanguage,
      token: token || "",
    })
    return `${API_BASE_URL}/api/v1/query/chat?${params}`
  }
}

export const apiClient = new ApiClient()
