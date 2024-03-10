import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Favorites } from 'src/types/favourites.types';
import { DbService } from 'src/db/db.service';

@Injectable()
export class FavoritesService {
  service: DbService<Favorites>;
  favs: Favorites;

  constructor() {
    this.service = new DbService('favorites');
  }

  async createFavs(id: string, entityName: string) {
    return await this.service.updateMany(entityName, (entity: string[]) => {
      const index: number = this.service.db[entityName].findIndex(
        (val) => val.id === id,
      );
      if (index === -1) {
        throw new UnprocessableEntityException('Unprocessable Content');
      }
      return [...entity, id];
    });
  }

  async deleteFavs(id: string, entityName: string) {
    return await this.service.updateMany(entityName, (entity: string[]) => [
      ...entity.filter((ent) => ent !== id),
    ]);
  }
}
