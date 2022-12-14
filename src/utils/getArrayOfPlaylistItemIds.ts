import axios from "axios";
import {
  IYoutubeSearchData,
  IYoutubeSearchResponse,
  TitleAndImg,
} from "./interfaces";

async function getArrayOfPlaylistItemIds(
  playlistId: string
): Promise<TitleAndImg[] | null> {
  const YOUR_API_KEY = process.env.REACT_APP_YT_API_KEY;

  const titleAndImgArr: TitleAndImg[] = [];

  try {
    const response: IYoutubeSearchResponse = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${playlistId}&key=${YOUR_API_KEY}`
    );
    const youtubeSearchData: IYoutubeSearchData = response.data;
    for (const item of youtubeSearchData.items) {
      const currentTitleAndImg: TitleAndImg = {
        title: item.snippet.title,
        img: item.snippet.thumbnails.default.url,
      };
      titleAndImgArr.push(currentTitleAndImg);
    }
    let nextPageToken: string | undefined = youtubeSearchData.nextPageToken;
    while (nextPageToken) {
      const pageResponse: IYoutubeSearchResponse = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${playlistId}&key=${YOUR_API_KEY}&pageToken=${nextPageToken}`
      );
      const pageYoutubeSearchData: IYoutubeSearchData = pageResponse.data;
      for (const item of pageYoutubeSearchData.items) {
        const currentTitleAndImg: TitleAndImg = {
          title: item.snippet.title,
          img: item.snippet.thumbnails.default.url,
        };
        titleAndImgArr.push(currentTitleAndImg);
      }
      nextPageToken = pageYoutubeSearchData.nextPageToken;
      //go to next page
      //add all those tracks
    }
  } catch (error) {
    console.error(error);
    return null;
  }

  return titleAndImgArr;
}

export default getArrayOfPlaylistItemIds;
