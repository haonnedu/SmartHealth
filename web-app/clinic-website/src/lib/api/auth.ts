// lib/api/auth.ts
import { LoginRequest, LoginResponse } from "@/types/api-types";
import axios from "@/lib/axios"; // đã setup baseURL + interceptors nếu có

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const res = await axios.post<LoginResponse>("/api/auth/login", payload);
  return res.data;
};
