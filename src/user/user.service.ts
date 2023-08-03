import { Injectable, HttpException } from '@nestjs/common';
import { UserOrder, UserInfo } from './entities/user.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//DTO
import { addUserInfo, updataUserInfo } from './dto/create-user.dto'
import { TypeID, typePage } from 'src/DTO/share';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserOrder) private readonly userOrder: Repository<UserOrder>,
    @InjectRepository(UserInfo) private readonly userInfo: Repository<UserInfo>,
  ) { }
  //添加用户信息
  async addUser(params: addUserInfo) {
    const res = await this.userInfo.save(params)
    return { data: '添加成功' }
  }

  //删除用户信息
  async delUser(params: TypeID) {
    const res = await this.userInfo.delete(params.id)
    if (res.affected == 0) {
      throw new HttpException({ message: '没有该用户' }, 400)
    }
    return { data: '删除成功' }
  }

  //修改用户信息
  async updataUser(params: updataUserInfo) {
    const res = await this.userInfo.update(params.id, params)
    if (res.affected == 0) {
      throw new HttpException({ message: '没有该用户' }, 400)
    }
    return { data: '修改成功' }
  }

  //查询用户信息
  async findUser(params: typePage) {
    const res = await this.userInfo.find({
      skip: (params.page - 1) * 10,
      take: 10
    })
    return { data: res }
  }

  async addorder() {
    return { data: 'ok' }
  }
}
