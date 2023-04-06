import { Body, Controller, Post, Get, HttpCode, HttpStatus, Param, Put, Delete } from "@nestjs/common";

import { PostService } from './post.service';
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

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
    return this.postService.createPost(postDto);
  }

  @Put('/:id')
  updateUser(@Body() postData: UpdatePostDto, @Param('id') id: string) {
    return this.postService.updatePost(postData, id);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
