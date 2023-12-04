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

    user.portfolios = user.portfolios.map(({ file, ...rest }) => ({
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
