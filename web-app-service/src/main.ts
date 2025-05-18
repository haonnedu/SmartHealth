import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true, // Important if you use withCredentials
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Các phương thức HTTP hợp lệ
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
  });

  const config = new DocumentBuilder()
    .setTitle('Web App Service')
    .setDescription('API for booking system')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3002);
}
bootstrap();
