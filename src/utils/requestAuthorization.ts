import dotenv from "dotenv";
import { baseUrl } from "../constants";
import generateCodeChallenge from "./authorizationUtils/generateCodeChallenge";
import generateRandomString from "./authorizationUtils/generateRandomString";

/**
 * <Requests authorization with my Spotify account so the user can use my app>
 */
async function requestAuthorization(): Promise<void> {
  dotenv.config();

  const CLIENTID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

  const codeVerifier = generateRandomString(64);
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  window.localStorage.setItem("code_verifier", codeVerifier);

  let authorizationUrl = "https://accounts.spotify.com/authorize";
  authorizationUrl += `?client_id=${CLIENTID}`;
  authorizationUrl += `&response_type=code`;
  authorizationUrl += `&redirect_uri=${encodeURI(baseUrl)}`;
  authorizationUrl += `&show_dialog=true`;
  authorizationUrl += `&scope=ugc-image-upload playlist-modify-public playlist-modify-private`;
  authorizationUrl += `&code_challenge_method=S256`;
  authorizationUrl += `&code_challenge=${codeChallenge}`;

  window.location.href = authorizationUrl;
}

export default requestAuthorization;
