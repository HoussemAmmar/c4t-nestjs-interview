import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseObject } from '../abstract/response.object';
import { AccessTokenResponseType } from '../types/auth.types';
import {
  LoginWithEmailAndPasswordDto,
  SignUpWithEmailAndPasswordDto,
} from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUpWithEmailAndPassword(
    @Body()
    createUserWithEmailAndPasswordDto: SignUpWithEmailAndPasswordDto,
  ): Promise<ResponseObject<AccessTokenResponseType>> {
    const res = await this.authService.signUpWithEmailAndPassword(
      createUserWithEmailAndPasswordDto,
    );
    return new ResponseObject('SIGNUP_SUCCEEDED', res);
  }

  @Post('login')
  async loginWithEmailAndPassword(
    @Body() loginWithEmailAndPasswordDto: LoginWithEmailAndPasswordDto,
  ): Promise<ResponseObject<AccessTokenResponseType>> {
    const data = await this.authService.loginWithEmailAndPassword(
      loginWithEmailAndPasswordDto,
    );
    return new ResponseObject('LOGIN_SUCCEEDED', data);
  }
}
