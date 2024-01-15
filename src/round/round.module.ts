import { Module } from '@nestjs/common';
import { RoundService } from './round.service';
import { RoundController } from './round.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RacesEntity } from 'src/races/entities/races.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { RoundEntity } from './entities/round.entity';
import { SemiFinalEntity } from 'src/semi-final/entities/semi-final.entity';
import { FinalEntity } from 'src/final/entities/final.entity';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { ModuleSerivce } from 'src/module/module';

@Module({
  imports: [TypeOrmModule.forFeature([RoundEntity, UserEntity, SemiFinalEntity, FinalEntity]), UserModule],
  controllers: [RoundController],
  providers: [RoundService, ModuleSerivce],
})
export class RoundModule {}
