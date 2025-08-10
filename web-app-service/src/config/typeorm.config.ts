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
      password: '1234',
      schema: 'web-app-service',
      database: 'postgres',
      entities: [__dirname + '/../modules/**/*.entity{.ts,.js}'],
      synchronize: true, // chỉ dùng cho dev
    };
  }
}
