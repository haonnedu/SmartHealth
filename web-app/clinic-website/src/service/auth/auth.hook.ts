import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { LoginRequest } from "@/lib/api/types/type.gen";
import { loginService } from "./auth.service";
import { useRouter } from "next/router";
type LoginResponse = {
  access_token: string;
  user: {
    id: string;
    username: string;
  };
};
export const useLogin = (): UseMutationResult<
  LoginResponse,
  Error,
  LoginRequest
> => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginService,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.access_token);
      router.push("/");
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
    },
  });
};
