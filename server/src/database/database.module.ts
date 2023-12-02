import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { User } from '../users/entities/user.entity';
import { UsersPortfolios } from '../users-portfolios/entities/users-portfolio.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'test',
      synchronize: process.env.NODE_ENV === 'development',
      dropSchema: process.env.NODE_ENV === 'development',
      entities: [User, UsersPortfolios],
    }),
  ],
})
export class DatabaseModule {}
