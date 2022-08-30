import axios from "axios";
import dotenv from "dotenv";
import generateRandomString from "./authorizationUtils/generateRandomString";
dotenv.config();

async function requestAuthorization() {
    
    const CLIENTID = process.env.CLIENTID;
    const CLIENTSECRET = process.env.CLIENTSECRET;
    const baseUrl = "http://localhost:3000";

    const codeVerifier = generateRandomString(64);


    let authorizationUrl = "https://accounts.spotify.com/authorize?";
    authorizationUrl += `clientid=${CLIENTID}`;
    authorizationUrl += `&response_type=code`;
    authorizationUrl += `&redirect_uri=${baseUrl}`;
    authorizationUrl += `&show_dialog=true`;
    authorizationUrl += `&scope=ugc-image-upload playlist-modify-public playlist-modify-private`;
    authorizationUrl += `&code_challenge_method=S256`;
    authorizationUrl += `&code_challenge=`

    await axios.get(authorizationUrl);

}

export default requestAuthorization;