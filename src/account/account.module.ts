import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../jwt/jwt.streategy'
import { env } from '../env'
//entity
import { Admin, Login } from './entities/account.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [JwtModule.register({
    secret: env.TOKEN_KEY,
    signOptions: { expiresIn: '72h' },
  }),
  TypeOrmModule.forFeature([Admin, Login])],
  controllers: [AccountController],
  providers: [AccountService, JwtStrategy]
})
export class AccountModule { }
