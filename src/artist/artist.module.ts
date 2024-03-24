import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistEntity } from './entity/artist.entity';
import { AlbumEntity } from 'src/album/entity/album.entity';
import { TrackEntity } from 'src/track/entity/track.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity, AlbumEntity, TrackEntity])],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
