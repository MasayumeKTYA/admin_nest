import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
//账号
export class typeAdminLogin {
  @IsNotEmpty({ message: 'account 不允许为空' })
  @IsString()
  account: string;

  @IsNotEmpty({ message: 'password 不允许为空' })
  @IsString()
  password: string;
}
//添加管理员
export class typeAddAdmin {
  @IsNotEmpty({ message: 'account 不允许为空' })
  @IsString()
  account: string;

  @IsNotEmpty({ message: 'password 不允许为空' })
  @IsString()
  password: string;
}
//日志
export class typeAdminLog {
  @IsNumber()
  @IsNotEmpty({ message: 'page 不允许为空' })
  page: number

}
