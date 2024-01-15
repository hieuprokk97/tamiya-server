import { Module } from '@nestjs/common';
import { RacesService } from './races.service';
import { RacesController } from './races.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RacesEntity } from './entities/races.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RacesEntity, UserEntity])],
  controllers: [RacesController],
  providers: [RacesService],
})
export class RacesModule {}
