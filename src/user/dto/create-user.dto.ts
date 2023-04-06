import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateUserDto {

  @IsString()
  @Length(2, 10)
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  @IsNumber()
  public age: number;

  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  public city: string;

  @IsBoolean()
  public status: boolean;

  @IsNotEmpty()
  @Length(3, 10)
  @IsString()
  readonly password: string;
}