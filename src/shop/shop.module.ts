import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopList, ShopClassify } from './entities/shop.entities';

@Module({
  imports: [TypeOrmModule.forFeature([ShopList, ShopClassify])],
  controllers: [ShopController],
  providers: [ShopService]
})
export class ShopModule { }
