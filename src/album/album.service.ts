import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from 'src/types/albums.types';
import { DbService } from 'src/db/db.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  service: DbService<Album>;
  album: Album;

  constructor(private trackService: TrackService) {
    this.service = new DbService<Album>('albums');
  }

  async createTrack(createAlbumDto: CreateAlbumDto) {
    const album = await this.service.create(createAlbumDto);
    this.album = album;
    return this.album;
  }

  async updateTrack(id: string, createAlbumDto: CreateAlbumDto) {
    return this.service.update({ id }, () => ({
      ...createAlbumDto,
    }));
  }

  async deleteAlbum(id: string) {
    const collection = await this.trackService.service.find();
    const entity = collection.find((track) => track.albumId === id);
    if (entity) {
      return this.trackService.service.update({ id: entity.id }, () => ({
        albumId: null,
      }));
    }
  }
}
