import { useState } from "react";
import ConverterResults from "./components/ConverterResults";
import SpotifySignIn from "./components/SpotifySignIn";
import YoutubeSearchPage from "./components/YoutubeSearchPage";
import YoutubeUrlInput from "./components/YoutubeUrlInput";

function App(): JSX.Element {
  const [spotifyAuthorised, setSpotifyAuthorised] = useState<boolean>(false);
  const [playlistSent, setPlaylistSent] = useState<boolean>(false);
  const [youtubePlaylistUrl, setYoutubePlaylistUrl] = useState<string>("");

  return (
    <>
      {!spotifyAuthorised && (
        <SpotifySignIn setSpotifyAuthorised={setSpotifyAuthorised} />
      )}
      {spotifyAuthorised && (
        <YoutubeSearchPage playlistSent={playlistSent} setPlaylistSent={setPlaylistSent}
        youtubePlaylistUrl={youtubePlaylistUrl}
        setYoutubePlaylistUrl={setYoutubePlaylistUrl}/>
        
      )}
      {!spotifyAuthorised && playlistSent && (
        <ConverterResults
          setPlaylistSent={setPlaylistSent}
          youtubePlaylistUrl={youtubePlaylistUrl}
          setYoutubePlaylistUrl={setYoutubePlaylistUrl}
        />
      )}
    </>
  );
}

export default App;
