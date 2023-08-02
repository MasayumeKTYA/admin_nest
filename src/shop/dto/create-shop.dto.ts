import { IsString, IsNotEmpty, IsNumber, IsEmail, IsOptional } from 'class-validator';

//添加分类
export class typeAddClassify {
  @IsNotEmpty({ message: 'username 不允许为空' })
  @IsString({ message: 'username 必须为string' })
  title: string;
}






//添加商品
export class typeAddShop {
  @IsNotEmpty({ message: 'shopTitle 不允许为空' })
  @IsString()
  shopTitle: string

  @IsNotEmpty({ message: 'shopTitle 不允许为空' })
  @IsString()
  Classify: string

  @IsNotEmpty({ message: 'price 不允许为空' })
  @IsNumber()
  price: number
}


//修改商品
export class typeUpdataShop {
  @IsNotEmpty({ message: 'id 不允许为空' })
  @IsNumber()
  id: number
}



//删除
export class typeDel {
  @IsNotEmpty({ message: 'id 不允许为空' })
  @IsNumber()
  id: number;
}


//查询分类
export class typeFind {
  @IsNotEmpty({ message: 'page 不允许为空' })
  @IsNumber()
  page: number;
}