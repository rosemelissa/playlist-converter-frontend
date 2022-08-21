import { useState } from "react";
import ConverterResults from "./components/ConverterResults";
import SpotifySignIn from "./components/SpotifySignIn";
import YoutubeSearchPage from "./components/YoutubeSearchPage";

function App(): JSX.Element {
  const [spotifyAuthorised, setSpotifyAuthorised] = useState<boolean>(false);
  const [playlistSent, setPlaylistSent] = useState<boolean>(false);
  const [playlistSubmitted, setPlaylistSubmitted] = useState<boolean>(false);
  const [youtubePlaylistUrl, setYoutubePlaylistUrl] = useState<string>("");

  return (
    <>
      {!spotifyAuthorised && (
        <SpotifySignIn setSpotifyAuthorised={setSpotifyAuthorised} />
      )}
      {spotifyAuthorised && !playlistSubmitted && (
        <YoutubeSearchPage playlistSent={playlistSent} setPlaylistSent={setPlaylistSent}
        youtubePlaylistUrl={youtubePlaylistUrl}
        setYoutubePlaylistUrl={setYoutubePlaylistUrl} setPlaylistSubmitted={setPlaylistSubmitted}/>
        
      )}
      {spotifyAuthorised && playlistSubmitted && (
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
