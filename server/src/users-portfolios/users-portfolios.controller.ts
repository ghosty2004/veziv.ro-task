import { Controller } from '@nestjs/common';
import { UsersPortfoliosService } from './users-portfolios.service';

@Controller('users-portfolios')
export class UsersPortfoliosController {
  constructor(
    private readonly usersPortfoliosService: UsersPortfoliosService,
  ) {}

  // TODO: Add CRUD operations for users-portfolios
}
