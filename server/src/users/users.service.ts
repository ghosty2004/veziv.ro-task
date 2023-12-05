import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities';
import { UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(limit: number, name: string, email: string) {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .where('user.firstName like :name', { name: `%${name}%` })
      .orWhere('user.email like :email', { email: `%${email}%` })
      .take(limit || 10)
      .getMany();

    return users.map(({ hashedPassword, ...rest }) => ({
      ...rest,
    }));
  }

  async findOne(id: number) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .leftJoinAndSelect(
        'user.portfolios',
        'portfolio',
        'portfolio.hidden = :hidden',
        {
          hidden: false,
        },
      )
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    delete user.hashedPassword;

    return user;
  }

  async getMe(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['portfolios'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.portfolios = user.portfolios.map(({ dataURL, ...rest }) => ({
      ...rest,
    }));

    delete user.hashedPassword;

    return user;
  }

  async updateMe(id: number, updateUser: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.save({
      ...user,
      ...updateUser,
    });
  }
}
