import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Controller('auth')
export class IdentityRoute {
  constructor(private readonly httpService: HttpService) {}

  @Post('login')
  async login(@Body() body: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'http://identity_service:8081/identity/api/auth/login',
          body,
        ),
      );
      return response.data;
    } catch (error) {
      console.error('Error calling identity_service:', error.message);
      throw new HttpException(
        'Failed to login: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
