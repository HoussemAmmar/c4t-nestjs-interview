import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AbstractService } from '../abstract/abstract.service';
import { Auth } from './auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { AccessTokenResponseType } from '../types/auth.types';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { SignUpWithEmailAndPasswordDto } from './auth.dto';

@Injectable()
export class AuthService extends AbstractService<Auth> {
  protected modelName = Auth.name;

  constructor(
    @InjectModel(Auth.name) private authModel: Model<Auth>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private jwtService: JwtService,
  ) {
    super(authModel, logger);
  }

  async signUpWithEmailAndPassword(
    createUserWithEmailAndPasswordDto: SignUpWithEmailAndPasswordDto,
  ): Promise<AccessTokenResponseType> {
    let auth = await this.findOne(
      {
        email: createUserWithEmailAndPasswordDto.email,
      },
      null,
      { collation: { locale: 'en', strength: 2 } },
    );
    if (auth) throw new BadRequestException('EMAIL_ALREADY_USED');

    const passwordHashed = this.hash(
      createUserWithEmailAndPasswordDto.password,
    );

    auth = await this.create({
      email: createUserWithEmailAndPasswordDto.email,
      password: passwordHashed,
    });
    const access_token = this.accessToken(auth);
    return { access_token };
  }

  hash(token: string) {
    return crypto.createHash('sha256').update(token).digest('base64');
  }

  accessToken(auth: Auth) {
    return this.jwtService.sign(
      { _id: auth._id },
      {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      },
    );
  }
}
