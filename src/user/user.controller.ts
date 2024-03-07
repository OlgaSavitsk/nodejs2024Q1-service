import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/types/user.types';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePasswordDto } from './dto/update-user-dto';
import { TransformInterceptor } from './transform.interceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Header('Accept', 'application/json')
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<User[]> {
    return await this.userService.service.find();
  }

  @Get(':id')
  @Header('Accept', 'application/json')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<User> {
    return await this.userService.service.findOne({ id });
  }

  @Post()
  @Header('Accept', 'application/json')
  @UseInterceptors(new TransformInterceptor())
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.service.create(createUserDto);
  }

  @Put(':id')
  @Header('Accept', 'application/json')
  @UseInterceptors(new TransformInterceptor())
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(new ValidationPipe()) { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<User> {
    return await this.userService.updateUser(id, { oldPassword, newPassword });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return await this.userService.service.delete({ id });
  }
}
