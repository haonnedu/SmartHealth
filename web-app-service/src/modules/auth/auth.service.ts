import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private readonly identityServiceUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.identityServiceUrl = process.env.IDENTITY_SERVICE_URL || 'http://localhost:8081';
  }

  async login(loginDto: LoginDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.identityServiceUrl}/api/auth/login`, loginDto)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Login failed',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async register(registerDto: RegisterDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.identityServiceUrl}/api/auth/register`, registerDto)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Registration failed',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async validateToken(token: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.identityServiceUrl}/api/auth/validate`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      );
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async getUserInfo(token: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.identityServiceUrl}/api/auth/user-info`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      );
      return response.data;
    } catch (error) {
      return null;
    }
  }
} 