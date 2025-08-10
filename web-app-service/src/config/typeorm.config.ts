import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'aws-0-ap-southeast-1.pooler.supabase.com',
      port: 6543,
      username: 'postgres.munjhtusfnmmibzgjple',
      password: process.env.DB_PASSWORD,
      schema: 'web_app_service',
      database: 'postgres',
      entities: [__dirname + '/../modules/**/*.entity{.ts,.js}'],
      synchronize: true, // chỉ dùng cho dev
      ssl: true,                                   // Supabase yêu cầu SSL
      extra: {
        ssl: { rejectUnauthorized: false },        // tránh lỗi cert
      },
    };
  }
}
