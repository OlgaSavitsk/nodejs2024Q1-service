import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Header,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @Header('Accept', 'application/json')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.favoritesService.service.findAll();
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  public async createArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favoritesService.createFavs(id, 'artists');
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  public async createAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favoritesService.createFavs(id, 'albums');
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favoritesService.createFavs(id, 'tracks');
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favoritesService.deleteFavs(id, 'artists');
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favoritesService.deleteFavs(id, 'tracks');
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favoritesService.deleteFavs(id, 'albums');
  }
}
