import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
//DTO
import { addUserInfo, updataUserInfo, } from './dto/create-user.dto'
import { TypeID, typePage } from 'src/DTO/share';
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // 添加用户
  @Post('addUser')
  async PostAddUser(@Body() params: addUserInfo) {
    return this.userService.addUser(params)
  }

  //删除用户
  @Post('delUser')
  async PostDelUser(@Body() params: TypeID) {
    return this.userService.delUser(params)
  }

  //修改用户
  @Post('updataUser')
  async PostUpdataUser(@Body() params: updataUserInfo) {
    return this.userService.updataUser(params)
  }

  //查询用户
  @Post('findUser')
  async PostFindUser(@Body() params: typePage) {
    return this.userService.findUser(params)
  }

  //查询用户够买的商品类型
  @Post('findUserAndClass')
  async postFindUserClass() {
    return this.userService.findUserByClass()
  }

  //获取用户性别
  @Post('getSex')
  async postGetSex() {
    return this.userService.findUserSex()
  }
  //获取发货信息
  @Post('findLogistics')
  async postSendData(@Body() params: typePage) {
    return this.userService.getUserSendData(params)
  }

  //获取近一周的金额
  @Post('getWeekSum')
  async postWeekSum() {
    return this.userService.getLateWeekMonkey()
  }
}
