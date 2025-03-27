import { Controller, Post, Body } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Controller('auth')
export class IdentityRoute {
  constructor(private readonly httpService: HttpService) {}

  @Post('login')
  async login(@Body() body: any) {
    const response = await firstValueFrom(
      this.httpService.post(
        'http://identity.smarthealth.io.vn/identity/api/auth/login',
        body,
      ),
    );
    return response.data;
  }
}
