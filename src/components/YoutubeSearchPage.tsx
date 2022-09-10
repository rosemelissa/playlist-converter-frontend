import { useEffect, useState } from "react";
import getPlaylistIdFromUrl from "../utils/getPlaylistIdFromUrl";
import {
  ISpotifySearchResponse,
  IYoutubeAndSpotify,
  TitleAndImg,
} from "../utils/interfaces";
import YoutubePlaylistListing from "./YoutubePlaylistListing";
import YoutubeUrlInput from "./YoutubeUrlInput";
import getArrayOfPlaylistItemIds from "../utils/getArrayOfPlaylistItemIds";
import axios from "axios";

interface YoutubeSearchPageProps {
  playlistSent: boolean;
  setPlaylistSent: React.Dispatch<React.SetStateAction<boolean>>;
  youtubePlaylistUrl: string;
  setYoutubePlaylistUrl: React.Dispatch<React.SetStateAction<string>>;
  setPlaylistSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  setSpotifySearchResults: React.Dispatch<
    React.SetStateAction<IYoutubeAndSpotify[]>
  >;
}

function YoutubeSearchPage({
  playlistSent,
  setPlaylistSent,
  youtubePlaylistUrl,
  setYoutubePlaylistUrl,
  setPlaylistSubmitted,
  setSpotifySearchResults,
}: YoutubeSearchPageProps): JSX.Element {
  const [playlistItems, setPlaylistItems] = useState<TitleAndImg[]>([]);

  useEffect(() => {
    const getPlaylistFromYoutube = async () => {
      try {
        const playlistId = getPlaylistIdFromUrl(youtubePlaylistUrl);
        if (playlistId) {
          setPlaylistItems(await getArrayOfPlaylistItemIds(playlistId));
        }
      } catch (error) {
        console.error(error);
        window.alert(
          "Could not find a youtube playlist with that url. Check that the playlist you are trying to use is public"
        );
      }

      setPlaylistSent(false);
    };

    if (playlistSent) {
      getPlaylistFromYoutube();
    }
  // eslint-disable-next-line
  }, [playlistSent]);

  const submitPlaylist = async () => {
    const access_token = localStorage.getItem("access_token");
    const headers = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    };
    const resultsOfThisSearch: IYoutubeAndSpotify[] = [];
    for (const item of playlistItems) {
      try {
        const searchResults: ISpotifySearchResponse = await axios.get(
          `https://api.spotify.com/v1/search?q=name:${item.title}&type=track&limit=1`,
          headers
        );
        console.log(searchResults.data.tracks.items);
        resultsOfThisSearch.push({
          youtube: item,
          spotify: searchResults.data.tracks.items[0],
        });
      } catch (error) {
        console.error(error);
        resultsOfThisSearch.push({ youtube: item, spotify: null });
      }
    }
    console.log("resultsofthissearch " + resultsOfThisSearch);
    setSpotifySearchResults([...resultsOfThisSearch]);
    setPlaylistSubmitted(true);
  };

  return (
    <>
      <YoutubeUrlInput
        setPlaylistSent={setPlaylistSent}
        youtubePlaylistUrl={youtubePlaylistUrl}
        setYoutubePlaylistUrl={setYoutubePlaylistUrl}
      />
      {playlistItems.length > 0 && (
        <>
          <button type="button" onClick={submitPlaylist}>
            Use this playlist
          </button>
          <YoutubePlaylistListing playlistItems={playlistItems} />
        </>
      )}
    </>
  );
}

export default YoutubeSearchPage;
