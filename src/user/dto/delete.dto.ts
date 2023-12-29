import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteUser {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    type: Number,
  })
  id: number;
}
