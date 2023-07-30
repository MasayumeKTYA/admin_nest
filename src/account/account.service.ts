import { HttpException, Injectable } from '@nestjs/common';
import { typeAdminLogin } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
//jwt
import { JwtService } from '@nestjs/jwt';
//typeorm
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//entities
import { Account } from './entities/account.entity'
@Injectable()
export class AccountService {
  constructor(
    private readonly jwtService: JwtService,// jwt生成
    //    @InjectRepository(Account) private readonly account: Repository<Account>,
  ) { }
  //登录 
  async adminLogin(req: typeAdminLogin) {
    const res = [1]
    // const res = await this.account.find({ where: { account: req.account, passwords: req.password } })
    if (res.length == 0) {
      throw new HttpException({ message: '没有该账号' }, 400);
    }
    const payload = { account: req.account }
    const token = this.jwtService.sign(payload);
    //    const token = '123'
    return { data: token }
  }
}
