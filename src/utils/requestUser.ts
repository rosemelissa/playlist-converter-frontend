import axios from "axios";
import checkAccessTokens from "./checkAccessTokens";
import { ISpotifyUserSeach } from "./interfaces";

async function requestUser(): Promise<string | null> {
  await checkAccessTokens();
  const access_token = localStorage.getItem("access_token");
  const headers = {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const user: ISpotifyUserSeach = await axios.get(
      `https://api.spotify.com/v1/me`,
      headers
    );
    return user.data.id;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default requestUser;
