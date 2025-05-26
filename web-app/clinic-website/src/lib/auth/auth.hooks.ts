import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { authApi } from "./auth.api";
import {
  LoginResponse,
  User
} from "./auth.types";

const AUTH_KEYS = {
  user: ["auth", "user"] as const,
  token: ["auth", "token"] as const,
};

// Helper functions for token management
const setAuthToken = (token: any) => {
  Cookies.set("token", token, {
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

const removeAuthToken = () => {
  Cookies.remove("token");
};

const setUserData = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUserData = () => {
  localStorage.removeItem("user");
};

// Auth hooks
export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data: LoginResponse) => {
      setAuthToken(data.accessToken);
      setUserData(data);
      queryClient.setQueryData(AUTH_KEYS.user, data);
      queryClient.setQueryData(AUTH_KEYS.token, data.accessToken);
      router.push("/dashboard");
    },
  });
};

// export const useRegister = () => {
//   const router = useRouter();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: authApi.register,
//     onSuccess: (data: AuthResponse) => {
//       setAuthToken(data.access_token);
//       setUserData(data.user);
//       queryClient.setQueryData(AUTH_KEYS.user, data.user);
//       queryClient.setQueryData(AUTH_KEYS.token, data.access_token);
//       router.push("/dashboard");
//     },
//   });
// };

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      removeAuthToken();
      removeUserData();
      queryClient.clear();
    },
    onSuccess: () => {
      router.push("/login");
    },
  });
};

export const useAuth = () => {
  const token = Cookies.get("token");

  const { data: user, isLoading } = useQuery({
    queryKey: AUTH_KEYS.user,
    queryFn: () => {
      const userStr = localStorage.getItem("user");
      if (!userStr) return null;
      return JSON.parse(userStr) as User;
    },
    enabled: !!token,
  });

  const { data: isValid } = useQuery({
    queryKey: [...AUTH_KEYS.token, token],
    queryFn: () => authApi.validateToken(token!),
    enabled: !!token,
  });

  return {
    user,
    token,
    isAuthenticated: !!token && !!user && isValid,
    isLoading,
  };
};

export const useUserInfo = () => {
  const token = Cookies.get("token");

  return useQuery({
    queryKey: [...AUTH_KEYS.user, "info"],
    queryFn: () => authApi.getUserInfo(token!),
    enabled: !!token,
  });
};
