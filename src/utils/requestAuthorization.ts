import dotenv from "dotenv";
import generateCodeChallenge from "./authorizationUtils/generateCodeChallenge";
import generateRandomString from "./authorizationUtils/generateRandomString";

/**
 * <Requests authorization with my Spotify account so the user can use my app>
 */
async function requestAuthorization(): Promise<void> {
    dotenv.config();

    const CLIENTID = "871f39857438482f9d88bddd3ec583e4";
    const CLIENTSECRET = process.env.CLIENTSECRET;
    const baseUrl = "http://localhost:3000";

    const codeVerifier = generateRandomString(64);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    window.localStorage.setItem('code_verifier', codeVerifier);

    let authorizationUrl = "https://accounts.spotify.com/authorize";
    authorizationUrl += `?client_id=${CLIENTID}`;
    authorizationUrl += `&response_type=code`;
    authorizationUrl += `&redirect_uri=${encodeURI(baseUrl)}`;
    authorizationUrl += `&show_dialog=true`;
    authorizationUrl += `&scope=ugc-image-upload&playlist-modify-public&playlist-modify-private`;
    authorizationUrl += `&code_challenge_method=S256`;
    authorizationUrl += `&code_challenge=${codeChallenge}`

    window.location.href = authorizationUrl;   
    
}

export default requestAuthorization;