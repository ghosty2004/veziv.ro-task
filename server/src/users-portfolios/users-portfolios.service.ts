import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersPortfolios } from './entities/users-portfolio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersPortfoliosService {
  constructor(
    @InjectRepository(UsersPortfolios)
    private readonly repository: Repository<UsersPortfolios>,
  ) {}

  create(user: UsersPortfolios) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, user: Partial<UsersPortfolios>) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
