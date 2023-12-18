import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Response } from 'express';
import { BaseResponse } from 'src/response/response.common';

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
}
