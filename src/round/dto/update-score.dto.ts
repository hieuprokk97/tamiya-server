import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateScoreDto {
  @ApiProperty({
    type: Number,
  })
  roundNumber: number;

  @ApiProperty({
    type: Number,
  })
  scorePlayer1: number;

  @ApiProperty({
    type: Number,
  })
  scorePlayer2: number;

  @ApiProperty({
    type: Number,
  })
  scorePlayer3: number;
}
