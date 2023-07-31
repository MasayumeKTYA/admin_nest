import { HttpException, Injectable } from '@nestjs/common';
import { typeAdminLogin, typeAdminLog, typeAddAdmin, typeDelAdmin, typeUpdataAdmin } from './dto/create-account.dto';
import type { Request } from 'express';
//jwt
import { JwtService } from '@nestjs/jwt';
//typeorm
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//entities
import { Admin, Login } from './entities/account.entity'


@Injectable()
export class AccountService {
  constructor(
    private readonly jwtService: JwtService,// jwt生成
    @InjectRepository(Admin) private readonly admin: Repository<Admin>,
    @InjectRepository(Login) private readonly login: Repository<Login>,
  ) { }
  //登录 
  async adminLogin(req: typeAdminLogin) {
    const res = await this.admin.findOne({ where: { username: req.username, password: req.password } })
    if (res == null) {
      throw new HttpException({ message: '账号/密码错误' }, 400);
    }
    const currentDate: string = new Date().toLocaleString()
    const payload = { id: res.id, account: res.account }
    const token = this.jwtService.sign(payload);
    this.admin.update({ id: res.id }, { updataTime: currentDate })
    //更新日志
    const uselogin = new Login()
    uselogin.browser = 'Chrome'
    uselogin.ip = '127.0.0.1'
    uselogin.username = res.username
    uselogin.createTime = currentDate
    this.login.save(uselogin)
    return { data: token }

  }
  //添加管理用户
  async addAdminUse(data: typeAddAdmin, token: any) {
    if (token.user.account != 1) {
      throw new HttpException({ message: '您没有权限' }, 401);
    }
    const addAdmin = new Admin()
    const currentDate: string = new Date().toLocaleString()
    for (let attar in data) {
      addAdmin[attar] = data[attar]
    }
    addAdmin.updataTime = currentDate
    console.log(addAdmin);

    this.admin.save(addAdmin)
    return { message: '添加成功' }
  }
  //删除管理用户
  async delAdminUse(data: typeDelAdmin, token: any) {
    if (token.user.account != 1) {
      throw new HttpException({ message: '您没有权限' }, 401);
    }
    await this.admin.delete({ id: data.id })
    return { message: '删除成功' }
  }

  //修改管理用户
  async updataAdminUse(data: typeUpdataAdmin, token: any) {
    if (token.user.account != 1) {
      throw new HttpException({ message: '您没有权限' }, 401);
    }
    await this.admin.update({ id: data.id }, data)
    return { message: '删除成功' }
  }

  //查询登录日志
  async adminLog(data: typeAdminLog) {
    console.log(data.page);

    const checkRes = await this.login.find({
      take: 10,
      skip: (data.page - 1) * 10
    })
    const len = await this.login.count()
    return { data: checkRes, toall: len }
  }
}
