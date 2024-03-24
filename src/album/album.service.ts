import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumEntity } from './entity/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { StatusCodes } from 'http-status-codes';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async updateArtist(id: string, createAlbumDto: CreateAlbumDto) {
    const entity = await this.albumRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('User not found');
    }
    if (!validate({ id })) {
      throw new HttpException('User not found', StatusCodes.BAD_REQUEST);
    }

    const newEntity = { ...entity, ...createAlbumDto };

    this.albumRepository.save(newEntity);
    return newEntity;
  }
  async create(createArtistDto: CreateAlbumDto) {
    if (!createArtistDto) {
      throw new HttpException('Bad request', StatusCodes.BAD_REQUEST);
    }
    return this.albumRepository.save(createArtistDto);
  }

  async findAll() {
    return this.albumRepository.find();
  }

  async finOne(id: string) {
    return this.albumRepository.findOneBy({ id });
  }

  async delete(entity: AlbumEntity) {
    return await this.albumRepository.remove(entity);
  }
}
