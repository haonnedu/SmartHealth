import {
    Controller,
    All,
    Req,
    Res,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { HttpService } from '@nestjs/axios';
  import { Request, Response } from 'express';
  import { lastValueFrom } from 'rxjs';
  
  @Controller('api/swagger')
  export class SwaggerProxyController {
    constructor(private readonly httpService: HttpService) {}
  
    @All('*')
    async proxySwagger(@Req() req: Request, @Res() res: Response) {
      const targetUrl = `http://localhost:3002/api`;
  
      try {
        const response = await lastValueFrom(
          this.httpService.request({
            url: targetUrl,
            method: req.method,
            headers: req.headers,
            responseType: 'stream',
          }),
        );
  
        res.status(response.status);
        response.data.pipe(res);
      } catch (error) {
        throw new HttpException(
          error.response?.data || 'Error fetching swagger',
          error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  