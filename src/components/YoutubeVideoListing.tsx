import { TitleAndImg } from "../utils/interfaces";

function YoutubeVideoListing({ title, img }: TitleAndImg): JSX.Element {
  return (
    <>
      <h3>{title}</h3>
      <img src={img} alt="Video Thumbnail" />
    </>
  );
}

export default YoutubeVideoListing;
