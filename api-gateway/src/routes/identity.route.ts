import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Controller('auth')
export class AuthController {
  constructor(private readonly httpService: HttpService) {}

  @Post('login')
  async login(@Body() body: any) {
    console.log('Received login request:', body);
    try {
      const response = await firstValueFrom(
        this.httpService
          .post(
            // 'https://identity.smarthealth.io.vn/identity/api/auth/login',
            'http://localhost:8081/identity/api/auth/login',
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
