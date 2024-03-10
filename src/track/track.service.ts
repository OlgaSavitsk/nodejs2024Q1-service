import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { DbService } from 'src/db/db.service';
import { Track } from 'src/types/tracks.types';

@Injectable()
export class TrackService {
  service: DbService<Track>;
  track: Track;

  constructor() {
    this.service = new DbService<Track>('tracks');
  }

  async createTrack(createTrackDto: CreateTrackDto) {
    const track = await this.service.create(createTrackDto);
    this.track = track;
    return this.track;
  }

  async updateTrack(id: string, createTrackDto: CreateTrackDto) {
    return this.service.update({ id }, () => ({
      ...createTrackDto,
    }));
  }
}
