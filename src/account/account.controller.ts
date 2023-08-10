import {
  Controller, Post, Body, UseGuards, Req,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { typeAdminLogin, typeAddAdmin, typeDelAdmin, typeUpdataAdmin } from './dto/create-account.dto';
import { typePage } from 'src/DTO/share';
import { AuthGuard } from '@nestjs/passport';

import { Request } from 'express'
@Controller('admin')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }
  //登录
  @Post('login')
  async PostAdminLogin(@Body() data: typeAdminLogin,) {
    return this.accountService.adminLogin(data,)
  }
  //查询日志
  @UseGuards(AuthGuard('jwt'))
  @Post('log')
  async PostLog(@Body() data: typePage) {
    return this.accountService.adminLog(data)
  }
  //查询管理员列表
  @UseGuards(AuthGuard('jwt'))
  @Post('adminList')
  async PostAdminList(@Body() data: typePage) {
    return this.accountService.adminList(data)
  }
  //添加管理
  @UseGuards(AuthGuard('jwt'))
  @Post('addAdmin')
  async PostAdd(
    @Body() data: typeAddAdmin,
    @Req() req: Request
  ) {
    console.log(req.user);
    return this.accountService.addAdminUse(data, req)
  }
  //删除管理
  @UseGuards(AuthGuard('jwt'))
  @Post('delAdmin')
  async PostDel(
    @Body() data: typeDelAdmin,
    @Req() req: Request
  ) {
    console.log(req.user);
    return this.accountService.delAdminUse(data, req)
  }

  //修改管理
  @UseGuards(AuthGuard('jwt'))
  @Post('updataAdmin')
  async PostUpdata(
    @Body() data: typeUpdataAdmin,
    @Req() req: Request
  ) {
    console.log(req.user);
    return this.accountService.updataAdminUse(data, req)
  }

  //个人修改
  @UseGuards(AuthGuard('jwt'))
  @Post('modifyPerson')
  async modifyPerson(
    @Body() data: typeUpdataAdmin,
    @Req() req: Request) {
    return this.accountService.modifyPerson(data, req)
  }
}
