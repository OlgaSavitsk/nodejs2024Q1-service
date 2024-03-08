import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from 'src/types/artists.types';
import { DbService } from 'src/db/db.service';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class ArtistService {
  service: DbService<Artist>;
  artist: Artist;

  constructor(
    private trackService: TrackService,
    private albumService: AlbumService,
  ) {
    this.service = new DbService<Artist>('artists');
  }

  async updateArtist(id: string, createArtistDto: CreateArtistDto) {
    return this.service.update({ id }, () => ({
      ...createArtistDto,
    }));
  }

  async deleteTrack(id: string) {
    const collection = await this.trackService.service.find();
    const entity = collection.find((track) => track.artistId === id);
    if (entity) {
      return this.trackService.service.update({ id: entity.id }, () => ({
        artistId: null,
      }));
    }
  }
  async deleteAlbum(id: string) {
    const collection = await this.albumService.service.find();
    const entity = collection.find((album) => album.artistId === id);
    if (entity) {
      return this.albumService.service.update({ id: entity.id }, () => ({
        artistId: null,
      }));
    }
  }
}
