import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  private posts = [];
  getAll() {
    return this.posts;
  }
  getById(id: string) {
    return this.posts.find((post) => post.id === id);
  }
  createPost(postDto: CreatePostDto) {
    this.posts.push({
      ...postDto,
      id: new Date().valueOf(),
    });
    return postDto;
  }
}
