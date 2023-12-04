import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { GetUser } from 'src/auth/auth.decorator';
import { User } from 'src/database/entities';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('portfolios')
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @GetUser() user: User,
    @Body() createPortfolioDto: CreatePortfolioDto,
  ) {
    console.log(user);
    return this.portfoliosService.create(user, createPortfolioDto);
  }

  @Get()
  findAll() {
    return this.portfoliosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.portfoliosService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ) {
    return this.portfoliosService.update(user, id, updatePortfolioDto);
  }

  @Delete(':id')
  remove(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.portfoliosService.remove(user, id);
  }
}
