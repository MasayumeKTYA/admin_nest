import { IsString, IsNotEmpty, IsNumber, IsEmail, IsOptional } from 'class-validator';

export class addUserInfo {
  @IsNotEmpty()
  @IsNumber()
  sex: number

  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsString()
  address: string
}
export class updataUserInfo {
  @IsNotEmpty({ message: 'id 不允许为空' })
  @IsNumber()
  id: number

  @IsNotEmpty({ message: 'sex 不允许为空' })
  @IsNumber()
  @IsOptional()
  sex: number

  @IsNotEmpty({ message: 'username 不允许为空' })
  @IsString()
  @IsOptional()
  username: string

  @IsNotEmpty({ message: 'address 不允许为空' })
  @IsNumber()
  @IsOptional()
  address: string

}