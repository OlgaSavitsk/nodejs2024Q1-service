import {
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritAlbumEntity } from './entity/favorites-album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritArtistEntity } from './entity/favorites-artist.entity';
import { FavoritTrackEntity } from './entity/favorites-track.entity';
import { validate } from 'class-validator';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritAlbumEntity)
    private favoritesAlbumRepository: Repository<FavoritAlbumEntity>,
    @InjectRepository(FavoritArtistEntity)
    private favoritesArtistRepository: Repository<FavoritArtistEntity>,
    @InjectRepository(FavoritTrackEntity)
    private favoritesTrackRepository: Repository<FavoritTrackEntity>,
  ) {}

  async findAll() {
    const [favAlbum, favArtist, favTrack] = await Promise.all([
      this.favoritesAlbumRepository.find({
        relations: { albums: true },
      }),
      this.favoritesArtistRepository.find({
        relations: { artists: true },
      }),
      this.favoritesTrackRepository.find({
        relations: { tracks: true },
      }),
    ]);

    const albums = favAlbum.map((val) => val.albums);
    const artists = favArtist.map((val) => val.artists);
    const tracks = favTrack.map((val) => val.tracks);

    return { albums, artists, tracks };
  }

  async artists(artistId: string) {
    const artist = this.favoritesArtistRepository.create({
      artistId: artistId,
    });
    try {
      return await this.favoritesArtistRepository.save(artist);
    } catch (error) {
      throw new UnprocessableEntityException('Unprocessable Content');
    }
  }
  async albums(albumId: string) {
    const album = this.favoritesAlbumRepository.create({ albumId: albumId });
    try {
      return await this.favoritesAlbumRepository.save(album);
    } catch (error) {
      throw new UnprocessableEntityException('Unprocessable Content');
    }
  }

  async tracks(trackId: string) {
    const track = this.favoritesTrackRepository.create({ trackId: trackId });
    try {
      return await this.favoritesTrackRepository.save(track);
    } catch (error) {
      throw new UnprocessableEntityException('Unprocessable Content');
    }
  }

  async delArtists(artistId) {
    // const entity = await this.favoritesArtistRepository.findOneBy({
    //   artistId: artistId,
    // });
    // if (!entity) {
    //   throw new NotFoundException('User not found');
    // }
    if (!validate({ artistId })) {
      throw new HttpException('User not found', StatusCodes.BAD_REQUEST);
    }
    return await this.favoritesArtistRepository.delete({
      artistId: artistId,
    });
  }

  async delAlbums(albumId) {
    // const entity = await this.favoritesAlbumRepository.findOneBy({
    //   albumId: albumId,
    // });
    // if (!entity) {
    //   throw new NotFoundException('User not found');
    // }
    if (!validate({ albumId })) {
      throw new HttpException('User not found', StatusCodes.BAD_REQUEST);
    }
    return await this.favoritesAlbumRepository.delete({
      albumId: albumId,
    });
  }

  async delTracks(trackId) {
    // const entity = await this.favoritesTrackRepository.findOneBy({
    //   trackId: trackId,
    // });
    // if (!entity) {
    //   throw new NotFoundException('User not found');
    // }
    if (!validate({ trackId })) {
      throw new HttpException('User not found', StatusCodes.BAD_REQUEST);
    }
    return await this.favoritesTrackRepository.delete({
      trackId: trackId,
    });
  }
}
