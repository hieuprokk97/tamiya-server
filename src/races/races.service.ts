import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RacesEntity } from './entities/races.entity';
import { Repository } from 'typeorm';
import { CreateRaceDto } from './dto/create_race.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { ExceptionResponse } from 'src/response/exception.common';

@Injectable()
export class RacesService {
  constructor(
    @InjectRepository(RacesEntity)
    private readonly raceRepository: Repository<RacesEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createRace(query: CreateRaceDto) {
    const userList = await this.userRepository.find({
      select: { name: true },
    });
    const members = userList.map((item) => item.name);
    if (!query.round || !query.semiFinal || userList.length == 0) {
      throw new ExceptionResponse(
        HttpStatus.BAD_REQUEST,
        `
- Vui lòng danh sách người tham gia
- Vui lòng nhập số round 
- Vui lòng nhập số người vào SemiFinal
        `,
      );
    }

    if (userList.length <= query.semiFinal) {
      throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'Danh sách phải lớn hơn số lượng người vào SemiFinal');
    }
    await this.raceRepository.save({
      round: query.round,
      semiFinal: query.semiFinal,
      members: members,
    });
    console.log('Thêm thành công');
  }
}
