import {
  Controller, Post, Body, UseGuards, ValidationPipe, Req,

} from '@nestjs/common';
import { AccountService } from './account.service';
import { typeAdminLogin, typeAdminLog, typeAddAdmin, typeDelAdmin, typeUpdataAdmin } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AuthGuard } from '@nestjs/passport';

import { Request } from 'express'
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
    @Body(
      new ValidationPipe()) data: typeAddAdmin,
    @Req() req: Request
  ) {
    console.log(req.user);
    return this.accountService.addAdminUse(data, req)
  }
  //删除管理
  @UseGuards(AuthGuard('jwt'))
  @Post('delAdmin')
  async PostDel(
    @Body(
      new ValidationPipe()) data: typeDelAdmin,
    @Req() req: Request
  ) {
    console.log(req.user);
    return this.accountService.delAdminUse(data, req)
  }

  //修改管理
  @UseGuards(AuthGuard('jwt'))
  @Post('updataAdmin')
  async PostUpdata(
    @Body(
      new ValidationPipe()) data: typeUpdataAdmin,
    @Req() req: Request
  ) {
    console.log(req.user);
    return this.accountService.updataAdminUse(data, req)
  }

  //个人修改
  @UseGuards(AuthGuard('jwt'))
  @Post('modifyPerson')
  async modifyPerson(
    @Body(
      new ValidationPipe()) data: typeUpdataAdmin,
    @Req() req: Request) {
    return this.accountService.modifyPerson(data, req)
  }
}
