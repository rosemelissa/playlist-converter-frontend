export interface PlaylistItemsJsonBody {
    kind: string;
    etag: string;
    items: OnePlaylistItem[];
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
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
              url: string,
              width: number,
              height: number;
            };
            medium: {
                url: string,
                width: number,
                height: number;
              };
            high: {
                url: string,
                width: number,
                height: number;
              };
            standard: {
                url: string,
                width: number,
                height: number;
              };
            maxres: {
                url: string,
                width: number,
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
  config: {};
  data: ISpotifySearchData;
  headers: {};
  request: {};
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
  }
  arists: {};
  albums: {};
  playlists: {};
  shows: {};
  episodes: {};
}

export interface ISpotifyTrack {
  album: {
    album_type: string;
    artists: {}[]
    available_markets: string[];
    external_urls: {spotify: string};
    href: string;
    id: string;
    images: 
    {height: number; url: string; width: number}[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string};
  artists: {
    external_urls: {spotify: string};
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string}[]
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {isrc: string};
  external_urls: {spotify: string};
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: any;
  track_number: number;
  type: string;
  uri: string;
}