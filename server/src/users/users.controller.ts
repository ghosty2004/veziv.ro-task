import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/auth/auth.decorator';
import { UpdateUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
