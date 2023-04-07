import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class AuthUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'The email of the User' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({ example: 'dfs123', description: 'The password of the User' })
  @IsNotEmpty()
  @Length(3, 10)
  @IsString()
  readonly password: string;
}