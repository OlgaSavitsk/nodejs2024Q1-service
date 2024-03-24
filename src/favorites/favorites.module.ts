import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FavoritAlbumEntity } from './entity/favorites-album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritArtistEntity } from './entity/favorites-artist.entity';
import { FavoritTrackEntity } from './entity/favorites-track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoritAlbumEntity,
      FavoritArtistEntity,
      FavoritTrackEntity,
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
