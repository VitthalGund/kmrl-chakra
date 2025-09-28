"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (data: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  };

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const { data } = await api.get("/users/me");
          setUser(data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Session validation failed", error);
          logout();
        }
      }
      setIsLoading(false);
    };
    validateToken();
  }, []);

  const login = async (loginData: any) => {
    const params = new URLSearchParams();
    params.append("username", loginData.email);
    params.append("password", loginData.password);

    const { data } = await api.post("/users/login", params);
    localStorage.setItem("accessToken", data.access_token);
    localStorage.setItem("refreshToken", data.refresh_token);
    const { data: userData } = await api.get("/users/me");
    setUser(userData);
    setIsAuthenticated(true);
    router.push("/dashboard");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
