import { Injectable, HttpException } from '@nestjs/common';
import { UserOrder, UserInfo, Logistics } from './entities/user.entities';
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
    @InjectRepository(Logistics) private readonly logistics: Repository<Logistics>,
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

  //查询用户够买的商品类型
  async findUserByClass() {
    const res = await this.userOrder.createQueryBuilder("userOrder")
      .leftJoinAndSelect('userOrder.user', 'user') // 连接 User 实体，并使用别名 'user'
      .leftJoinAndSelect('userOrder.order', 'order') // 连接 Order 实体，并使用别名 'order'
      .where('userOrder.id = :id', { id: 1 }) // 添加查询条件，这里以 userOrder 的 id 为例
      .getMany(); // 执行查询并返回全部个结果
    return { data: 'ok' }
  }

  //获取用户发货信息
  async getUserSendData(params: typePage) {
    return { data: 'ok' }
  }
}
