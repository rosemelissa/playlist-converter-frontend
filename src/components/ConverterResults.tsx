import { useEffect, useState } from "react";
import getPlaylistIdFromUrl from "../utils/getPlaylistIdFromUrl";
import getArrayOfPlaylistItemIds from "../utils/getArrayOfPlaylistItemIds"
import { TitleAndImg } from "../utils/interfaces";

interface ConverterResultsProps {
  setPlaylistSent: React.Dispatch<React.SetStateAction<boolean>>;
  youtubePlaylistUrl: string;
  setYoutubePlaylistUrl: React.Dispatch<React.SetStateAction<string>>;
}

function ConverterResults({
  setPlaylistSent,
  youtubePlaylistUrl,
  setYoutubePlaylistUrl,
}: ConverterResultsProps): JSX.Element {
    const [playlistItems, setPlaylistItems] = useState<TitleAndImg[]>([]);
  const YOUR_API_KEY = "AIzaSyDV3ZLZ_jJ2D_NMSoaLC2alJ9BtWGMMxEw";
  const playlistId = getPlaylistIdFromUrl(youtubePlaylistUrl);

  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=${playlistId}&key=${YOUR_API_KEY}`
    ).then((response) =>
      response.json()
      .then((jsonBody) => setPlaylistItems(getArrayOfPlaylistItemIds(jsonBody)))
    );
  }, []);

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
      {playlistItems.map((item, i) => <h3 key={i}>{item.title}, {item.img}</h3>)}
    </>
  );
}

export default ConverterResults;
