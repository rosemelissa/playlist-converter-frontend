import { useEffect } from "react";
import { baseUrl } from "../constants";
import getAuthorization from "../utils/getAuthorization";
import requestAuthorization from "../utils/requestAuthorization";
import requestTokens from "../utils/requestTokens";
import requestUser from "../utils/requestUser";

interface SpotifySignInProps {
  setSpotifyAuthorised: React.Dispatch<React.SetStateAction<boolean>>;
  userID: string | null;
  setUserID: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function SpotifySignIn({
  setSpotifyAuthorised,
  userID,
  setUserID,
  setLoading,
}: SpotifySignInProps): JSX.Element {
  useEffect(() => {
    setLoading(true);
    const handlePageLoad = async () => {
      if (window.location.search.length > 0) {
        const authorization = getAuthorization();
        if (authorization) {
          if (authorization.code !== "no code") {
            await requestTokens(authorization.code);
            const user = await requestUser();
            setUserID(user);
            setSpotifyAuthorised(true);
            setLoading(false);
            window.history.pushState("", "", `${baseUrl}`);
          } else {
            // console.log(authorization.error);
          }
        } else {
          // console.log("authorization is null");
        }
      } else {
        setLoading(false);
      }
    };
    handlePageLoad();
    // eslint-disable-next-line
  }, []);

  const handleLogin = async () => {
    await requestAuthorization();
    setLoading(true);
  };

  return (
    <div id="spotify-sign-in">
      <h1>Welcome to the Youtube to Spotify converter!</h1>
      <p>
        {" "}
        Simply upload a Youtube playlist url and convert it into a Spotify
        playlist
      </p>
      <p>To get started, log in with Spotify</p>
      <button className="light" type="button" onClick={handleLogin}>
        Log into Spotify
      </button>
    </div>
  );
}

export default SpotifySignIn;
