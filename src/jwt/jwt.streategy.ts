import { Injectable, } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { env } from '../env'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      secretOrKey: env.TOKEN_KEY,
      ignoreExpiration: true,
    });
  }

  async validate(payload: any) {
    console.log(payload);

    return { account: payload.account };
  }
}