import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpWithEmailAndPasswordDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginWithEmailAndPasswordDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
