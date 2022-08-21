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