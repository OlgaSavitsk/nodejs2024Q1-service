import { AlbumEntity } from 'src/album/entity/album.entity';
import { ArtistEntity } from 'src/artist/entity/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tarcks')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'uuid', nullable: true })
  @OneToOne(() => ArtistEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  public artistId: string | null;

  @Column({ type: 'uuid', nullable: true })
  @OneToOne(() => AlbumEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'albumId' })
  public albumId: string | null;

  @Column()
  public duration: number;
}
