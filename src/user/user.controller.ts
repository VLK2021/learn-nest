import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put, UseGuards
} from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updete-user.dto';
import { AuthGuard } from "../auth/jwt-auth.guard";

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get users[]' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: [
        {
          id: 1,
          email: 'example@gmail.com',
          name: 'Katya',
          city: 'Lviv',
          status: true,
          age: 32,
          password: 'qwerty12345',
        },
        {
          id: 2,
          email: 'Ivan@gmail.com',
          name: 'Ivan',
          city: 'Kyiv',
          status: true,
          age: 25,
          password: '12345',
        },
      ],
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  // @UseGuards(AuthGuard)
  getAll() {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'Get one user' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        email: 'example@gmail.com',
        name: 'Katya',
        city: 'Lviv',
        status: true,
        age: 32,
        password: 'qwerty12345',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getOneUserById(@Param('id') id: string) {
    return this.userService.getOneById(id);
  }

  @ApiOperation({ summary: 'Create one user' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        email: 'example@gmail.com',
        name: 'Katya',
        city: 'Lviv',
        status: true,
        age: 32,
        password: 'qwerty12345',
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Update one user' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        name: 'Katya',
        city: 'Lviv',
        age: 32,
      },
    },
  })
  @Put('/:id')
  updateUser(@Body() userData: UpdateUserDto, @Param('id') id: string) {
    return this.userService.updateUser(userData, id);
  }

  @ApiOperation({ summary: 'delete one user' })
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
