import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CommentService } from './comment.service';
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'Get comments[]' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: [
        {
          "id": 1,
          "text": "uwertyewtruycdsv vfvfev",
          "published": true,
          "authorId": 1,
          "postId": 3
        },
        {
          "id": 2,
          "text": "uwen usygyugdsv vfvfev",
          "published": false,
          "authorId": 2,
          "postId": 4
        }
      ],
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  getAll() {
    return this.commentService.getAll();
  }

  @ApiOperation({ summary: 'Get one comment' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        "id": 1,
        "text": "uwertyewtruycdsv vfvfev",
        "published": true,
        "authorId": 1,
        "postId": 3
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.commentService.getById(id);
  }

  @ApiOperation({ summary: 'Create one comment' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        "id": 1,
        "text": "uwertyewtruycdsv vfvfev",
        "published": true,
        "authorId": 1,
        "postId": 3
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createComment(@Body() commentDto: CreateCommentDto) {
    return this.commentService.createComment(commentDto);
}

  @ApiOperation({ summary: 'Put one comment' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        "text": "put put put",
        "published": true,
      },
    },
  })
  @Put('/:id')
  updateUser(@Body() commentData: UpdateCommentDto, @Param('id') id: string) {
    return this.commentService.updatePost(commentData, id);
  }

  @ApiOperation({ summary: 'delete one comment' })
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.commentService.remove(id);
  }

}
