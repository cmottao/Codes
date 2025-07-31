import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, register, verify } from "../api/auth";

/**
 * This code defines an authentication context for a React application using the Context API and hooks. 
 * It provides a global authentication state that includes the current user, authentication status, 
 * and loading state. The `AuthProvider` component initializes authentication by verifying the user's 
 * session on mount and provides functions for logging in, registering, and logging out. The `useAuth` 
 * hook allows components to access the authentication context, ensuring they are wrapped inside the 
 * `AuthProvider`. This structure centralizes authentication logic, making it reusable across the application.
 */

const AuthContext = createContext<AuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await verify();
        setUser(data);  
        setIsAuthenticated(true);
        setLoading(false);
      } catch (e) {
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkAuth();
  }, [user, isAuthenticated, loading]);

  const login_context = async (handle: string, password: string) => {
    try {
      await login(handle, password);
      const { data } = await verify();
      setUser(data);
      setIsAuthenticated(true);
    } catch (e) {
      console.error("Login failed:", e);
      throw e;
    }
  };

  const register_context = async (handle: string, password: string, firstName: string, lastName: string) => {
    try {
      await register(handle, password, firstName, lastName);
      const { data } = await verify();
      setUser(data);
      setIsAuthenticated(true);
    } catch (e) {
      console.error("Registration failed:", e);
      throw e;
    }
  };

  const logout_context = async () => {
    await logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login_context, register_context, logout_context }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
