import { Module } from '@nestjs/common';

import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PrismaService } from '../core/prisma.service';

@Module({
  providers: [CommentService, PrismaService],
  imports: [],
  controllers: [CommentController],
})
export class CommentModule {}
