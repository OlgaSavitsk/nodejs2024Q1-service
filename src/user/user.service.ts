import { ForbiddenException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { User } from 'src/types/user.types';
import { UpdatePasswordDto } from './dto/update-user-dto';

@Injectable()
export class UserService {
  service: DbService<User>;

  constructor() {
    this.service = new DbService<User>('user');
  }

  async updateUser(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.service.findOne({ id });
    if (user.password === updatePasswordDto.newPassword) {
      throw new ForbiddenException('Forbidden');
    }
    return this.service.update({ id }, ({ version }) => ({
      version: version + 1,
      password: updatePasswordDto.newPassword,
    }));
  }
}
