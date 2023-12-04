import { Module } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { PortfoliosController } from './portfolios.controller';
import { Portfolio, User } from 'src/database/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([Portfolio, User]),
  ],
  controllers: [PortfoliosController],
  providers: [PortfoliosService],
})
export class PortfoliosModule {}
