import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Put,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from 'src/types/tracks.types';
import { User } from 'src/types/user.types';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { UpdatePasswordDto } from 'src/user/dto/update-user-dto';
import { TransformInterceptor } from 'src/user/transform.interceptor';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @Header('Accept', 'application/json')
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Track[]> {
    return await this.trackService.service.find();
  }

  @Get(':id')
  @Header('Accept', 'application/json')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Track> {
    return await this.trackService.service.findOne({ id });
  }

  @Post()
  @Header('Accept', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.service.create(createTrackDto);
  }

  @Put(':id')
  @Header('Accept', 'application/json')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(new ValidationPipe()) createTrackDto: CreateTrackDto,
  ): Promise<Track> {
    return await this.trackService.updateTrack(id, createTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return await this.trackService.service.delete({ id });
  }
}
