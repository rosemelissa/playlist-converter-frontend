import { useState } from "react";
import ConverterResults from "./components/ConverterResults";
import Loading from "./components/Loading";
import SpotifySignIn from "./components/SpotifySignIn";
import YoutubeSearchPage from "./components/YoutubeSearchPage";
import { IYoutubeAndSpotify } from "./utils/interfaces";

function App(): JSX.Element {
  const [spotifyAuthorised, setSpotifyAuthorised] = useState<boolean>(false);
  const [playlistSent, setPlaylistSent] = useState<boolean>(false);
  const [playlistSubmitted, setPlaylistSubmitted] = useState<boolean>(false);
  const [youtubePlaylistUrl, setYoutubePlaylistUrl] = useState<string>("");
  const [spotifySearchResults, setSpotifySearchResults] = useState<
    IYoutubeAndSpotify[]
  >([]);
  const [userID, setUserID] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      {loading && <Loading loading={loading} setLoading={setLoading} />}
      {!spotifyAuthorised && (
        <SpotifySignIn
          setSpotifyAuthorised={setSpotifyAuthorised}
          userID={userID}
          setUserID={setUserID}
          setLoading={setLoading}
        />
      )}
      {spotifyAuthorised && !playlistSubmitted && (
        <YoutubeSearchPage
          playlistSent={playlistSent}
          setPlaylistSent={setPlaylistSent}
          youtubePlaylistUrl={youtubePlaylistUrl}
          setYoutubePlaylistUrl={setYoutubePlaylistUrl}
          setPlaylistSubmitted={setPlaylistSubmitted}
          setSpotifySearchResults={setSpotifySearchResults}
          setLoading={setLoading}
        />
      )}
      {spotifyAuthorised && playlistSubmitted && (
        <ConverterResults
          setPlaylistSent={setPlaylistSent}
          setYoutubePlaylistUrl={setYoutubePlaylistUrl}
          spotifySearchResults={spotifySearchResults}
          setSpotifySearchResults={setSpotifySearchResults}
          userID={userID}
          setPlaylistSubmitted={setPlaylistSubmitted}
          setLoading={setLoading}
        />
      )}
    </>
  );
}

export default App;
