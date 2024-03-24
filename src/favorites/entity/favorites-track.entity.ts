import { TrackEntity } from 'src/track/entity/track.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class FavoritTrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TrackEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'trackId', referencedColumnName: 'id' })
  tracks: TrackEntity[];

  @Column({ name: 'trackId', type: 'uuid' })
  trackId: string | null;
}
