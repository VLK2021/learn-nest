import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty({ example: 'User', description: 'The name of the User' })
  @IsString()
  @Length(2, 10)
  @IsOptional()
  public name: string;

  @ApiProperty({ example: 1, description: 'The age of the User' })
  @IsOptional()
  @IsNumber()
  public age: number;

  @ApiProperty({ example: 'userCity', description: 'The city of the User' })
  @IsString()
  @IsOptional()
  @Length(3, 20)
  public city: string;

  @IsString()
  @IsOptional()
  public avatar: string;
}


