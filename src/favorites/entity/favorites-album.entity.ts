import { AlbumEntity } from 'src/album/entity/album.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class FavoritAlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AlbumEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'albumId', referencedColumnName: 'id' })
  albums: AlbumEntity[];

  @Column({ name: 'albumId', type: 'uuid' })
  albumId: string | null;
}
