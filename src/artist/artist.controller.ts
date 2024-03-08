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
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from 'src/types/artists.types';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @Header('Accept', 'application/json')
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Artist[]> {
    return await this.artistService.service.find();
  }

  @Get(':id')
  @Header('Accept', 'application/json')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Artist> {
    return await this.artistService.service.findOne({ id });
  }

  @Post()
  @Header('Accept', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTrackDto: CreateArtistDto) {
    return await this.artistService.service.create(createTrackDto);
  }

  @Put(':id')
  @Header('Accept', 'application/json')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(new ValidationPipe()) createArtistDto: CreateArtistDto,
  ): Promise<Artist> {
    return await this.artistService.updateArtist(id, createArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    await this.artistService.deleteTrack(id);
    await this.artistService.deleteAlbum(id);
    return await this.artistService.service.delete({ id });
  }
}
