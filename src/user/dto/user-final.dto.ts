import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserFinalDto {
  @ApiProperty({
    type: String,
  })
  player: string;
}
