import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUserById(@Param() id: string): Promise<User | null> {
    return this.userService.getUserById(id);
  }

  @Get('email/:email')
  async getUserByEmail(@Param() email: string): Promise<User | null> {
    return this.userService.getUserByEmail(email);
  }
}
