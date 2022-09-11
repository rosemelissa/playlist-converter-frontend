import axios from "axios";
import dotenv from "dotenv";
import ISpotifyAPI from "./interfaces";
dotenv.config();

async function refreshAccessToken(): Promise<void> {
  const refresh_token = localStorage.getItem("refresh_token");
  const CLIENTID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  if (refresh_token && CLIENTID) {
    const headers = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    };
    const body = new URLSearchParams({
      grant_type: "refresh_token",
      client_id: CLIENTID,
      refresh_token: refresh_token,
    });
    const result: ISpotifyAPI = await axios.post(
      "https://accounts.spotify.com/api/token",
      body,
      headers
    );
    console.log(result + "refreshing tokens");

    const new_access_token = result.data.access_token;
    const new_refresh_token = result.data.refresh_token;

    const t = new Date();
    const new_expires_at = t.setSeconds(
      t.getSeconds() + result.data.expires_in
    );

    localStorage.setItem("access_token", new_access_token);
    localStorage.setItem("refresh_token", new_refresh_token);
    localStorage.setItem("expires_at", new_expires_at.toString());
  }
}

export default refreshAccessToken;
