import { useState } from "react";
import {
  ISpotifySearchResponse,
  ISpotifyTrack,
  IYoutubeAndSpotify,
} from "../utils/interfaces";
import formatDuration from "../utils/formatDuration";
import axios from "axios";

interface SearchForDifferentTrackProps {
  setMode: React.Dispatch<React.SetStateAction<"display" | "search">>;
  spotifySearchResults: IYoutubeAndSpotify[];
  setSpotifySearchResults: React.Dispatch<
    React.SetStateAction<IYoutubeAndSpotify[]>
  >;
  indexOfThisTrack: number;
}

function SearchForDifferentTrack({
  setMode,
  spotifySearchResults,
  setSpotifySearchResults,
  indexOfThisTrack,
}: SearchForDifferentTrackProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ISpotifyTrack[] | null>(
    null
  );
  const [newTrack, setNewTrack] = useState<ISpotifyTrack | null>(null);

  const searchForNewTracks = async () => {
    const access_token = localStorage.getItem("access_token");
    const headers = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    };
    let resultsOfThisSearch: ISpotifyTrack[] = [];
    try {
      const searchResults: ISpotifySearchResponse = await axios.get(
        `https://api.spotify.com/v1/search?q=name:${searchTerm}&type=track&limit=5`,
        headers
      );
      console.log(searchResults.data.tracks.items);
      resultsOfThisSearch = [...searchResults.data.tracks.items];
    } catch (error) {
      console.error(error);
    }
    console.log("resultsofthissearch " + resultsOfThisSearch);
    setSearchResults([...resultsOfThisSearch]);
  };

  const useThisTrack = () => {
    const newResults: IYoutubeAndSpotify[] = spotifySearchResults.map(
      (result, i) => {
        if (newTrack) {
          if (i === indexOfThisTrack) {
            console.log("found a match");
            return {
              youtube: { ...result.youtube },
              spotify: { ...newTrack },
            };
          } else {
            console.log("not a macth");
            return result;
          }
        } else {
          console.log("not a result");
          return result;
        }
      }
    );
    setSpotifySearchResults(newResults);
    setMode("display");
  };

  return (
    <>
      <input type="text" onChange={(e) => setSearchTerm(e.target.value)} />
      <button type="button" onClick={searchForNewTracks}>
        Search
      </button>
      {searchResults &&
        searchResults.map((thisTrack, i) => (
          <div
            key={i}
            onClick={() => {
              newTrack && newTrack.id === thisTrack.id
                ? setNewTrack(null)
                : setNewTrack(thisTrack);
            }}
          >
            <h3>Title: {thisTrack.name}</h3>
            <p>Artists: {thisTrack.artists.map((artist) => artist.name)}</p>
            <p>Length: {formatDuration(thisTrack.duration_ms)}</p>
            <img src={thisTrack.album.images[0].url} alt={thisTrack.name} />
          </div>
        ))}
      
        <button
          type="button"
          onClick={() => {
            setMode("display");
          }}
        >
          Cancel
        </button>
      
      {newTrack && (
        <button type="button" onClick={useThisTrack}>
          Use this track
        </button>
      )}
    </>
  );
}

export default SearchForDifferentTrack;
