import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty({ example: 'User', description: 'The name of the User' })
  @IsString()
  @Length(2, 10)
  @IsNotEmpty()
  public name: string;

  @ApiProperty({ example: 1, description: 'The age of the User' })
  @IsNotEmpty()
  @IsNumber()
  public age: number;

  @ApiProperty({ example: 'userCity', description: 'The city of the User' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  public city: string;
}
