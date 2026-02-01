export interface Track {
  id: number;
  title: string;
  artist: string;
  duration: number;
  size_mb: number;
  encoded_audio: string;
}

export interface Podcast {
  id: number;
  title: string;
  host: string;
  duration: number;
  size_mb: number;
  category: string;
  description: string;
  encoded_audio: string;
}

export interface DataStorage {
  tracks: Track[];
  podcasts: Podcast[];
}

export type AudioItem = (
  | (Track & { type: "track" })
  | (Podcast & { type: "podcast" })
) & { isFavorite?: boolean };
