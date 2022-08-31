import { useEffect, useState } from "react";
import getPlaylistIdFromUrl from "../utils/getPlaylistIdFromUrl";
import { ISpotifySearchResponse, ISpotifyTrack, IYoutubeAndSpotify, TitleAndImg } from "../utils/interfaces";
import YoutubePlaylistListing from "./YoutubePlaylistListing";
import YoutubeUrlInput from "./YoutubeUrlInput";
import getArrayOfPlaylistItemIds from "../utils/getArrayOfPlaylistItemIds"
import axios from "axios";

interface YoutubeSearchPageProps {
    playlistSent: boolean;
    setPlaylistSent: React.Dispatch<React.SetStateAction<boolean>>;
    youtubePlaylistUrl: string;
    setYoutubePlaylistUrl: React.Dispatch<React.SetStateAction<string>>;
    setPlaylistSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
    spotifySearchResults: IYoutubeAndSpotify[];
    setSpotifySearchResults: React.Dispatch<React.SetStateAction<IYoutubeAndSpotify[]>>;
  }

function YoutubeSearchPage({playlistSent, setPlaylistSent,
    youtubePlaylistUrl,
    setYoutubePlaylistUrl, setPlaylistSubmitted, spotifySearchResults, setSpotifySearchResults}: YoutubeSearchPageProps): JSX.Element {
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

  const submitPlaylist = async () => {
    const access_token = localStorage.getItem('access_token')
    const headers = {
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Content-Type": "application/json",
      }
    };
    const resultsOfThisSearch: IYoutubeAndSpotify[] = [];
    for (const item of playlistItems) {
      try{ const searchResults: ISpotifySearchResponse = await axios.get(`https://api.spotify.com/v1/search?q=name:${item.title}&type=track&limit=1`, headers);
      console.log(searchResults.data.tracks.items)
      resultsOfThisSearch.push({youtube: item, spotify: searchResults.data.tracks.items[0]})
    } catch(error) {
      console.error(error);
      resultsOfThisSearch.push({youtube: item, spotify: null})
    }
    }
    console.log("resultsofthissearch " + resultsOfThisSearch)
    setSpotifySearchResults([...resultsOfThisSearch])
    setPlaylistSubmitted(true)
  }

    return(
        <>
        <YoutubeUrlInput
          setPlaylistSent={setPlaylistSent}
          youtubePlaylistUrl={youtubePlaylistUrl}
          setYoutubePlaylistUrl={setYoutubePlaylistUrl}/>
        {playlistItems.length > 0 && 
        <>
        <button type='button' onClick={submitPlaylist}>Use this playlist</button>
        <YoutubePlaylistListing playlistItems={playlistItems}/>
        </>}
        </>

    )
}

export default YoutubeSearchPage;