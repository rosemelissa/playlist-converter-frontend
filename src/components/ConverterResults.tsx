import { ISpotifySearchData, ISpotifyTrack } from "../utils/interfaces";

interface ConverterResultsProps {
  setPlaylistSent: React.Dispatch<React.SetStateAction<boolean>>;
  youtubePlaylistUrl: string;
  setYoutubePlaylistUrl: React.Dispatch<React.SetStateAction<string>>;
  spotifySearchResults: (ISpotifyTrack|undefined)[];
  setSpotifySearchResults: React.Dispatch<React.SetStateAction<(ISpotifyTrack|undefined)[]>>;
}

function ConverterResults({
  setPlaylistSent,
  youtubePlaylistUrl,
  setYoutubePlaylistUrl, spotifySearchResults, setSpotifySearchResults
}: ConverterResultsProps): JSX.Element {
    
  return (
    <>
      <h1>Spotify playlist link:</h1>
      <p>Link that needs to be a clickable URL</p>
      <h2>These songs were skipped:</h2>
      <p>
        Some kind of map here over array of songs not added to spotify playlist
      </p>
      <button type="button" onClick={() => setPlaylistSent(false)}>
        Do another playlist
      </button>
    </>
  );
}

export default ConverterResults;
