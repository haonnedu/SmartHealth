import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: '103.166.183.74',
      port: 5432,
      username: 'identity_admin',
      password: 'MyStrongPassword456@',
      database: 'identity_service',
      schema: 'smart_health',
      entities: [__dirname + '/../modules/**/*.entity{.ts,.js}'],
      synchronize: true, // chỉ dùng cho dev
    };
  }
}
