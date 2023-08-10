import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { UserModule } from './user/user.module';
import { ShopModule } from './shop/shop.module';
import { env } from './env';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '47.114.80.49',
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_DATABASE,
      retryDelay: 500,
      // logger: true,
      extra: {
        dateStrings: true
      },
      retryAttempts: 1,
      synchronize: true, // 是否将实体同步到数据库 自动创建表
      autoLoadEntities: true, // 自动加载实体配置，forFeature()注册的每个实体都自己动加载
    }),

    AccountModule,
    UserModule,
    ShopModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
