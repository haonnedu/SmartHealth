// service/auth/auth.api.ts

import { LoginRequest } from "@/lib/api/types/type.gen";
import axiosInstance from "@/lib/axios-instance";

export const postAuthLogin = (data: LoginRequest) => {
  return axiosInstance.post("/api/auth/login", data);
};
