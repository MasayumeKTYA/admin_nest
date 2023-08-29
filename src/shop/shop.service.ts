import { Injectable } from '@nestjs/common';
import {
  typeAddClassify, typeAddShop, typeUpdataClassify, typeUpdataShop
} from './dto/create-shop.dto'
import { ShopList, ShopClassify } from './entities/shop.entities'
import { TypeID, typePage } from 'src/DTO/share';
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ShopList) private readonly shoplist: Repository<ShopList>,
    @InjectRepository(ShopClassify) private readonly shopClassify: Repository<ShopClassify>,
  ) { }
  //添加分类
  async addClassify(data: typeAddClassify) {
    this.shopClassify.save(data)
    return { message: '添加成功' }
  }
  //删除分类
  async delClassify(data: TypeID) {
    this.shopClassify.delete(data.id)
    return { data: '删除成功' }
  }
  //查询分类
  async findClassify(data: typePage) {
    const res = await this.shopClassify.find({
      skip: (data.page - 1) * 10,
      take: 10
    })
    return { data: res }
  }

  async updataClassify(data: typeUpdataClassify) {
    const res = await this.shopClassify.update(data.id, data)
    if (res.affected != 0) {
      return { message: '修改成功' }
    } else {
      return { message: '修改失败' }
    }

  }

  //添加商品
  async addShop(params: typeAddShop) {
    try {
      await this.shoplist.save(params)
      return { message: '添加成功' }
    } catch (e) {
      return { message: '添加失败' }
    }
  }

  //删除商品
  async delShop(params: TypeID) {
    this.shoplist.delete(params.id)
    return { message: '删除成功' }
  }

  //查询商品
  async findShop(params: typePage) {
    const res = await this.shoplist.find({
      skip: (params.page - 1) * 10,
      take: 10
    })
    return { data: res }
  }

  //修改商品
  async updataShop(params: typeUpdataShop) {
    this.shoplist.update(params.id, params)
    return { message: '修改成功' }
  }
}
