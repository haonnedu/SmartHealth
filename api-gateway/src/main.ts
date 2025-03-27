import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://smarthealth.io.vn', // The domain of your Next.js frontend
    credentials: true, // Important if you use withCredentials
  });
  await app.listen(3001);
}
bootstrap();
