import { useEffect, useState } from "react";
import getPlaylistIdFromUrl from "../utils/getPlaylistIdFromUrl";
import { TitleAndImg } from "../utils/interfaces";
import YoutubePlaylistListing from "./YoutubePlaylistListing";
import YoutubeUrlInput from "./YoutubeUrlInput";
import getArrayOfPlaylistItemIds from "../utils/getArrayOfPlaylistItemIds"

interface YoutubeSearchPageProps {
    playlistSent: boolean;
    setPlaylistSent: React.Dispatch<React.SetStateAction<boolean>>;
    youtubePlaylistUrl: string;
    setYoutubePlaylistUrl: React.Dispatch<React.SetStateAction<string>>;
    setPlaylistSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  }

function YoutubeSearchPage({playlistSent, setPlaylistSent,
    youtubePlaylistUrl,
    setYoutubePlaylistUrl, setPlaylistSubmitted}: YoutubeSearchPageProps): JSX.Element {
        const [playlistItems, setPlaylistItems] = useState<TitleAndImg[]>([]);
  const YOUR_API_KEY = "AIzaSyDV3ZLZ_jJ2D_NMSoaLC2alJ9BtWGMMxEw";
  
  useEffect(() => {
    if (playlistSent) {
        const playlistId = getPlaylistIdFromUrl(youtubePlaylistUrl);
    fetch(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=${playlistId}&key=${YOUR_API_KEY}`
    ).then((response) =>
      response.json())
      .then((jsonBody) => setPlaylistItems(getArrayOfPlaylistItemIds(jsonBody)))
    ;
    setPlaylistSent(false);
    }
  }, [playlistSent]);

    return(
        <>
        <YoutubeUrlInput
          setPlaylistSent={setPlaylistSent}
          youtubePlaylistUrl={youtubePlaylistUrl}
          setYoutubePlaylistUrl={setYoutubePlaylistUrl}/>
        {playlistItems.length > 0 && 
        <>
        <button type='button' onClick={() => setPlaylistSubmitted(true)}>Use this playlist</button>
        <YoutubePlaylistListing playlistItems={playlistItems}/>
        </>}
        </>

    )
}

export default YoutubeSearchPage;