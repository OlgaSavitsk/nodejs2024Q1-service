import { Exclude, Type } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column({ nullable: true })
  @Exclude()
  password?: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn({
    type: 'timestamp',
    transformer: {
      to: (value: number) => value,
      from: (value: string) => new Date(value).getTime(),
    },
  })
  @Type(() => Number)
  public createdAt: number;

  @UpdateDateColumn({
    type: 'timestamp',
    transformer: {
      to: (value: number) => value,
      from: (value: string) => new Date(value).getTime(),
    },
  })
  @Type(() => Number)
  public updatedAt: number;

  constructor(user: UserEntity) {
    Object.assign(this, user);
  }

  toResponse() {
    const { id, login, createdAt, version, updatedAt } = this;
    return { id, login, createdAt, version, updatedAt };
  }
}
