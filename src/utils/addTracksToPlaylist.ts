import axios from "axios";
import { IYoutubeAndSpotify } from "./interfaces";

async function addTracksToPlaylist(
  tracks: IYoutubeAndSpotify[],
  playlistID: string
): Promise<void> {
  const uriArrays: string[][] = [];
  let uriArray: string[] = [];

  for (const track of tracks) {
    if (uriArray.length < 100) {
      if (track.spotify) {
        uriArray.push(track.spotify.uri);
      }
    } else {
      uriArrays.push([...uriArray]);
      uriArray = [];
      if (track.spotify) {
        uriArray.push(track.spotify.uri);
      }
    }
  }
  uriArrays.push(uriArray);

  if (uriArrays) {
    for (const uriArray of uriArrays) {
      if (uriArray.length > 0) {
        const access_token = localStorage.getItem("access_token");
        const headers = {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        };
        const data = {
          uris: uriArray,
        };
        const response = await axios.post(
          `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
          data,
          headers
        );
        console.log("posting tracks to playlist" + response);
      }
    }
  }
}

export default addTracksToPlaylist;
