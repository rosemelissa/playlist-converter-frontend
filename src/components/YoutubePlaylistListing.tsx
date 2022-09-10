import { TitleAndImg } from "../utils/interfaces";
import YoutubeVideoListing from "./YoutubeVideoListing";

interface YoutubePlaylistListingProps {
  playlistItems: TitleAndImg[];
}

function YoutubePlaylistListing({
  playlistItems,
}: YoutubePlaylistListingProps): JSX.Element {
  return (
    <>
      {playlistItems.map((item, i) => (
        <YoutubeVideoListing key={i} title={item.title} img={item.img} />
      ))}
    </>
  );
}
export default YoutubePlaylistListing;
