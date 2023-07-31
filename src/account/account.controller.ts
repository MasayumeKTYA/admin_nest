import {
  Controller, Get, Post, Body, Query, UseGuards, ValidationPipe, Req,

} from '@nestjs/common';

import { AccountService } from './account.service';
import { typeAdminLogin, typeAdminLog, typeAddAdmin } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }
  //登录
  @Post('login')
  async PostAdminLogin(
    @Body(new ValidationPipe()) data: typeAdminLogin,
  ) {
    return this.accountService.adminLogin(data,)
  }
  //查询日志
  @UseGuards(AuthGuard('jwt'))
  @Post('log')
  async PostLog(
    @Body(new ValidationPipe()) data: typeAdminLog) {
    return this.accountService.adminLog(data)
  }
  //添加管理
  @UseGuards(AuthGuard('jwt'))
  @Post('addAdmin')
  async PostAdd(
    @Body(new ValidationPipe()) data: typeAddAdmin) {
    return this.accountService.addAdminUse(data)
  }

}
