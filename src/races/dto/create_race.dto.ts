import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRaceDto {
  @ApiProperty({
    type: Number,
  })
  round: number;

  @ApiProperty({
    type: Number,
  })
  semiFinal: number;
}
