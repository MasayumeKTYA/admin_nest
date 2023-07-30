import { IsString, IsNotEmpty } from 'class-validator';
export class typeAdminLogin {
  @IsNotEmpty({ message: 'account 不允许为空' })
  @IsString()
  account: string;

  @IsNotEmpty({ message: 'password 不允许为空' })
  @IsString()
  password: string;
}
