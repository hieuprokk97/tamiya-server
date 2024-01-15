import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { RacesService } from './races.service';
import { CreateRaceDto } from './dto/create_race.dto';
import { Response } from 'express';
import { BaseResponse } from 'src/response/response.common';
@Controller('races')
export class RacesController {
  constructor(private readonly racesService: RacesService) {}
  @Post('create')
  async create(@Body() createRaceDto: CreateRaceDto, @Res() res: Response) {
    const data = await this.racesService.createRace(createRaceDto);
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }));
  }
}
