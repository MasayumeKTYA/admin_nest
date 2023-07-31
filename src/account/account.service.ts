import { HttpException, Injectable } from '@nestjs/common';
import { typeAdminLogin, typeAdminLog } from './dto/create-account.dto';
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
    const res = await this.admin.find({ where: { username: req.account, password: req.password } })
    if (res.length == 0) {
      throw new HttpException({ message: '账号/密码错误' }, 400);
    }
    const currentDate: string = new Date().toLocaleString()
    const payload = { id: res[0].id }
    const token = this.jwtService.sign(payload);
    this.admin.update({ id: res[0].id }, { updataTime: currentDate })
    //更新日志
    const uselogin = new Login()
    uselogin.browser = 'Chrome'
    uselogin.ip = '127.0.0.1'
    uselogin.username = res[0].username
    uselogin.createTime = currentDate
    this.login.save(uselogin)
    return { data: token }
  }
  //添加管理用户
  async addAdminUse(data) {
    const addAdmin = new Admin()
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
