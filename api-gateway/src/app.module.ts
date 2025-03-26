import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { IdentityRoute } from './routes/identity.route';

@Module({
  imports: [],
  controllers: [HttpModule],
  providers: [IdentityRoute],
})
export class AppModule {}
