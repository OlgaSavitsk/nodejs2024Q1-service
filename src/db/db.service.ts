import { HttpException, NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';
import { StatusCodes } from 'http-status-codes';
import { Album } from 'src/types/albums.types';
import { Artist } from 'src/types/artists.types';
import { Favorites } from 'src/types/favourites.types';
import { Track } from 'src/types/tracks.types';
import { User } from 'src/types/user.types';
import { v4 } from 'uuid';

export type DbOptions = {
  user: User[];
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
  favorites: Favorites;
};

export const DB_OPTIONS_DEFAULT: DbOptions = {
  user: [],
  artists: [],
  albums: [],
  tracks: [],
  favorites: {
    artists: [],
    albums: [],
    tracks: [],
  },
};

export type DbParams = {
  id?: string;
  createdAt?: number;
  updatedAt?: number;
  version?: number;
} & Partial<Favorites>;

interface ServiceOptions {
  createdOn: boolean;
  updatedOn: boolean;
}

const defaultOptions: ServiceOptions = {
  createdOn: false,
  updatedOn: false,
};

export class DbService<T extends DbParams> {
  private collection: T[];
  private _collectionName: string;
  db: DbOptions;
  options: ServiceOptions;

  constructor(collectionName: string, options?: ServiceOptions) {
    this._collectionName = collectionName;
    this.db = DB_OPTIONS_DEFAULT;
    this.options = { ...defaultOptions, ...options };
  }

  protected getCollection = () => {
    this.collection = this.db[this._collectionName];
    if (!this.collection) {
      throw new Error(`Collection ${this.collection} is not initialized `);
    }
    return this.collection;
  };

  find = async () => {
    return this.getCollection();
  };

  findOne = async (filter: Partial<T>): Promise<T> => {
    const collection = await this.getCollection();
    if (!validate(filter)) {
      throw new HttpException('User not found', StatusCodes.BAD_REQUEST);
    }
    const entity = collection.find((value) => value.id === filter.id);
    if (!entity) {
      throw new NotFoundException('User not found');
    }
    return entity;
  };

  findAll = async () => {
    const collection = await this.getCollection();
    const result = Object.entries(collection).reduce((acc, [key, value]) => {
      acc[key] = (value as unknown as string[])
        .map((id) => {
          return this.db[key].find((entity) => entity.id === id);
        })
        .filter((val) => val);

      return acc;
    }, {});
    return result;
  };

  async validateCreateOptions(object: Partial<T>) {
    const entity = object;
    if (!entity.id) {
      entity.id = v4();
    }

    if (!entity.version && this.options.createdOn) {
      entity.version = 1;
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

  create = async (object: Partial<T>) => {
    const collection = await this.getCollection();
    const validEntity = await this.validateCreateOptions(object);
    if (!object) {
      throw new HttpException('Bad request', StatusCodes.BAD_REQUEST);
    }
    collection.push(validEntity);

    return validEntity;
  };

  update = async (
    filter?: Partial<T>,
    updateFn?: (entity: Partial<T>) => Partial<T>,
  ): Promise<T | null> => {
    const entity = await this.findOne(filter);

    if (!entity) {
      throw new NotFoundException('User not found');
    }
    if (!validate(filter)) {
      throw new HttpException('User not found', StatusCodes.BAD_REQUEST);
    }

    const updatedFields = updateFn(entity);
    const newEntity = { ...entity, ...updatedFields };
    const updatedDate = new Date().getTime();
    newEntity.updatedAt = updatedDate;

    const collection = await this.getCollection();
    const index: number = collection.findIndex((val) => val.id === filter.id);
    collection[index] = { ...newEntity };
    this.collection = collection;
    return newEntity;
  };

  updateMany = async (
    filter?: string,
    updateFn?: (entity: string[]) => string[],
  ) => {
    const collection = await this.getCollection();
    const updatedFields = updateFn(collection[filter]);
    collection[filter] = updatedFields;
    this.collection = collection;
    return updatedFields;
  };

  delete = async (filter: Partial<T>): Promise<void> => {
    const collection = await this.getCollection();
    const index: number = collection.findIndex((val) => val.id === filter.id);
    if (index === -1) {
      throw new NotFoundException('User not found');
    }
    if (!validate(filter)) {
      throw new HttpException('User not found', StatusCodes.BAD_REQUEST);
    }
    collection.splice(index, 1);
    this.collection = collection;
  };
}
