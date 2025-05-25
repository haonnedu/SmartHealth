import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    debugger
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    const data = response.data;
    if (data.access_token) {
      // Store token in HTTP-only cookie
      Cookies.set('token', data.access_token, {
        expires: 7, // 7 days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      // Store user data in localStorage (non-sensitive data only)
      localStorage.setItem('user', JSON.stringify({
        name: data.name,
        email: data.email,
        preferred_username: data.preferred_username,
        given_name: data.given_name,
        family_name: data.family_name,
        role: data.realm_access?.roles?.includes('admin') ? 'ADMIN' : 'PATIENT'
      }));
    }
    return data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    const responseData = response.data;
    if (responseData.access_token) {
      // Store token in HTTP-only cookie
      Cookies.set('token', responseData.access_token, {
        expires: 7, // 7 days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      // Store user data in localStorage (non-sensitive data only)
      localStorage.setItem('user', JSON.stringify({
        email: responseData.user.email,
        firstName: responseData.user.firstName,
        lastName: responseData.user.lastName,
        role: responseData.user.role
      }));
    }
    return responseData;
  }

  logout(): void {
    Cookies.remove('token');
    localStorage.removeItem('user');
  }

  getCurrentUser(): any {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  getToken(): string | null {
    return Cookies.get('token') || null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string {
    const user = this.getCurrentUser();
    return user?.role || 'PATIENT';
  }
}

export const authService = new AuthService(); 