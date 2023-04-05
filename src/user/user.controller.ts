import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  @HttpCode(HttpStatus.OK)
  @Get()
  getAll(): string {
    return 'hello world';
  }
  @Get('/:id')
  getOneUserById(@Param('id') id: string) {
    return `getOne ${id}`;
  }
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return userDto;
  }
}
