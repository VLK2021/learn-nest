import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

  @ApiProperty({ example: 'User', description: 'The name of the User' })
  @IsString()
  @Length(2, 10)
  @IsNotEmpty()
  public name: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'The email of the User' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({ example: 1, description: 'The age of the User' })

  @IsNumber()
  public age: number;

  @ApiProperty({ example: 'userCity', description: 'The city of the User' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  public city: string;

  @ApiProperty({ example: true, description: 'The status of the User' })
  @IsBoolean()
  public status: boolean;

  @ApiProperty({ example: 'dfs123', description: 'The password of the User' })
  @IsNotEmpty()
  @Length(3, 10)
  @IsString()
  readonly password: string;
}