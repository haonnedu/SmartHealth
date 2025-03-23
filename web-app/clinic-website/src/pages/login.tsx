import { useState } from "react";
import { LoginRequest } from "@/lib/api/types/type.gen";
import { useLogin } from "@/service/auth/auth.hook";

export default function LoginPage() {
  const [form, setForm] = useState<LoginRequest>({
    username: "",
    password: "",
  });
  const login = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit" disabled={login.isPending}>
        {login.isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
