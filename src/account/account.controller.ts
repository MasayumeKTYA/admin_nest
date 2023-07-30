import { Controller, Get, Post, Body, UseGuards, ValidationPipe, Req } from '@nestjs/common';
import { AccountService } from './account.service';
import { typeAdminLogin } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }
  //@UseGuards(JwtAuthService)
  @Post('login')
  async PostAdminLogin(@Body(new ValidationPipe()) data: typeAdminLogin) {
    return this.accountService.adminLogin(data)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('text')
  async text(@Body() data, @Req() req) {
    console.log(req.user)

    return 'ok'
  }


}
