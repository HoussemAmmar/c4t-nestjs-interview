import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseObject } from '../abstract/response.object';
import { AccessTokenResponseType } from '../types/auth.types';
import {
  LoginWithEmailAndPasswordDto,
  SignUpWithEmailAndPasswordDto,
} from './auth.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { apiResponse } from '../swagger/api-response.schema';
import { AccessTokenResponse } from '../swagger/response-types/auth-response.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @ApiOperation({
    operationId: 'Sign Up',
  })
  @ApiResponse(
    apiResponse(200, `SIGNUP_SUCCEEDED`, 'object', AccessTokenResponse),
  )
  @ApiResponse(apiResponse(400, `EMAIL_ALREADY_USED`))
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
  @ApiOperation({
    operationId: 'login',
  })
  @ApiResponse(
    apiResponse(200, `LOGIN_SUCCEEDED`, 'object', AccessTokenResponse),
  )
  @ApiResponse(apiResponse(400, `INVALID_EMAIL or WRONG_PASSWORD`))
  async loginWithEmailAndPassword(
    @Body() loginWithEmailAndPasswordDto: LoginWithEmailAndPasswordDto,
  ): Promise<ResponseObject<AccessTokenResponseType>> {
    const data = await this.authService.loginWithEmailAndPassword(
      loginWithEmailAndPasswordDto,
    );
    return new ResponseObject('LOGIN_SUCCEEDED', data);
  }
}
