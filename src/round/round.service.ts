import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { RoundEntity } from './entities/round.entity';
import { CreateRoundDto } from './dto/create-round.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { SemiFinalEntity } from 'src/semi-final/entities/semi-final.entity';
import { FinalEntity } from 'src/final/entities/final.entity';
import { UserFinalListDto } from 'src/user/dto/use-final-list.dto';
import { UserService } from 'src/user/user.service';
import { ModuleSerivce } from 'src/module/module';

@Injectable()
export class RoundService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoundEntity)
    private readonly roundRepository: Repository<RoundEntity>,

    @InjectRepository(SemiFinalEntity)
    private readonly semiFinalRepository: Repository<SemiFinalEntity>,

    @InjectRepository(FinalEntity)
    private readonly finalRepository: Repository<FinalEntity>,

    private readonly moduleRepository: ModuleSerivce,
  ) {}
  async getList() {
    // Xáo trộn mảng người dùng
    const user = await this.userRepository.find({
      select: { name: true },
    });
    const users = user.map((item) => item.name);
    const shuffledUsers = this.moduleRepository.shuffleArray(users);
    // Tạo nhóm từ mảng đã xáo trộn
    const groups = [];
    let count = shuffledUsers.length;
    if (count % 3 == 0) {
      for (let i = 0; i < shuffledUsers.length; i += 3) {
        groups.push(shuffledUsers.slice(i, i + 3));
      }
    } else {
      for (let i = 0; i < shuffledUsers.length; ) {
        if (count > 4) {
          groups.push(shuffledUsers.slice(i, i + 3));
          i += 3;
          count = count - 3;
        } else {
          groups.push(shuffledUsers.slice(i, i + 2));
          i += 2;
          count = count - 2;
        }
      }
    }
    return groups;
  }

  async createRound(query: CreateRoundDto) {
    const { round } = query;
    const roundNumber = await this.roundRepository.find();
    if (roundNumber.length == 0) {
      this.roundShuffled(round);
    } else {
      await this.roundRepository.clear();
      const query = `SELECT setval('round_id_seq', 1, false);`;
      await this.roundRepository.query(query);
      this.roundShuffled(round);
    }
  }

  private async roundShuffled(round: number) {
    for (let i = 0; i < round; i += 1) {
      const list = await this.getList();

      list.forEach(async (value) => {
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
        await this.roundRepository.save(dataToSave);
      });
    }
  }

  async getUsetList() {
    const a = await this.roundRepository.find();
    return a;
  }

  async updateScore(body: UpdateScoreDto) {
    const { roundNumber, scorePlayer1, scorePlayer2, scorePlayer3 } = body;
    const round = await this.roundRepository.findOne({
      where: { id: roundNumber.toString() },
    });
    if (round.player1 !== '-') {
      const user1 = await this.userRepository.findOne({ where: { name: round.player1 } });
      const newScorePlayer1 = user1.score + scorePlayer1;
      await this.userRepository.update({ name: round.player1 }, { score: newScorePlayer1 });
    }

    if (round.player2 !== '-') {
      const user2 = await this.userRepository.findOne({ where: { name: round.player2 } });
      const newScorePlayer2 = user2.score + scorePlayer2;
      await this.userRepository.update({ name: round.player2 }, { score: newScorePlayer2 });
    }

    if (round.player3 !== '-') {
      const user3 = await this.userRepository.findOne({ where: { name: round.player3 } });
      const newScorePlayer3 = user3.score + scorePlayer3;
      await this.userRepository.update({ name: round.player3 }, { score: newScorePlayer3 });
    }
    return round;
  }

  async rateScore() {
    const listScore = await this.userRepository.find({
      order: { score: 'DESC' },
    });

    return listScore;
  }

  async listUserSemiFinal() {
    return await this.semiFinalRepository.find();
  }

  async listUserFinal() {
    return await this.finalRepository.find();
  }

  async createFinal(body: UserFinalListDto) {
    console.log('🚀 ~ body:', body);
    const groups = await this.moduleRepository.mixGroups(body.users);
    console.log('🚀 ~ groups:', groups);
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
      await this.finalRepository.save(dataToSave);
    });
  }
}
