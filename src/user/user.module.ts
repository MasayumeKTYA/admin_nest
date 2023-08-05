import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrder, UserInfo, Logistics } from './entities/user.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrder, UserInfo, Logistics])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
