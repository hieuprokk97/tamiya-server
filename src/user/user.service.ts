import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ExceptionResponse } from 'src/response/exception.common';
import { Http2ServerRequest } from 'http2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const normalizedUsername = createUserDto.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const existUser = await this.userRepository
      .createQueryBuilder()
      .where('LOWER(UNACCENT(name)) = :name', { name: normalizedUsername })
      .getExists();
    if (existUser) {
      throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'Tên người dùng đã tồn tại');
    }
    const user = await this.userRepository.create({
      name: createUserDto.name,
      score: 0,
    });
    await this.userRepository.save(user);
    return user;
  }

  async findAll() {
    const user = await this.userRepository.find();
    return user;
    return `This action returns all user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  removeAll() {
    return 'Hello';
  }
}
