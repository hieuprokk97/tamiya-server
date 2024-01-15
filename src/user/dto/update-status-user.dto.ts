import { Type } from 'class-transformer';
import { IsInt, IsString, Min, IsBoolean, IsArray, ValidateNested } from 'class-validator';

class UserDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  score: number;

  @IsBoolean()
  isChecked: boolean;
}

export class UserListDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  users: UserDto[];
}
