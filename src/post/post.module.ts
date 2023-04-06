import { Module } from '@nestjs/common';

import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from '../core/prisma.service';

@Module({
  providers: [PostService, PrismaService],
  imports: [],
  controllers: [PostController],
})
export class PostModule {}
