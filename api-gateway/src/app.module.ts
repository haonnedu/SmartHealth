import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './routes/identity.route';
import { SwaggerProxyController } from './routes/swagger-proxy.controller';

@Module({
  imports: [HttpModule],
  controllers: [AuthController, SwaggerProxyController],
  providers: [],
})
export class AppModule {}
