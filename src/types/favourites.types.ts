import { Album } from './albums.types';
import { Artist } from './artists.types';
import { Track } from './tracks.types';

export interface Favourites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
