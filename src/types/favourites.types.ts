import { Album } from './albums.types';
import { Artist } from './artists.types';
import { Track } from './tracks.types';

export interface Favorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
