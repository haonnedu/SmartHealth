import {
    Controller,
    All,
    Req,
    Res,
    HttpException,
    HttpStatus,
    Get,
  } from '@nestjs/common';
  import { HttpService } from '@nestjs/axios';
  import { Request, Response } from 'express';
  import { lastValueFrom } from 'rxjs';
  
  @Controller('swagger')
  export class SwaggerProxyController {
    constructor(private readonly httpService: HttpService) {}

    @All('*')
    async proxySwagger(@Req() req: Request, @Res() res: Response) {
        console.log('[DEBUG] Original URL:', req.originalUrl);
        const subPath = req.originalUrl.replace('/api/swagger', '');
        const targetUrl = `http://web_app_service:3002/api${subPath || '/'}`;


        try {
            const response = await lastValueFrom(
                this.httpService.request({
                    url: targetUrl,
                    method: req.method,
                    headers: {
                        ...req.headers,
                        host: 'web_app_service:3002'
                    },
                    responseType: 'stream',
                }),
            );
            console.log('[DEBUG] Response status:', response.status);
            res.status(response.status);
            response.data.pipe(res);
        } catch (error) {
            console.error('[DEBUG] Error:', error.message);
            console.error('[DEBUG] Response data:', error.response?.data);
            console.error('[DEBUG] Response status:', error.response?.status);
            throw new HttpException(
                error.response?.data || 'Error fetching swagger',
                error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
  }
  