import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller({
  path: 'public',
})
export class AppController {
  @Get('health-check')
  healthCheck(@Res() res: Response) {
    return res.status(HttpStatus.OK).send({
      status: 200,
      message: 'Success',
      data: null,
    });
  }
}
