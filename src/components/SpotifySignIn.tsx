import { useEffect } from "react";
import getAuthorization from "../utils/getAuthorization";
import requestAuthorization from "../utils/requestAuthorization";
import requestTokens from "../utils/requestTokens";
import requestUser from "../utils/requestUser";

interface SpotifySignInProps {
  setSpotifyAuthorised: React.Dispatch<React.SetStateAction<boolean>>;
  userID: string | null;
  setUserID: React.Dispatch<React.SetStateAction<string | null>>;
}

function SpotifySignIn({
  setSpotifyAuthorised,
  userID,
  setUserID,
}: SpotifySignInProps): JSX.Element {
  useEffect(() => {
    const handlePageLoad = async () => {
      if (window.location.search.length > 0) {
        const authorization = getAuthorization();
        if (authorization) {
          if (authorization.code !== "no code") {
            await requestTokens(authorization.code);
            const user = await requestUser();
            setUserID(user);
            console.log(user);
            setSpotifyAuthorised(true);
          } else {
            console.log(authorization.error);
          }
        } else {
          console.log("authorization is null");
        }
      }
    };
    handlePageLoad();
  }, []);

  const handleLogin = async () => {
    await requestAuthorization();
  };

  return (
    <>
      <h1>Welcome to the Youtube to Spotify converter!</h1>
      <p>
        {" "}
        Simply upload a Youtube playlist url and convert it into a Spotify
        playlist
      </p>
      <p>To get started, log in with Spotify</p>
      <button type="button" onClick={handleLogin}>
        Log into Spotify
      </button>
    </>
  );
}

export default SpotifySignIn;
