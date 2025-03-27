import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './routes/identity.route';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
