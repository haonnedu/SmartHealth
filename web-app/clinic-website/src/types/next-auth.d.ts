import { DefaultSession } from "next-auth";

// Mở rộng kiểu Session của next-auth để thêm thuộc tính roles
declare module "next-auth" {
  interface Session extends DefaultSession {
    roles?: string[]; // Thêm roles vào Session
  }
}
