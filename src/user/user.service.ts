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
  }

  async remove(id: number) {
    console.log("🚀 ~ id:", id)
    await this.userRepository.delete(id);
    await this.userRepository.query(`
      UPDATE "user"
      SET id = id - 1
      WHERE id > ${id}
    `);
  }

  async removeAll() {
    await this.userRepository.clear();
    const query = `SELECT setval('user_id_seq', 1, false);`;
    await this.userRepository.query(query);
    return { message: 'Tất cả đã được xóa' };
  }
}
