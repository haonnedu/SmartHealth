import axios from "@/lib/axios"; // đã setup baseURL + interceptors nếu có
import { LoginRequest } from "./types/type.gen";

export const login = async (payload: LoginRequest): Promise<any> => {
  const res = await axios.post("/api/auth/login", payload);
  return res.data;
};
