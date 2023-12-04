import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash as argonHash, verify as argonVerify } from 'argon2';
import { LoginDto, RegisterDto } from './dto';
import { User } from '../database/entities';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const valid = await argonVerify(user.hashedPassword, password);

    if (!valid) {
      throw new NotFoundException('Invalid password');
    }

    return this.signToken(user);
  }

  async register({ firstName, lastName, email, password }: RegisterDto) {
    const hash = await argonHash(password);

    try {
      const exists = await this.userRepository.exist({
        where: {
          email,
        },
      });

      if (exists) {
        throw new ForbiddenException('User already exists');
      }

      const user = this.userRepository.create({
        firstName,
        lastName,
        email,
        hashedPassword: hash,
      });

      this.userRepository.save(user);

      return this.signToken(user);
    } catch (error) {
      throw new ForbiddenException('Error creating user');
    }
  }

  async signToken({ id, email }: User) {
    const token = await this.jwt.signAsync(
      {
        id,
        email,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
      },
    );
    return { token };
  }
}
