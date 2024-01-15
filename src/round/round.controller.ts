import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query } from '@nestjs/common';
import { RoundService } from './round.service';
import { BaseResponse } from 'src/response/response.common';
import { Response } from 'express';
import { CreateRoundDto } from './dto/create-round.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { UserFinalListDto } from 'src/user/dto/use-final-list.dto';
@Controller('round')
export class RoundController {
  constructor(private readonly roundService: RoundService) {}
  @Get('get-list')
  async getList(@Res() res: Response) {
    const data = await this.roundService.getUsetList();
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }));
  }

  @Post('create')
  async createRound(@Body() body: CreateRoundDto, @Res() res: Response) {
    const data = await this.roundService.createRound(body);
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }));
  }

  @Post('update-score')
  async updateScore(@Body() body: UpdateScoreDto, @Res() res: Response) {
    const data = await this.roundService.updateScore(body);
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }));
  }

  @Get('rate-score')
  async rateScore(@Res() res: Response) {
    const data = await this.roundService.rateScore();
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }));
  }

  @Get('list-user-semifinal')
  async listUserSemiFinal(@Res() res: Response) {
    const data = await this.roundService.listUserSemiFinal();
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }));
  }

  @Get('list-user-final')
  async listUserFinal(@Res() res: Response) {
    const data = await this.roundService.listUserFinal();
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }));
  }

  @Post('final')
  async createFinal(@Body() body: UserFinalListDto, @Res() res: Response) {
    const data = await this.roundService.createFinal(body);
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }));
  }
}
