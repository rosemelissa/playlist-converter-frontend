import axios from "axios";
import checkAccessTokens from "./checkAccessTokens";

async function addImageToPlaylist(
  image: File | null,
  playlistID: string
): Promise<void> {
  if (image) {
    let imgFile: string | ArrayBuffer | null = "";
    const reader = new FileReader();
    reader.onloadend = function () {
      imgFile = reader.result;
      sendImageToPlaylistAPI(imgFile, playlistID);
    };
    reader.readAsDataURL(image);
  }
}

async function sendImageToPlaylistAPI(
  imgFile: string | ArrayBuffer | null,
  playlistID: string
) {
  if (typeof imgFile === "string") {
    const re = /data:[A-z]+\/[A-z]+;base64,/g;
    imgFile = imgFile.replace(re, "");
    await checkAccessTokens();
    const access_token = localStorage.getItem("access_token");
    const headers = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "image/jpeg",
      },
    }; //body: imgFile
    console.log(imgFile);
    const body = imgFile;

    const response = await axios.put(
      `https://api.spotify.com/v1/playlists/${playlistID}/images`,
      body,
      headers
    );
    console.log("posting image to playlist" + response);
  }
}

export default addImageToPlaylist;
