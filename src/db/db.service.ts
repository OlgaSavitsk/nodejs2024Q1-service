import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';
import { StatusCodes } from 'http-status-codes';
import { Album } from 'src/types/albums.types';
import { Artist } from 'src/types/artists.types';
import { Favorites } from 'src/types/favourites.types';
import { Track } from 'src/types/tracks.types';
import { User } from 'src/types/user.types';
import { v4 } from 'uuid';

interface ServiceOptions {
  createdOn: boolean;
  updatedOn: boolean;
}

const defaultOptions: ServiceOptions = {
  createdOn: true,
  updatedOn: true,
};

interface DbOptions {
  user: User[];
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
  favourites: Favorites;
}

export const DB_OPTIONS: DbOptions = {
  user: [],
  artists: [],
  albums: [],
  tracks: [],
  favourites: {
    artists: [],
    albums: [],
    tracks: [],
  },
};

@Injectable()
export class DbService {
  private collection;
  private _collectionName: string;
  private db;
  options: ServiceOptions;
  constructor(collectionName, options: ServiceOptions) {
    this._collectionName = collectionName;
    this.db = Object.assign(this, DB_OPTIONS);
    this.options = {
      ...defaultOptions,
      ...options,
    };
  }

  protected getCollection() {
    this.collection = this.db[this._collectionName];
    if (!this.collection) {
      throw new Error(`Collection ${this.collection} is not initialized `);
    }
    console.log(this.collection);
    return this.collection;
  }

  find = () => {
    return this.getCollection();
  };

  findOne = async <T extends User>(filter: T): Promise<T> => {
    const collection = await this.getCollection();
    if (!validate(filter)) {
      throw new HttpException('User not found', StatusCodes.BAD_REQUEST);
    }
    return collection.find((value) => value.id === filter.id);
  };

  async validateCreateOptions<T extends User>(object: T) {
    const entity = object;
    if (!entity.id) {
      entity.id = v4();
    }

    const timestamp = new Date().getTime();

    if (!entity.createdAt && this.options.createdOn) {
      entity.createdAt = timestamp;
    }
    if (!entity.updatedAt && this.options.updatedOn) {
      entity.updatedAt = timestamp;
    }
    return entity as T;
  }

  create = async <T extends User>(object: T) => {
    const collection = await this.getCollection();
    const validEntity = await this.validateCreateOptions(object);
    if (!object) {
      throw new HttpException('Bad request', StatusCodes.BAD_REQUEST);
    }
    collection.push(validEntity);
    return validEntity;
  };

  update = async <T extends User>(
    filter: T,
    updateFn: (entity) => Partial<T>,
  ): Promise<T | null> => {
    const entity = await this.findOne(filter);

    if (!validate(filter)) {
      throw new HttpException('User not found', StatusCodes.BAD_REQUEST);
    }
    if (!entity) {
      throw new NotFoundException('User not found');
    }
    const updatedFields = updateFn(entity);
    const newEntity = { ...entity, ...updatedFields };
    return newEntity;
  };

  delete = async (filter: any): Promise<void> => {
    const collection = await this.getCollection();
    const index: number = collection.findIndex((val) => val.id === filter.id);
    if (index === -1) {
      throw new NotFoundException('User not found');
    }
    if (!validate(filter.id)) {
      throw new HttpException('User not found', StatusCodes.BAD_REQUEST);
    }
    this.collection = collection.splice(index, 1);
  };
}
