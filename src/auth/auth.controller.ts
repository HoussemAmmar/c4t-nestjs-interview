import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseObject } from '../abstract/response.object';
import { AccessTokenResponseType } from '../types/auth.types';
import { SignUpWithEmailAndPasswordDto } from './auth.dto';

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
}
