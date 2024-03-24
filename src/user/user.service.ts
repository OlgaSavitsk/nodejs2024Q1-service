import {
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdatePasswordDto } from './dto/update-user-dto';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusCodes } from 'http-status-codes';
import { validate } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto) {
      throw new HttpException('Bad request', StatusCodes.BAD_REQUEST);
    }
    return this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async finOne(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async updateUser(id: string, updatePasswordDto: UpdatePasswordDto) {
    const entity = await this.userRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('User not found');
    }
    if (!validate(id)) {
      throw new HttpException('User not found', StatusCodes.BAD_REQUEST);
    }
    if (entity.password === updatePasswordDto.newPassword) {
      throw new ForbiddenException('Forbidden');
    }

    const updatedFields = {
      version: entity.version + 1,
      password: updatePasswordDto.newPassword,
    };
    const newEntity = { ...entity, ...updatedFields };

    return await this.userRepository.save(newEntity);
  }

  async delete(id: string) {
    const entity = await this.userRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException('User not found');
    }
    if (!validate(id)) {
      throw new HttpException('User not found', StatusCodes.BAD_REQUEST);
    }
    return await this.userRepository.remove(entity);
  }
}
