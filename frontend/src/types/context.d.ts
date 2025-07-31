export { };

declare global {
  interface AuthContext {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login_context: (handle: string, password: string) => Promise<void>;
    register_context: (handle: string, password: string, firstName: string, lastName: string) => Promise<void>;
    logout_context: () => Promise<void>;
  }
}