import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/lib/auth/auth.hooks";
import { LoginCredentials } from "@/lib/auth/auth.types";
import { useLoadingState } from "@/hooks/useLoadingState";

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginCredentials>({
    username: "",
    password: "",
  });

  const login = useLogin();
  const { setLoading } = useLoadingState();

  // Show loading state when login is in progress
  useEffect(() => {
    if (login.isPending) {
      setLoading(true, "Logging in...");
    } else {
      setLoading(false);
    }
  }, [login.isPending, setLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate(formData);
  };

  return (
    <div className={"grid grid-cols-1 md:grid-cols-2 min-h-screen"}>
      <div className="hidden md:block bg-[url('/images/Health_care.png')] bg-no-repeat bg-contain bg-center" />
      <div className="flex items-center justify-center px-6 py-12 bg-gradient-to-r from-pink-100 to-blue-100">
        <form
          className="mt-8 space-y-6 bg-white p-4 rounded-lg md:w-1/2"
          onSubmit={handleSubmit}
        >
          <div>
            <h2 className="text-2xl font-bold text-center">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                href="/register"
                className="font-medium text-primary hover:text-primary/90"
              >
                create a new account
              </Link>
            </p>
          </div>
          {login.isError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {login.error instanceof Error
                ? login.error.message
                : "Failed to login. Please try again."}
            </div>
          )}

          <div className="space-y-4">
            <Input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />

            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-100 to-pink-100 hover:bg-pink-300"
              size="lg"
              disabled={login.isPending}
            >
              {login.isPending ? "Signing in..." : "Sign in"}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-medium text-teal-600 hover:text-teal-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
