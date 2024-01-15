import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoundDto {
  @ApiProperty({
    type: Number,
  })
  round: number;
}
