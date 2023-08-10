import { IsString, IsNotEmpty, IsNumber, IsEmail, IsOptional } from 'class-validator';
import type { Request } from 'express'
//账号
export class typeAdminLogin {
  @IsNotEmpty({ message: 'username 不允许为空' })
  @IsString({ message: 'username 必须为string' })
  username: string;

  @IsNotEmpty({ message: 'password 不允许为空' })
  @IsString({ message: 'password 必须为string' })
  password: string;
}
//添加管理员
export class typeAddAdmin {
  @IsNotEmpty({ message: 'account 不允许为空' })
  @IsNumber()
  account: number;

  @IsNotEmpty({ message: 'username 不允许为空' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'name 不允许为空' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'password 不允许为空' })
  @IsString()
  password: string;

  @IsNotEmpty({ message: 'email 不允许为空' })
  @IsEmail()
  email: string;
}
//删除管理员
export class typeDelAdmin {
  @IsNotEmpty({ message: 'id 不允许为空' })
  @IsNumber()
  id: number;
}
//修改管理员
export class typeUpdataAdmin {
  @IsNotEmpty({ message: 'id 不允许为空' })
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  account: number;

  @IsOptional()
  @IsString()
  username: string;
}



