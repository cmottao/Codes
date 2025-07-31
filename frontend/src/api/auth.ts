import instance from "./axios";

export const login = async (handle: string, password: string) => {
  return instance.post<string>("/login", { handle, password });
};

export const register = async (handle: string, password: string, first_name: string, last_name: string) => {
  return instance.post<string>("/register", { handle, password, first_name, last_name });
};

export const verify = async () => {
  return instance.get<User>("/verify");
}

export const logout = async () => {
  return instance.post("/logout");  
};
