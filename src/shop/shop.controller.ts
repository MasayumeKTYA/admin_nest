import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { Request } from 'express'
import { ShopService } from './shop.service';
import {
  typeAddClassify, typeAddShop, typeUpdataShop
} from './dto/create-shop.dto'
import { TypeID, typePage } from 'src/DTO/share';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) { }
  //添加分类
  @Post('addClassify')
  async PostAddShopClassify(
    @Body() data: typeAddClassify,
    req: Request
  ) {
    return this.shopService.addClassify(data)
  }

  //删除分类
  @Post('delClassify')
  async PostdelShopClassify(
    @Body() data: TypeID) {
    return this.shopService.delClassify(data)
  }

  //查询分类
  @Post('findClassify')
  async PostFindShopClassify(
    @Body() data: typePage) {
    return this.shopService.findClassify(data)
  }

  //添加商品
  @Post('addShop')
  async PostAddShop(@Body() params: typeAddShop) {
    return this.shopService.addShop(params)
  }

  //删除商品
  @Post('delShop')
  async PostDelShop(@Body() params: TypeID) {
    return this.shopService.delShop(params)
  }

  //查询商品
  @Post('findShop')
  async PostFindShop(@Body() params: typePage) {
    return this.shopService.findShop(params)
  }

  //修改商品
  @Post('updataShop')
  async PostUpdataShop(@Body() params: typeUpdataShop) {
    return this.shopService.updataShop(params)

  }
}
