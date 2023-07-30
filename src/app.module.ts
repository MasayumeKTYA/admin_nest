import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { UserModule } from './user/user.module';
import { ShopModule } from './shop/shop.module';
import { env } from './env';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: '47.114.80.49',
    //   username: 'zhutao',
    //   password: 'aaL3AaDxEWE53t6z',
    //   database: 'zhutao',
    //   retryDelay: 500,
    //   retryAttempts: 10,
    //   synchronize: true, // 是否将实体同步到数据库 自动创建表
    //   autoLoadEntities: true, // 自动加载实体配置，forFeature()注册的每个实体都自己动加载
    //}),

    AccountModule,
    UserModule,
    ShopModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
