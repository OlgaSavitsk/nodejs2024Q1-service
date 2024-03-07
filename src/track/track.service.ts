import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { DbService } from 'src/db/db.service';
import { Track } from 'src/types/tracks.types';

@Injectable()
export class TrackService {
  service: DbService<Track>;

  constructor(private dbService: DbService<Track>) {
    this.service = this.dbService.createService('user');
  }
  async updateTrack(id: string, createTrackDto: CreateTrackDto) {
    return this.service.update({ id }, () => ({
      ...createTrackDto,
    }));
  }
}
