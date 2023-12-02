import { Module } from '@nestjs/common';
import { UsersPortfoliosService } from './users-portfolios.service';
import { UsersPortfoliosController } from './users-portfolios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersPortfolios } from './entities/users-portfolio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersPortfolios])],
  controllers: [UsersPortfoliosController],
  providers: [UsersPortfoliosService],
})
export class UsersPortfoliosModule {}
