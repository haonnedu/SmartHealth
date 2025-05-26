import axiosInstance from "@/lib/axios-instance";
import { LoginCredentials, LoginResponse, RegisterData } from "./auth.types";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await axiosInstance.post<LoginResponse>(
      "/auth/login",
      credentials
    );
    return data;
  },

  // register: async (userData: RegisterData): Promise<AuthResponse> => {
  //   const { data } = await axiosInstance.post<AuthResponse>(
  //     "/auth/register",
  //     userData
  //   );
  //   return data;
  // },

  validateToken: async (token: string): Promise<boolean> => {
    try {
      await axiosInstance.get("/auth/validate", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return true;
    } catch {
      return false;
    }
  },

  getUserInfo: async (token: string) => {
    const { data } = await axiosInstance.get("/auth/user-info", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },
};
