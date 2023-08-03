import { IsNotEmpty, IsNumber } from 'class-validator';
export class TypeID {
  @IsNotEmpty({ message: 'id 不允许为空' })
  @IsNumber()
  id: number;
}

export class typePage {
  @IsNotEmpty({ message: 'page 不允许为空' })
  @IsNumber()
  page: number;
}