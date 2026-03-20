"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
});

// Simple password-based auth. Change this password!
const ADMIN_PASSWORD = "prashanthi@2026";

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("admin_auth");
    if (stored === "true") {
      const expiry = localStorage.getItem("admin_auth_expiry");
      if (expiry && new Date(expiry) > new Date()) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("admin_auth");
        localStorage.removeItem("admin_auth_expiry");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("admin_auth", "true");
      // Session expires in 24 hours
      const expiry = new Date();
      expiry.setHours(expiry.getHours() + 24);
      localStorage.setItem("admin_auth_expiry", expiry.toISOString());
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_auth");
    localStorage.removeItem("admin_auth_expiry");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
