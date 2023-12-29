import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Vui lòng nhập tên' })
  @ApiProperty({
    type: String,
  })
  name: string;
}
