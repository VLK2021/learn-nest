import { Body, Controller, Post, Get, HttpCode, HttpStatus, Param, Put, Delete } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { PostService } from './post.service';
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";


@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: 'Get posts[]' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: [
        {
          "id": 3,
          "title": "put 1",
          "content": "It my first post",
          "published": false,
          "authorId": 1
        },
        {
          "id": 2,
          "title": "second",
          "content": "It my second post",
          "published": true,
          "authorId": 10
        },
      ],
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  getAll() {
    return this.postService.getAll();
  }

  @ApiOperation({ summary: 'Get one post' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        "id": 3,
        "title": "put 1",
        "content": "It my first post",
        "published": false,
        "authorId": 1
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.postService.getById(id);
  }

  @ApiOperation({ summary: 'Post one post' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        "id": 3,
        "title": "put 1",
        "content": "It my first post",
        "published": false,
        "authorId": 1
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createPost(@Body() postDto: CreatePostDto) {
    return this.postService.createPost(postDto);
  }

  @ApiOperation({ summary: 'Put one post' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        "title": "put 1",
        "content": "It my first post",
        "published": false,
      },
    },
  })
  @Put('/:id')
  updateUser(@Body() postData: UpdatePostDto, @Param('id') id: string) {
    return this.postService.updatePost(postData, id);
  }

  @ApiOperation({ summary: 'delete one post' })
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
