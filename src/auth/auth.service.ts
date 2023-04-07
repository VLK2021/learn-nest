import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(authDto: AuthUserDto) {
    const user = await this.validateUser(authDto);
    return this.generationToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const findUser = await this.userService.getByEmail(userDto.email);
    if (findUser) {
      throw new HttpException('user is already exist', HttpStatus.BAD_REQUEST);
    }

    const hashPass = await bcrypt.hash(userDto.password, 7);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPass,
    });
    return this.generationToken(user);
  }

  private async generationToken(user: User) {
    const payload = { email: user.email, id: user.id, name: user.name };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(user: AuthUserDto) {
    const userDB = await this.userService.getByEmail(user.email);
    const passEqual = await bcrypt.compare(user.password, userDB.password);
    if (userDB && passEqual) {
      return userDB;
    }
    throw new UnauthorizedException({ message: 'wrong email or password' });
  }
}
