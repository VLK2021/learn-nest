import { Body, Controller, Post, Get, HttpCode, HttpStatus, Param } from "@nestjs/common";

import { PostService } from './post.service';
import { CreatePostDto } from "./dto/create-post.dto";

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @HttpCode(HttpStatus.OK)
  @Get()
  getAll() {
    return this.postService.getAll();
  }
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.postService.getById(id);
  }
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createPost(@Body() postDto: CreatePostDto) {
    return this.postService.createPost(postDto)
  }
}
