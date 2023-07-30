import { PartialType } from '@nestjs/mapped-types';
import { typeAdminLogin } from './create-account.dto';

export class UpdateAccountDto extends PartialType(typeAdminLogin) { }
