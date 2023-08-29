import { IsString, IsNotEmpty, IsNumber, IsEmail, IsOptional } from 'class-validator';

//添加分类
export class typeAddClassify {
  @IsNotEmpty({ message: 'title 不允许为空' })
  @IsString({ message: 'title 必须为string' })
  title: string;
}

export class typeUpdataClassify {
  @IsNotEmpty({ message: 'id 不允许为空' })
  @IsNumber()
  id: number;

  @IsNotEmpty({ message: 'title 不允许为空' })
  @IsString({ message: 'title 必须为string' })
  title: string;
}

//添加商品
export class typeAddShop {
  @IsNotEmpty({ message: 'shopTitle 不允许为空' })
  @IsString()
  shopTitle: string

  @IsNotEmpty({ message: 'shopTitle 不允许为空' })
  @IsString()
  shopClassify: string

  @IsNotEmpty({ message: 'price 不允许为空' })
  @IsNumber()
  price: number
}


//修改商品
export class typeUpdataShop {
  @IsNotEmpty({ message: 'id 不允许为空' })
  @IsNumber()
  id: number

  @IsNotEmpty({ message: 'shopTitle 不允许为空' })
  @IsString()
  @IsOptional()
  shopTitle: string

  @IsNotEmpty({ message: 'shopClassify 不允许为空' })
  @IsString()
  @IsOptional()
  shopClassify: string

  @IsNotEmpty({ message: 'price 不允许为空' })
  @IsNumber()
  @IsOptional()
  price: number

}



