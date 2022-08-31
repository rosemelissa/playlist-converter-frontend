import { useState } from "react";
import ConverterResults from "./components/ConverterResults";
import SpotifySignIn from "./components/SpotifySignIn";
import YoutubeSearchPage from "./components/YoutubeSearchPage";
import {ISpotifyTrack} from "./utils/interfaces";

function App(): JSX.Element {
  const [spotifyAuthorised, setSpotifyAuthorised] = useState<boolean>(false);
  const [playlistSent, setPlaylistSent] = useState<boolean>(false);
  const [playlistSubmitted, setPlaylistSubmitted] = useState<boolean>(false);
  const [youtubePlaylistUrl, setYoutubePlaylistUrl] = useState<string>("");
  const [spotifySearchResults, setSpotifySearchResults] = useState<(ISpotifyTrack|undefined)[]>([])

  return (
    <>
      {!spotifyAuthorised && (
        <SpotifySignIn setSpotifyAuthorised={setSpotifyAuthorised} />
      )}
      {spotifyAuthorised && !playlistSubmitted && (
        <YoutubeSearchPage playlistSent={playlistSent} setPlaylistSent={setPlaylistSent}
        youtubePlaylistUrl={youtubePlaylistUrl}
        setYoutubePlaylistUrl={setYoutubePlaylistUrl} setPlaylistSubmitted={setPlaylistSubmitted} spotifySearchResults={spotifySearchResults} setSpotifySearchResults={setSpotifySearchResults}/>
        
      )}
      {spotifyAuthorised && playlistSubmitted && (
        <ConverterResults
          setPlaylistSent={setPlaylistSent}
          youtubePlaylistUrl={youtubePlaylistUrl}
          setYoutubePlaylistUrl={setYoutubePlaylistUrl} spotifySearchResults={spotifySearchResults} setSpotifySearchResults={setSpotifySearchResults}
        />
      )}
    </>
  );
}

export default App;
