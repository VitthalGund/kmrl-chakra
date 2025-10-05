import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  department: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: string;
}

export interface AdminUserList {
  total: number;
  users: User[];
}

export interface Document {
  id: string;
  filename: string;
  category: string;
  department: string;
  tags: string[];
  uploaded_at: string;
}

export interface Source {
  id: string;
  file_name: string;
  storage_url?: string;
  context: string;
  file_type?: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  timestamp: string;
}

export interface ChatSession {
  id: string;
  user_email: string;
  title: string;
  created_at: string;
  history: ChatMessage[];
}
export interface Notification {
  id: string;
  title: string;
  message: string;
  author: string;
  created_at: string;
}

class ApiClient {
  public axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({ baseURL: API_BASE_URL });

    this.axios.interceptors.request.use((config: AxiosRequestConfig) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.axios.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          localStorage.getItem("refresh_token")
        ) {
          originalRequest._retry = true;
          try {
            const refreshToken = localStorage.getItem("refresh_token");
            const { data } = await axios.post(
              `${API_BASE_URL}/api/v1/users/refresh`,
              {
                refresh_token: refreshToken,
              }
            );

            const { access_token } = data;
            localStorage.setItem("access_token", access_token);

            this.axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${access_token}`;
            originalRequest.headers["Authorization"] = `Bearer ${access_token}`;

            return this.axios(originalRequest);
          } catch (refreshError) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.href = "/login";
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const formData = new URLSearchParams();
    formData.append("username", data.username);
    formData.append("password", data.password);

    const res = await this.axios.post("/api/v1/users/login", formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return res.data;
  }

  async register(data: RegisterRequest): Promise<{ message: string }> {
    const res = await this.axios.post("/api/v1/users/register", data);
    return res.data;
  }

  async getCurrentUser(): Promise<User> {
    const res = await this.axios.get("/api/v1/users/me");
    return res.data;
  }

  async getDocuments(skip = 0, limit = 50): Promise<Document[]> {
    const res = await this.axios.get(
      `/api/v1/documents/?skip=${skip}&limit=${limit}`
    );
    return res.data;
  }

  async uploadDocument(formData: FormData): Promise<{ message: string }> {
    const res = await this.axios.post(
      "/api/v1/documents/upload-file",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  }

  async getNotifications(): Promise<Notification[]> {
    const res = await this.axios.get("/api/v1/notifications/feed");
    return res.data;
  }

  async getAdminUsers(status?: string): Promise<AdminUserList> {
    const url = status
      ? `/api/v1/admin/users/?status=${status}`
      : "/api/v1/admin/users/";
    const res = await this.axios.get(url);
    return res.data;
  }

  async approveUser(
    userId: string,
    role: string
  ): Promise<{ message: string }> {
    const res = await this.axios.post(`/api/v1/admin/users/${userId}/approve`, {
      role,
    });
    return res.data;
  }

  async rejectUser(userId: string): Promise<{ message: string }> {
    const res = await this.axios.post(`/api/v1/admin/users/${userId}/reject`);
    return res.data;
  }

  async getAnalytics(): Promise<any> {
    const res = await this.axios.get("/api/v1/analytics/");
    return res.data;
  }

  getChatStreamUrl(
    sessionId: string,
    query: string,
    targetLanguage = "en"
  ): string {
    const token = localStorage.getItem("access_token") || "";
    const params = new URLSearchParams({
      query,
      session_id: sessionId,
      target_language: targetLanguage,
      token,
    });

    return `${API_BASE_URL}/api/v1/query/chat?${params}`;
  }

  async shareChat(
    sessionId: string
  ): Promise<{ shareable_link: string; share_id: string }> {
    const res = await this.axios.post(
      `/api/v1/collaboration/chat/${sessionId}/share`
    );
    return res.data;
  }

  async getChatSessions(): Promise<{ id: string; title: string }[]> {
    const res = await this.axios.get("/api/v1/collaboration/chat/sessions");
    return res.data;
  }

  async getChatSessionDetails(sessionId: string): Promise<any> {
    const res = await this.axios.get(
      `/api/v1/collaboration/chat/sessions/${sessionId}`
    );
    return res.data;
  }

  async renameChat(
    sessionId: string,
    newTitle: string
  ): Promise<{ message: string }> {
    const res = await this.axios.put(
      `/api/v1/collaboration/chat/sessions/${sessionId}`,
      {
        title: newTitle,
      }
    );
    return res.data;
  }

  async deleteChat(sessionId: string): Promise<void> {
    await this.axios.delete(`/api/v1/collaboration/chat/sessions/${sessionId}`);
  }

  async getSharedChatPreview(shareId: string): Promise<ChatSession> {
    const res = await this.axios.get(
      `/api/v1/collaboration/chat/shared/preview/${shareId}`
    );
    return res.data;
  }

  async importSharedChat(shareId: string): Promise<ChatSession> {
    const res = await this.axios.get(
      `/api/v1/collaboration/chat/share/${shareId}`
    );
    return res.data;
  }
}

export const apiClient = new ApiClient();
