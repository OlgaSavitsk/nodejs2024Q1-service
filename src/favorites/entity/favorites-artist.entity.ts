import { ArtistEntity } from 'src/artist/entity/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class FavoritArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ArtistEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artists: ArtistEntity[];

  @Column({ name: 'artistId', type: 'uuid' })
  artistId: string | null;
}
