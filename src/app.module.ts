import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user/user.service';
import { DataModule } from './database/data.module';
import { RacesModule } from './races/races.module';
import { RoundModule } from './round/round.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, DataModule, RacesModule, RoundModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
