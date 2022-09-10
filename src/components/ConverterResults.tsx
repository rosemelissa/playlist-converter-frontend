import axios from "axios";
import { useState } from "react";
import { ISpotifyPlaylistResponse, ISpotifyTrack, IYoutubeAndSpotify } from "../utils/interfaces";
import SpotifyTrackListing from "./SpotifyTrackListing";
import addTracksToPlaylist from "../utils/addTracksToPlaylist";
import addImageToPlaylist from "../utils/addImageToPlaylist";

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
  const [playlistImage, setPlaylistImage] = useState<File|null>(null);

  const uploadPlaylistImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPlaylistImage(e.target.files[0]);
    }
  }

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
    try {
      const response: ISpotifyPlaylistResponse = await axios.post(`https://api.spotify.com/v1/users/${userID}/playlists`, data, headers);
      console.log(response);
      const playlistID: string = response.data.id;
      await addImageToPlaylist(playlistImage, playlistID);
      await addTracksToPlaylist(spotifySearchResults, playlistID);
    } catch (error) {
      console.error(error);
    }
  }
    
  return (
    <>
      <div className="make-public-playlist">
        <input type="text" id="playlist-name" onChange={(e) => setPlaylistName(e.target.value)} value={playlistName}/>
        <label htmlFor="playlist-name">Playlist name</label>
        <input type="text" id="playlist-description" onChange={(e) => setPlaylistDescription(e.target.value)} value={playlistDescription}/>
        <label htmlFor="playlist-description">Playlist description</label>
        <label htmlFor="cover">Choose a cover picture (max size 256kb):</label>
        <input type="file" id="cover" accept="image/png, image/jpeg" onChange={(e) => uploadPlaylistImage(e)}/>
        <button type="button" onClick={makePublicPlaylist}>Make public playlist from these results</button>
      </div>
      
      <h1>Results of the search:</h1>
      {spotifySearchResults.map((searchResult, i) => <SpotifyTrackListing spotifySearchResults={spotifySearchResults} setSpotifySearchResults={setSpotifySearchResults} thisTrack={searchResult} key={i} indexOfThisTrack={i}/>)}
      <button type="button" onClick={() => setPlaylistSent(false)}>
        Do another playlist
      </button>
    </>
  );
}

export default ConverterResults;