import { Injectable } from '@nestjs/common';
import {
  typeAddClassify, typeAddShop, typeUpdataShop,
  typeDel, typeFind
} from './dto/create-shop.dto'

import { InjectRepository, } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShopList, ShopClassify } from './entities/shop.entities'

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ShopList) private readonly shoplist: Repository<ShopList>,
    @InjectRepository(ShopClassify) private readonly shopClassify: Repository<ShopClassify>,
  ) { }
  //添加分类
  async addClassify(data: typeAddClassify) {
    this.shopClassify.save(data)
    return { data: 'ok' }
  }
  //删除分类
  async delClassify(data: typeDel) {
    this.shopClassify.delete(data.id)
    return { data: 'ok' }
  }
  //查询分类
  async findClassify(data: typeFind) {
    const res = this.shopClassify.find({
      skip: (data.page - 1) * 10,
      take: 10
    })
    return { data: res }
  }

  //添加商品
  async addShop(params: typeAddShop) {
    this.shoplist.save(params)
    return { message: '添加成功' }
  }

  //删除商品
  async delShop(params: typeDel) {
    this.shoplist.delete(params.id)
    return { message: '删除成功' }
  }

  //查询商品
  async findShop(params: typeFind) {
    const res = this.shoplist.find({
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
