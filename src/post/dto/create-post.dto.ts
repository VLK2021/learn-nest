import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";


export class CreatePostDto {

  @ApiProperty({ example: 'postTitle', description: 'The title of the Post' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  public title: string;

  @ApiProperty({ example: 'postContent', description: 'The content of the Post' })
  @IsString()
  @IsNotEmpty()
  public content: string;

  @ApiProperty({ example: true, description: 'The published of the Post' })
  @IsBoolean()
  @IsNotEmpty()
  public published: boolean;

  @IsNotEmpty()
  @IsNumber()
  public authorId: number;
}


