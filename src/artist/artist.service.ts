import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from 'src/types/artists.types';
import { DbService } from 'src/db/db.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class ArtistService {
  service: DbService<Artist>;
  artist: Artist;

  constructor(private trackService: TrackService) {
    this.service = new DbService<Artist>('artists');
  }

  async updateArtist(id: string, createArtistDto: CreateArtistDto) {
    return this.service.update({ id }, () => ({
      ...createArtistDto,
    }));
  }

  async deleteArtist(id: string) {
    const collection = await this.trackService.service.collection;
    if (collection) {
      const entity = await collection.find((track) => track.artistId === id);
      return this.trackService.service.update({ id: entity.id }, () => ({
        artistId: null,
      }));
    }
  }
}
