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
    <form onSubmit={() => setPlaylistSent(true)}>
      <input
        type="text"
        placeholder="Enter Youtube Playlist URL"
        value={youtubePlaylistUrl}
        onChange={(e) => setYoutubePlaylistUrl(e.target.value)}
      />
      <button type="submit" value="Submit">
        Submit
      </button>
    </form>
  );
}

export default YoutubeUrlInput;
