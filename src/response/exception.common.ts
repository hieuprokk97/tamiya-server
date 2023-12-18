import { HttpException, HttpStatus } from '@nestjs/common';

export class ExceptionResponse extends HttpException {
  constructor(status?: HttpStatus, message?: string, data?: any) {
    super(
      {
        status: status || HttpStatus.BAD_REQUEST,
        message: message || 'Dữ liệu không hợp lệ!',
        data: data || null,
      },
      HttpStatus.OK,
    );
  }
}
