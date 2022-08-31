import axios from "axios";
import { useState } from "react";
import { ISpotifyTrack, IYoutubeAndSpotify } from "../utils/interfaces";
import SpotifyTrackListing from "./SpotifyTrackListing";

interface ConverterResultsProps {
  setPlaylistSent: React.Dispatch<React.SetStateAction<boolean>>;
  youtubePlaylistUrl: string;
  setYoutubePlaylistUrl: React.Dispatch<React.SetStateAction<string>>;
  spotifySearchResults: IYoutubeAndSpotify[];
  setSpotifySearchResults: React.Dispatch<React.SetStateAction<IYoutubeAndSpotify[]>>;
  userID: string|null;
}

function ConverterResults({
  setPlaylistSent,
  youtubePlaylistUrl,
  setYoutubePlaylistUrl, spotifySearchResults, setSpotifySearchResults, userID
}: ConverterResultsProps): JSX.Element {
  const [playlistName, setPlaylistName] = useState<string>("My new playlist");
  const [playlistDescription, setPlaylistDescription] = useState<string>("This is my playlist description");

  const makePublicPlaylist = async () => {
    const access_token = localStorage.getItem('access_token')
    const headers = {
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Content-Type": "application/json",
      }
    };
    const data = {
      "name": playlistName,
      "description": playlistDescription,
      "public": true,
    }
    await axios.post(`https://api.spotify.com/v1/users/${userID}/playlists`, data, headers)
  }
    
  return (
    <>
      <input type="text" id="playlist-name" onChange={(e) => setPlaylistName(e.target.value)} value={playlistName}/>
      <label htmlFor="playlist-name">Playlist name</label>
      <input type="text" id="playlist-description" onChange={(e) => setPlaylistDescription(e.target.value)} value={playlistDescription}/>
      <label htmlFor="playlist-description">Playlist description</label>
      <button type="button" onClick={makePublicPlaylist}>Make public playlist from these results</button>
      <h1>Results of the search:</h1>
      {spotifySearchResults.map((searchResult, i) => <SpotifyTrackListing thisTrack={searchResult} key={i}/>)}
      <button type="button" onClick={() => setPlaylistSent(false)}>
        Do another playlist
      </button>
    </>
  );
}

export default ConverterResults;
