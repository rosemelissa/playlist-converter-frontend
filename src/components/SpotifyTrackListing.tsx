import { IYoutubeAndSpotify } from "../utils/interfaces";
import formatDuration from "../utils/formatDuration";
import { useState } from "react";
import SearchForDifferentTrack from "./SearchForDifferentTrack";
import formatArtists from "../utils/formatArtists";

interface SpotifyTrackListingProps {
  spotifySearchResults: IYoutubeAndSpotify[];
  setSpotifySearchResults: React.Dispatch<
    React.SetStateAction<IYoutubeAndSpotify[]>
  >;
  thisTrack: IYoutubeAndSpotify;
  indexOfThisTrack: number;
}

function SpotifyTrackListing({
  spotifySearchResults,
  setSpotifySearchResults,
  thisTrack,
  indexOfThisTrack,
}: SpotifyTrackListingProps): JSX.Element {
  const [mode, setMode] = useState<"display" | "search">("display");

  const removeTrackFromPlaylist = () => {
    setSpotifySearchResults(
      spotifySearchResults.filter((result) => {
        if (result.spotify && thisTrack.spotify) {
          return result.spotify.id !== thisTrack.spotify.id;
        } else {
          return true;
        }
      })
    );
  };

  if (thisTrack.spotify) {
    return (
      <div className="spotify-track-listing">
        <div className="original-search-results">
          <div className="youtube-search-result">
            <h3>Youtube: {thisTrack.youtube.title}</h3>
            <img src={thisTrack.youtube.img} alt={thisTrack.youtube.title} />
          </div>
          <div className="spotify-search-result">
            <h3>Title: {thisTrack.spotify.name}</h3>
            <p>Artists: {formatArtists(thisTrack.spotify.artists)}</p>
            <p>Length: {formatDuration(thisTrack.spotify.duration_ms)}</p>
            <img
              src={thisTrack.spotify.album.images[0].url}
              alt={thisTrack.spotify.name}
            />
          </div>
          <div className="spotify-track-listing-buttons">
            <button
              className="dark"
              type="button"
              onClick={removeTrackFromPlaylist}
            >
              Remove from playlist
            </button>
            {mode === "display" && (
              <button
                className="dark"
                type="button"
                onClick={() => setMode("search")}
              >
                Search for a different track
              </button>
            )}
          </div>
        </div>
        {mode === "search" && (
          <SearchForDifferentTrack
            setMode={setMode}
            spotifySearchResults={spotifySearchResults}
            setSpotifySearchResults={setSpotifySearchResults}
            indexOfThisTrack={indexOfThisTrack}
          />
        )}
      </div>
    );
  } else {
    return (
      <div className="spotify-track-listing">
        <h3>Sorry, this track couldn't be found:</h3>
        <p>Title: {thisTrack.youtube.title}</p>
        <img src={thisTrack.youtube.img} alt={thisTrack.youtube.title} />
        {mode === "display" && (
          <button
            className="dark"
            type="button"
            onClick={() => setMode("search")}
          >
            Manually search for track
          </button>
        )}
        {mode === "search" && (
          <SearchForDifferentTrack
            setMode={setMode}
            spotifySearchResults={spotifySearchResults}
            setSpotifySearchResults={setSpotifySearchResults}
            indexOfThisTrack={indexOfThisTrack}
          />
        )}
      </div>
    );
  }
}

export default SpotifyTrackListing;
