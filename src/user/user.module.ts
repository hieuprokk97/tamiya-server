import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RoundModule } from 'src/round/round.module';
import { RoundEntity } from 'src/round/entities/round.entity';
import { RoundService } from 'src/round/round.service';
import { SemiFinalEntity } from 'src/semi-final/entities/semi-final.entity';
import { FinalEntity } from 'src/final/entities/final.entity';
import { ModuleSerivce } from 'src/module/module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoundEntity, SemiFinalEntity, FinalEntity])],
  controllers: [UserController],
  providers: [UserService, ModuleSerivce],
})
export class UserModule {}
