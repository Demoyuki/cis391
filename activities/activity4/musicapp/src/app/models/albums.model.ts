import { Track } from './tracks.model';

export interface Album {
  albumId: number;
  title: string;
  artist: string;
  description: string;
  year: string;
  image: string;
  tracks: Track[];
}

export function createAlbum(): Album {
  return { albumId: 0, title: '', artist: '', description: '', year: '', image: '', tracks: [] };
}