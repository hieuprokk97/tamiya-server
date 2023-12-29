import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Response } from 'express';
import { BaseResponse } from 'src/response/response.common';
import { DeleteUser } from './dto/delete.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const data = await this.userService.create(createUserDto);
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }));
  }

  @Get('all_users')
  async findAll(@Res() res: Response) {
    const data = await this.userService.findAll();
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }));
  }

  @Post('delete/:id')
  async delete(@Param() param: DeleteUser, @Res() res: any) {
    const data = await this.userService.remove(param.id);
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }));
  }

  @Post('deleteAll')
  async removeAll(@Res() res: Response) {
    const data = await this.userService.removeAll();
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }));
  }
}
