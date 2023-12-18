import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user/user.service';
import { DataModule } from './database/data.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, DataModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
