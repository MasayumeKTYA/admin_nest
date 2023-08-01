import { HttpException, Injectable } from '@nestjs/common';
import {
  typeAdminLogin, typeAdminLog, typeAddAdmin, typeDelAdmin,
  typeUpdataAdmin
} from './dto/create-account.dto';
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
    const currentDate: string = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
    //生成日志
    this.updataLog(req.username, '登录')
    //生成token
    const payload = { id: res.id, account: res.account }
    const token = this.jwtService.sign(payload);
    this.admin.update({ id: res.id }, { updataTime: currentDate })
    return { data: token }
  }

  //添加管理用户
  async addAdminUse(data: typeAddAdmin, token: any) {
    if (token.user.account != 1) {
      throw new HttpException({ message: '您没有权限' }, 401);
    }
    const addAdmin = new Admin()
    const currentDate: string = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
    //添加管理
    for (let attar in data) {
      addAdmin[attar] = data[attar]
    }
    addAdmin.updataTime = currentDate
    this.admin.save(addAdmin)
    //生成日志
    const adminUser = await this.admin.findOne({ where: { id: token.user.id } })
    this.updataLog(adminUser.username, '添加管理')
    return { message: '添加成功' }
  }

  //删除管理用户
  async delAdminUse(data: typeDelAdmin, token: any) {
    if (token.user.account != 1) {
      throw new HttpException({ message: '您没有权限' }, 401);
    }
    const res = await this.admin.delete({ id: data.id })
    if (res.affected == 0) {
      throw new HttpException({ message: '没有该账户' }, 400);
    }
    const adminUser = await this.admin.findOne({ where: { id: token.user.id } })
    this.updataLog(adminUser.username, '删除管理')
    return { message: '删除成功' }
  }

  //修改管理用户
  async updataAdminUse(data: typeUpdataAdmin, token: any) {
    if (token.user.account != 1) {
      throw new HttpException({ message: '您没有权限' }, 401);
    }
    const id: number = data.id
    delete data.id
    console.log(data, id);
    const res = await this.admin.update({ id: id }, data)
    if (res.affected == 0) {
      throw new HttpException({ message: '修改失败' }, 400);
    }
    const adminUser = await this.admin.findOne({ where: { id: token.user.id } })
    this.updataLog(adminUser.username, '超级管理员修改')
    await this.admin.update({ id: data.id }, data)
    return { message: '修改成功' }
  }

  //修改管理员个人信息
  async modifyPerson(data: typeUpdataAdmin, userToken: any) {
    const res = await this.admin.update({ id: userToken.user.id }, data)
    if (res.affected == 0) {
      throw new HttpException({ message: '修改失败' }, 400);
    }
    const adminUser = await this.admin.findOne({ where: { id: userToken.user.id } })
    this.updataLog(adminUser.username, '个人管理员修改')
    return { message: '修改成功' }
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
  //更新日志封装函数
  private updataLog(username: string, operation: string) {
    //生成日志
    const currentDate: string = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
    //更新日志
    const uselogin = new Login()
    uselogin.browser = 'Chrome'
    uselogin.ip = '127.0.0.1'
    uselogin.username = username
    uselogin.createTime = currentDate
    uselogin.operation = operation
    this.login.save(uselogin)
  }
}
