import { Injectable, HttpException } from '@nestjs/common';
import { UserOrder, UserInfo, Logistics } from './entities/user.entities';
import { ShopList } from '../shop/entities/shop.entities'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//DTO
import { addUserInfo, updataUserInfo } from './dto/create-user.dto'
import { TypeID, typePage } from 'src/DTO/share';
//tool函数
import { getYesterdayAnd7YearsAgo, getLastMonthAnd6MonthsAgo } from 'src/tool/tool'
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
      .leftJoinAndSelect(ShopList, 'shopList', 'userOrder.orderShop = shopList.id') // 连接 User 实体，并使用别名 'user'
      .select('shopList.shopClassify', 'shop_class')
      .addSelect('COUNT(shopList.shopClassify)', 'num')
      .groupBy("shopList.shopClassify")
      .getRawMany(); // 执行查询并返回全部个结果
    console.log(res);
    let arr = new Array(6).fill(0)
    res.forEach(item => {
      switch (item.shop_class) {
        case "书籍类":
          arr[0] = Number(item.num)
          break
        case "家电类":
          arr[1] = Number(item.num)
          break
        case "服装类":
          arr[2] = Number(item.num)
          break
        case "食品类":
          arr[3] = Number(item.num)
          break
        case "化妆品类":
          arr[4] = Number(item.num)
          break
        case "电子数码类":
          arr[5] = Number(item.num)
          break
      }
    })
    return { data: arr }
  }

  //获取用户性别
  async findUserSex() {
    const res = await this.userInfo.createQueryBuilder('userInfo')
      .select('COUNT(userInfo.sex)', 'gender')
      .groupBy('userInfo.sex')
      .getRawMany()
    const sexRes = { man: res[0].gender, woman: res[1].gender }
    return { data: sexRes }
  }

  //获取用户发货信息
  async getUserSendData(params: typePage) {
    return { data: 'ok' }
  }

  //获取近一周金额
  async getLateWeekMonkey(params: number) {
    let startTime: string, endTime: string
    if (params == 1) {
      const [lastMonth, sixMonthsAgo] = getLastMonthAnd6MonthsAgo();
      startTime = sixMonthsAgo
      endTime = lastMonth
    } else {
      const [yesterday, sevenYearsAgo] = getYesterdayAnd7YearsAgo();
      startTime = sevenYearsAgo
      endTime = yesterday
    }
    const res = await this.userOrder.createQueryBuilder('userOrder')
      .leftJoinAndSelect(ShopList, 'shopList', 'userOrder.orderShop = shopList.id')
      .select('userOrder.currentDate', 'currentDate')
      .addSelect('SUM(shopList.price)', 'sumPrice')
      .where('userOrder.currentDate BETWEEN :startTime AND :endTime', { startTime: "2023-08-01", endTime: "2023-08-10" })
      .groupBy('userOrder.currentDate')
      .getRawMany()
    let arr: number[] = new Array(7).fill(0)
    if (params == 1) {
    } else {
      const date = new Date(startTime)
      console.log(date);
      res.forEach(item => {
        switch (item.currentDate) {

        }
      })
    }
    return { data: res }
  }
}
