import { Body, Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/auth/auth.decorator';
import { UpdateUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  find(
    @Query('id') id?: number,
    @Query('limit') limit?: number,
    @Query('name') name?: string,
    @Query('email') email?: string,
  ) {
    if (typeof id !== 'undefined') {
      return this.usersService.findOne(id);
    } else {
      return this.usersService.findAll(limit, name, email);
    }
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getMe(@GetUser('id') id: number) {
    return this.usersService.getMe(id);
  }

  @Patch('me')
  @UseGuards(AuthGuard)
  updateMe(@GetUser('id') id: number, @Body() updateUser: UpdateUserDto) {
    return this.usersService.updateMe(id, updateUser);
  }
}
