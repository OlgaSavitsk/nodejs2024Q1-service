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
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from 'src/types/artists.types';
import { ArtistEntity } from './entity/artist.entity';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}
  @Get()
  @Header('Accept', 'application/json')
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Artist[]> {
    return await this.artistService.findAll();
  }

  @Get(':id')
  @Header('Accept', 'application/json')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const entity = await this.artistService.finOne(id);
    if (!entity) {
      throw new NotFoundException('User not found');
    }
    return entity;
  }

  @Post()
  @Header('Accept', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTrackDto: CreateArtistDto) {
    return await this.artistService.create(createTrackDto);
  }

  @Put(':id')
  @Header('Accept', 'application/json')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(new ValidationPipe()) createArtistDto: CreateArtistDto,
  ): Promise<ArtistEntity> {
    return await this.artistService.updateArtist(id, createArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.artistService.delete(id);
  }
}
