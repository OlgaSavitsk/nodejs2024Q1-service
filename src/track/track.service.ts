import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackEntity } from './entity/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { StatusCodes } from 'http-status-codes';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    if (!createTrackDto) {
      throw new HttpException('Bad request', StatusCodes.BAD_REQUEST);
    }
    return this.trackRepository.save(createTrackDto);
  }

  async findAll() {
    return await this.trackRepository.find();
  }
  async finOne(id: string) {
    return await this.trackRepository.findOneBy({ id });
  }

  async updateUser(id: string, updateTrackDto: CreateTrackDto) {
    const entity = await this.trackRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('User not found');
    }
    if (!validate({ id })) {
      throw new HttpException('User not found', StatusCodes.BAD_REQUEST);
    }
    const newEntity = { ...entity, ...updateTrackDto };
    await this.trackRepository.save(newEntity);
    return newEntity;
  }

  async delete(id: string) {
    const entity = await this.trackRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException('User not found');
    }
    if (!validate({ id })) {
      throw new HttpException('User not found', StatusCodes.BAD_REQUEST);
    }
    return await this.trackRepository.remove(entity);
  }
}
