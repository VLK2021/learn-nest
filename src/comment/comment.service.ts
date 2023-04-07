import { Injectable } from '@nestjs/common';
import { Comment, Post, Prisma } from "@prisma/client";

import { PrismaService } from '../core/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}

  getAll(): Promise<Comment[]> {
    return this.prismaService.comment.findMany();
  }

  getById(commentId: string): Promise<Comment> {
    return this.prismaService.comment.findUnique({
      where: { id: Number(commentId) },
    });
  }

  remove(commentId: string) {
    return this.prismaService.comment.delete({
      where: { id: Number(commentId) },
    });
  }

  createComment(data: Prisma.CommentCreateInput): Promise<Comment> {
    return this.prismaService.comment.create({ data });
  }

  updatePost(commentData: Prisma.CommentCreateInput, commentId: string): Promise<Comment> {
    return this.prismaService.comment.update({
      where: { id: Number(commentId) },
      data: {
        text: commentData.text,
        published: commentData.published,
      },
    });
  }

}
