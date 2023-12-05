import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { Portfolio, User } from 'src/database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import SharedEntities from 'shared/api-entities';

@Injectable()
export class PortfoliosService {
  constructor(
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
  ) {}

  async create(user: User, createPortfolioDto: CreatePortfolioDto) {
    const exists = await this.portfolioRepository.exist({
      where: {
        user,
        name: createPortfolioDto.name,
      },
    });

    if (!exists) {
      await this.portfolioRepository.save({
        ...createPortfolioDto,
        user,
      });
    } else {
      throw new HttpException('Portfolio already exists', HttpStatus.CONFLICT);
    }
  }

  async findAll(): Promise<SharedEntities.Portfolio[]> {
    return await this.portfolioRepository.find({
      where: {
        hidden: false,
      },
    });
  }

  async findOne(id: number): Promise<SharedEntities.Portfolio> {
    return await this.portfolioRepository.findOne({
      where: {
        id: id,
        hidden: false,
      },
    });
  }

  async update(user: User, id: number, updatePortfolioDto: UpdatePortfolioDto) {
    const portfolio = await this.portfolioRepository.findOne({
      where: { id, user },
    });

    if (!portfolio) {
      throw new HttpException(
        'Portfolio not found for specific user',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.portfolioRepository.update(id, updatePortfolioDto);
  }

  async remove(user: User, id: number) {
    const exists = await this.portfolioRepository.exist({
      where: { id, user },
    });

    if (!exists) {
      throw new HttpException(
        'Portfolio not found for specific user',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.portfolioRepository.delete({ id });
  }
}
