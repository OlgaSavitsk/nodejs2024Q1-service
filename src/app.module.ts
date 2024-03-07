import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { TrackModule } from './track/track.module';

@Module({
  imports: [UserModule, ConfigModule.forRoot({ isGlobal: true }), DbModule, TrackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
