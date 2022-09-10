export default interface ISpotifyAPI {
  config: Record<string, unknown>;
  data: {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
  };
  headers: Record<string, unknown>;
  request: Record<string, unknown>;
  status: number;
  statusText: string;
}

export interface IYoutubeSearchResponse {
  config: Record<string, unknown>;
  data: IYoutubeSearchData;
  headers: Record<string, unknown>;
  request: Record<string, unknown>;
  status: number;
  statusText: string;
}

export interface IYoutubeSearchData {
  kind: string;
  etag: string;
  items: OnePlaylistItem[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  nextPageToken?: string;
}

export interface OnePlaylistItem {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
      standard: {
        url: string;
        width: number;
        height: number;
      };
      maxres: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: {
      kind: string;
      videoId: string;
    };
    videoOwnerChannelTitle: string;
    videoOwnerChannelId: string;
  };
  contentDetails: {
    videoId: string;
    videoPublishedAt: string;
  };
}

export interface TitleAndImg {
  title: string;
  img: string;
}

export interface ISpotifySearchResponse {
  config: Record<string, unknown>;
  data: ISpotifySearchData;
  headers: Record<string, unknown>;
  request: Record<string, unknown>;
  status: number;
  statusText: string;
}

export interface ISpotifySearchData {
  tracks: {
    href: string;
    items: ISpotifyTrack[];
    limit: number;
    next: string;
    offset: number;
    previos: string;
    total: number;
  };
  arists: Record<string, unknown>;
  albums: Record<string, unknown>;
  playlists: Record<string, unknown>;
  shows: Record<string, unknown>;
  episodes: Record<string, unknown>;
}

export interface ISpotifyTrack {
  album: {
    album_type: string;
    artists: Record<string, unknown>[];
    available_markets: string[];
    external_urls: { spotify: string };
    href: string;
    id: string;
    images: { height: number; url: string; width: number }[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  };
  artists: {
    external_urls: { spotify: string };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: { isrc: string };
  external_urls: { spotify: string };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string|null;
  track_number: number;
  type: string;
  uri: string;
}

export interface IYoutubeAndSpotify {
  youtube: TitleAndImg;
  spotify: ISpotifyTrack | null;
}

export interface ISpotifyUserSeach {
  config: Record<string, unknown>;
  data: IUser;
  headers: Record<string, unknown>;
  request: Record<string, unknown>;
  status: number;
  statusText: string;
}

export interface IUser {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: {
    url: string;
    height: 300;
    width: 300;
  }[];
  product: string;
  type: string;
  uri: string;
}

export interface ISpotifyPlaylistResponse {
  config: Record<string, unknown>;
  data: ISpotifyPlaylist;
  headers: Record<string, unknown>;
  request: Record<string, unknown>;
  status: number;
  statusText: string;
}

export interface ISpotifyPlaylist {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  followers: Record<string, unknown>;
  href: string;
  id: string;
  images: [] | Record<string, unknown>[];
  name: string;
  owner: Record<string, unknown>;
  primary_color: null;
  public: boolean;
  snapshot_id: string;
  tracks: Record<string, unknown>;
  type: string;
  uri: string;
}
