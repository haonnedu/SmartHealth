// service/auth/auth.service.ts
import { LoginRequest } from "@/lib/api/types/type.gen";
import { postAuthLogin } from "./auth.api";

export const loginService = async (data: LoginRequest) => {
  const res = await postAuthLogin(data);
  const token = res.data?.token;
  if (token) {
    localStorage.setItem("access_token", token);
  }
  return res.data;
};
