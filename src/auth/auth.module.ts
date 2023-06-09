import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { PrismaService } from '../core/prisma.service';

@Module({
  providers: [AuthService, UserService, PrismaService],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'Secret',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
