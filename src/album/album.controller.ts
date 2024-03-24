import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Header,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Put,
  ValidationPipe,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumEntity } from './entity/album.entity';
import { validate } from 'class-validator';
import { StatusCodes } from 'http-status-codes';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}
  @Get()
  @Header('Accept', 'application/json')
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<AlbumEntity[]> {
    return await this.albumService.findAll();
  }

  @Get(':id')
  @Header('Accept', 'application/json')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const entity = await this.albumService.finOne(id);
    if (!entity) {
      throw new NotFoundException('User not found');
    }
    return entity;
  }

  @Post()
  @Header('Accept', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  @Header('Accept', 'application/json')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(new ValidationPipe()) createAlbumDto: CreateAlbumDto,
  ) {
    return await this.albumService.updateArtist(id, createAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const entity: AlbumEntity | null = await this.albumService.finOne(id);
    if (!entity) {
      throw new NotFoundException('User not found');
    }
    if (!validate({ id })) {
      throw new HttpException('User not found', StatusCodes.BAD_REQUEST);
    }
    await this.albumService.delete(entity);
  }
}
