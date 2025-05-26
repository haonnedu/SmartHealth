// Import generated types from identity service
import type { components } from "../api/types/identity/types";

export type User = components["schemas"]["User"];
export type LoginCredentials = components["schemas"]["LoginRequest"];
export type RegisterData = components["schemas"]["RegisterRequest"];
export type LoginResponse = components["schemas"]["LoginResponse"];

// Define AuthResponse based on your backend's actual response
// export interface AuthResponse {
//   access_token: string;
//   user: User;
// }

// Additional types that might not be in the API spec
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
