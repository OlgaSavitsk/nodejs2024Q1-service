import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumEntity } from './entity/album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from 'src/track/entity/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity, TrackEntity])],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
