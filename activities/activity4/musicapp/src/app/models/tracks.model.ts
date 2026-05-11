export interface Track {
  trackId: number;
  title: string;
  number: number;
  video: string;
  lyrics: string;
}

export function createTrack(): Track {
  return { trackId: 0, title: '', number: 0, video: '', lyrics: '' };
}