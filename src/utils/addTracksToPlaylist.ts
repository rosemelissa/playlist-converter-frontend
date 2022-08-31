import axios from "axios";
import { IYoutubeAndSpotify } from "./interfaces";

async function addTracksToPlaylist(tracks: IYoutubeAndSpotify[], playlistID: string) {
    const uriArray: string[] = [];
    for (const track of tracks) {
        if (track.spotify) {
            uriArray.push(track.spotify.uri);
        }
    }
    
    const access_token = localStorage.getItem('access_token')
    const headers = {
    headers: {
        "Authorization": `Bearer ${access_token}`,
        "Content-Type": "application/json",
    }
    };
    const data = {
        "uris": uriArray,
    }
    const response = await axios.post(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, data, headers)
    console.log('posting tracks to playlist' + response)
}

export default addTracksToPlaylist;