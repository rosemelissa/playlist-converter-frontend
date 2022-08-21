interface YoutubeUrlInputProps {
  setPlaylistSent: React.Dispatch<React.SetStateAction<boolean>>;
  youtubePlaylistUrl: string;
  setYoutubePlaylistUrl: React.Dispatch<React.SetStateAction<string>>;
}

function YoutubeUrlInput({
  setPlaylistSent,
  youtubePlaylistUrl,
  setYoutubePlaylistUrl,
}: YoutubeUrlInputProps): JSX.Element {
  return (
    <>
      <input
        type="text"
        placeholder="Enter Youtube Playlist URL"
        value={youtubePlaylistUrl}
        onChange={(e) => setYoutubePlaylistUrl(e.target.value)}
      />
      <button type="button" onClick={() => setPlaylistSent(true)}>
        Submit
      </button>
    </>
  );
}

export default YoutubeUrlInput;
