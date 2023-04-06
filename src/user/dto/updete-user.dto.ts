import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class UpdateUserDto {
  @IsString()
  @Length(2, 10)
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  @IsNumber()
  public age: number;

  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  public city: string;
}
