import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { In, Like, Repository } from 'typeorm';
import { ExceptionResponse } from 'src/response/exception.common';
import { Http2ServerRequest } from 'http2';
import { UserListDto } from './dto/update-status-user.dto';
import { RoundService } from 'src/round/round.service';
import { SemiFinalEntity } from 'src/semi-final/entities/semi-final.entity';
import { UserFinalDto } from './dto/user-final.dto';
import { FinalEntity } from 'src/final/entities/final.entity';
import { UserFinalListDto } from './dto/use-final-list.dto';
import { ModuleSerivce } from 'src/module/module';
import { ppid } from 'process';
import * as unorm from 'unorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(SemiFinalEntity)
    private readonly semiFinalRepository: Repository<UserEntity>,

    @InjectRepository(FinalEntity)
    private readonly finalRepository: Repository<FinalEntity>,

    private readonly moduleRepository: ModuleSerivce,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const normalizedUsername = this.normalizedAndRemoveSpace(createUserDto.name);
    // .replace(/[\u0300-\u036f]/g, '');
    const existUser = await this.userRepository.findOne({
      where: {
        lowerName: normalizedUsername,
      },
    });
    if (existUser) {
      throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'Tên người dùng đã tồn tại');
    }
    const userLength = await this.userRepository.count();
    const user = await this.userRepository.create({
      id: userLength + 1,
      name: createUserDto.name,
      lowerName: normalizedUsername,
    });
    await this.userRepository.save(user);
    return user;
  }

  private normalizedAndRemoveSpace(input: string) {
    const name = unorm.nfd(input).toLowerCase().replace(/[\s]/g, '');
    return name;
  }

  async findAll() {
    const user = await this.userRepository.find();
    return user;
  }

  async remove(id: number) {
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
  async updateStatus(body: UserListDto) {
    const userListInSemiFinal = body.users.map((item) => item.name);
    // await this.userRepository.update({ name: In(userListInSemiFinal) }, { isChecked: 1 });

    const shuffledUsers = this.moduleRepository.shuffleArray(userListInSemiFinal);
    const groups = this.moduleRepository.mixGroups(shuffledUsers);
    groups.forEach(async (value) => {
      const shuffledColumns = this.moduleRepository.shuffleArray(['player1', 'player2', 'player3']);

      // Tạo đối tượng chứa dữ liệu để lưu
      const dataToSave: any = {};

      // Lưu dữ liệu vào các cột theo thứ tự đã xáo trộn
      value.forEach((player, index) => {
        dataToSave[shuffledColumns[index]] = player;
      });

      // Thêm dữ liệu vào cột cuối cùng nếu cần thiết
      if (value.length < 3) {
        dataToSave[shuffledColumns[2]] = '-';
      }

      // Lưu dữ liệu vào cơ sở dữ liệu
      await this.semiFinalRepository.save(dataToSave);
    });
    // return userListInSemiFinal;
  }

  async updateFinal(body: UserFinalDto) {
    await this.userRepository.update({ name: body.player }, { isInFinal: 1 });
  }
}
