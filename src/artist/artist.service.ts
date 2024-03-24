import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistEntity } from './entity/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async updateArtist(id: string, createArtistDto: CreateArtistDto) {
    const entity = await this.artistRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('User not found');
    }
    if (!validate({ id })) {
      throw new HttpException('User not found', StatusCodes.BAD_REQUEST);
    }

    const newEntity = { ...entity, ...createArtistDto };

    await this.artistRepository.save(newEntity);
    return newEntity;
  }
  async create(createArtistDto: CreateArtistDto) {
    if (!createArtistDto) {
      throw new HttpException('Bad request', StatusCodes.BAD_REQUEST);
    }
    return this.artistRepository.save(createArtistDto);
  }

  async findAll() {
    return this.artistRepository.find();
  }

  async finOne(id: string) {
    return this.artistRepository.findOneBy({ id });
  }

  async delete(id: string) {
    const entity = await this.artistRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException('User not found');
    }
    if (!validate({ id })) {
      throw new HttpException('User not found', StatusCodes.BAD_REQUEST);
    }
    return this.artistRepository.remove(entity);
  }
}
