import axios from "axios";
import { useState } from "react";
import {
  ISpotifyPlaylistResponse,
  IYoutubeAndSpotify,
} from "../utils/interfaces";
import SpotifyTrackListing from "./SpotifyTrackListing";
import addTracksToPlaylist from "../utils/addTracksToPlaylist";
import addImageToPlaylist from "../utils/addImageToPlaylist";
import checkAccessTokens from "../utils/checkAccessTokens";

interface ConverterResultsProps {
  setPlaylistSent: React.Dispatch<React.SetStateAction<boolean>>;
  setYoutubePlaylistUrl: React.Dispatch<React.SetStateAction<string>>;
  spotifySearchResults: IYoutubeAndSpotify[];
  setSpotifySearchResults: React.Dispatch<
    React.SetStateAction<IYoutubeAndSpotify[]>
  >;
  userID: string | null;
  setPlaylistSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function ConverterResults({
  setPlaylistSent,
  setYoutubePlaylistUrl,
  spotifySearchResults,
  setSpotifySearchResults,
  userID,
  setPlaylistSubmitted,
  setLoading,
}: ConverterResultsProps): JSX.Element {
  const [playlistName, setPlaylistName] = useState<string>("My new playlist");
  const [playlistDescription, setPlaylistDescription] = useState<string>(
    "This is my playlist description"
  );
  const [playlistImage, setPlaylistImage] = useState<File | null>(null);
  const [spotifyPlaylistUrl, setSpotifyPlaylistUrl] = useState<string | null>(
    null
  );

  const uploadPlaylistImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files[0]) {
        if (e.target.files[0].size >= 256 * 1024) {
          window.alert("File is too big");
        } else {
          setPlaylistImage(e.target.files[0]);
        }
      }
    }
  };

  const makePublicPlaylist = async () => {
    setLoading(true);
    await checkAccessTokens();
    const access_token = localStorage.getItem("access_token");
    const headers = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    };
    const data = {
      name: playlistName,
      description: playlistDescription,
      public: true,
    };
    try {
      const response: ISpotifyPlaylistResponse = await axios.post(
        `https://api.spotify.com/v1/users/${userID}/playlists`,
        data,
        headers
      );
      const playlistID: string = response.data.id;
      await addImageToPlaylist(playlistImage, playlistID);
      await addTracksToPlaylist(spotifySearchResults, playlistID);
      setSpotifyPlaylistUrl(response.data.external_urls.spotify);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {spotifyPlaylistUrl && (
        <div className="playlist-created">
          <p>
            Playlist created! Link:{" "}
            <a
              href={spotifyPlaylistUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {spotifyPlaylistUrl}
            </a>
          </p>
          <button
            type="button"
            className="light"
            onClick={() => {
              setPlaylistSent(false);
              setPlaylistSubmitted(false);
              setYoutubePlaylistUrl("");
              setSpotifySearchResults([]);
              setSpotifyPlaylistUrl(null);
            }}
          >
            Search for a different youtube playlist
          </button>
        </div>
      )}
      <div className="make-public-playlist">
        <div className="playlist-name">
          <label htmlFor="playlist-name">Playlist name</label>
          <input
            type="text"
            id="playlist-name"
            onChange={(e) => setPlaylistName(e.target.value)}
            value={playlistName}
          />
        </div>
        <div className="playlist-description">
          <label htmlFor="playlist-description">Playlist description</label>
          <textarea
            id="playlist-description"
            name="playlist-description"
            rows={4}
            cols={50}
            onChange={(e) => setPlaylistDescription(e.target.value)}
            value={playlistDescription}
          />
        </div>
        {playlistImage && (
          <img
            id="playlist-image"
            src={URL.createObjectURL(playlistImage)}
            alt={playlistImage.name}
          />
        )}
        <div className="image-upload">
          Choose a cover picture (max size 256kb):
          <label id="fake-upload-button" htmlFor="cover">
            Upload file
            <input
              type="file"
              id="cover"
              accept="image/jpeg"
              onChange={(e) => uploadPlaylistImage(e)}
            />
          </label>
          {playlistImage && (
            <button
              className="dark"
              type="button"
              onClick={() => setPlaylistImage(null)}
            >
              Remove image
            </button>
          )}
        </div>
        <button
          id="make-playlist"
          className="dark"
          type="button"
          onClick={makePublicPlaylist}
        >
          Make public playlist from these results
        </button>
      </div>

      <h1>Results of the search:</h1>
      <div className="converter-search-results">
        {spotifySearchResults.map((searchResult, i) => (
          <SpotifyTrackListing
            spotifySearchResults={spotifySearchResults}
            setSpotifySearchResults={setSpotifySearchResults}
            thisTrack={searchResult}
            key={i}
            indexOfThisTrack={i}
          />
        ))}
      </div>
    </>
  );
}

export default ConverterResults;
