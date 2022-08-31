import { useEffect } from "react";
import getAuthorization from "../utils/getAuthorization";
import requestAuthorization from "../utils/requestAuthorization";
import requestTokens from "../utils/requestTokens";

interface SpotifySignInProps {
  setSpotifyAuthorised: React.Dispatch<React.SetStateAction<boolean>>;
}

function SpotifySignIn({
  setSpotifyAuthorised,
}: SpotifySignInProps): JSX.Element {

  useEffect(() => {
    const handlePageLoad = async () => {
      if (window.location.search.length > 0) {
        const authorization = getAuthorization();
        if (authorization) {
          if (authorization.code !== "no code") {
            await requestTokens(authorization.code);
            setSpotifyAuthorised(true);
          } else {
            console.log(authorization.error);
          }
        } else {
          console.log("authorization is null")
        }
      } else {
        await requestAuthorization();
      }
  }
    handlePageLoad();
  }, [])
    
    

  

  return (
    <p>
      Log in to Spotify
    </p>
  );
}

export default SpotifySignIn;
