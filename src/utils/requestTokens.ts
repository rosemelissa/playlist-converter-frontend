import axios from "axios";
import dotenv from "dotenv";
import ISpotifyAPI from "./interfaces";
dotenv.config();
/**
 * Uses the redirect code from requestAuthorization to request access and refresh tokens for the Spotify API
 */
async function requestTokens(code: string): Promise<void> {
  const CLIENTID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const CLIENTSECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
  const baseUrl = "http://localhost:3000";

  const code_verifier = localStorage.getItem("code_verifier");
  let body = `grant_type=authorization_code`;
  body += `&code=${code}`;
  body += `&redirect_uri=${encodeURI(baseUrl)}`;
  body += `&client_id=${CLIENTID}`;
  body += `&code_verifier=${code_verifier}`;

  const headers = {
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(CLIENTID + ":" + CLIENTSECRET).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  };

  const result: ISpotifyAPI = await axios.post(
    "https://accounts.spotify.com/api/token",
    body,
    headers
  );
  console.log(result);

  const access_token = result.data.access_token;
  const refresh_token = result.data.refresh_token;

  const t = new Date();
  const expires_at = t.setSeconds(t.getSeconds() + result.data.expires_in);

  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);
  localStorage.setItem("expires_at", expires_at.toString());
}

export default requestTokens;
