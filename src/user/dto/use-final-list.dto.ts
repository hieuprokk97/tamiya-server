import { Type } from 'class-transformer';
import { IsInt, IsString, Min, IsBoolean, IsArray, ValidateNested } from 'class-validator';

class UserDto {
  @IsString()
  name: string;
}

export class UserFinalListDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  users: UserDto[];
}
