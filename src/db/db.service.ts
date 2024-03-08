import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';
import { StatusCodes } from 'http-status-codes';
// import { DbOptions, DbParams } from 'src/db';
import { Album } from 'src/types/albums.types';
import { Artist } from 'src/types/artists.types';
import { Favourites } from 'src/types/favourites.types';
import { Track } from 'src/types/tracks.types';
import { User } from 'src/types/user.types';
import { v4 } from 'uuid';

export type DbOptions = {
  user: User[];
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
  favourites: Favourites;
};

export const DB_OPTIONS_DEFAULT: DbOptions = {
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

export interface DbParams {
  id: string;
  createdAt?: number;
  updatedAt?: number;
  version?: number;
}

// @Injectable()
export class DbService<T extends DbParams> {
  public collection: T[];
  private _collectionName: string;
  private db: DbOptions;

  constructor(collectionName: string) {
    this._collectionName = collectionName;
    this.db = DB_OPTIONS_DEFAULT;
  }

  protected getCollection = () => {
    this.collection = this.db[this._collectionName];
    if (!this.collection) {
      throw new Error(`Collection ${this.collection} is not initialized `);
    }
    return this.collection;
  };

  exist = async (filter: Partial<T>): Promise<boolean> => {
    const entity = await this.findOne(filter);
    return Boolean(entity);
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

  async validateCreateOptions(object: Partial<T>) {
    const entity = object;
    if (!entity.id) {
      entity.id = v4();
    }

    if (!entity.version) {
      entity.version = 1;
    }
    const timestamp = new Date().getTime();

    if (!entity.createdAt) {
      entity.createdAt = timestamp;
    }
    if (!entity.updatedAt) {
      entity.updatedAt = timestamp;
    }
    return entity as T;
  }

  create = async (
    object: Partial<T>,
    // updateFn?: (entity: DbOptions) => DbOptions,
  ) => {
    const collection = await this.getCollection();
    const validEntity = await this.validateCreateOptions(object);
    if (!object) {
      throw new HttpException('Bad request', StatusCodes.BAD_REQUEST);
    }
    collection.push(validEntity);
    // if (updateFn) this.db = updateFn(this.db);
    // console.log(this.db);
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

  delete = async (
    filter: Partial<T>,
    // updateFn?: (entity: DbOptions) => DbOptions,
  ): Promise<void> => {
    const collection = await this.getCollection();
    const index: number = collection.findIndex((val) => val.id === filter.id);
    if (index === -1) {
      throw new NotFoundException('User not found');
    }
    if (!validate(filter)) {
      throw new HttpException('User not found', StatusCodes.BAD_REQUEST);
    }
    collection.splice(index, 1);
    // if (updateFn) {
    //   // console.log('44444', collection);
    //   const updatedDb = updateFn(this.db);
    //   this.db = updatedDb;
    // }
    console.log('44444', this.db);
    this.collection = collection;
  };
}
