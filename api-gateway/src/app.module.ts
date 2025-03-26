import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { IdentityRoute } from './routes/identity.route';

@Module({
  imports: [HttpModule],
  controllers: [IdentityRoute],
  providers: [],
})
export class AppModule {}
