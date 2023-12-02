import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { UsersPortfoliosModule } from './users-portfolios/users-portfolios.module';
@Module({
  imports: [DatabaseModule, UsersModule, UsersPortfoliosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
