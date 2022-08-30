export default interface ISpotifyAPI {
    config: {};
    data: {
        access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
    };
    headers: {};
    request: {};
    status: number;
    statusText: string;
}