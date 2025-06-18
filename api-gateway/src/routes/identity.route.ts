import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Controller('auth')
export class AuthController {
  constructor(private readonly httpService: HttpService) {}

  @Get('refresh')
  async refresh(@Body() body: any) {
    return this.httpService.get(
      'https://identity.smarthealth.io.vn/identity/api/auth/refresh',
      // 'http://localhost:8081/identity/api/auth/refresh',
      {
        headers: {
          Authorization: `Bearer ${body.refreshToken}`,
        },
      },
    );
  }

  @Post('validate')
  async validate(@Headers('authorization') authHeader: string) {
    try {
    
      if (!authHeader) {
        throw new HttpException(
          'No Authorization header received',
          HttpStatus.UNAUTHORIZED
        );
      }

      const response = await firstValueFrom(
        this.httpService.get('https://identity.smarthealth.io.vn/identity/api/auth/validate', {
          headers: { Authorization: authHeader }
        }).pipe(
          catchError((error) => {
            throw new HttpException(
              error.response?.data || 'Token validation failed',
              error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
            );
          })
        )
      );
      return response.data;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Internal error during token validation',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('login')
  async login(@Body() body: any) {
    console.log('Received login request:', body);
    try {
      const response = await firstValueFrom(
        this.httpService
          .post(
            'https://identity.smarthealth.io.vn/identity/api/auth/login',
            body,
          )
          .pipe(
            catchError((error) => {
              console.error(
                'Error response from identity_service:',
                error.response?.data,
              );
              throw error;
            }),
          ),
      );
      console.log('Received response from identity_service:', response.data);
      return response.data;
    } catch (error) {
      console.error(
        'Error calling identity_service:',
        error.message,
        error.stack,
      );
      if (error.response) {
        throw new HttpException(
          error.response.data || 'Failed to login',
          error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        'Failed to login: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
