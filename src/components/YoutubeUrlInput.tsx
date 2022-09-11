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
  const handleSearch = () => {
    if (youtubePlaylistUrl.includes("list=")) {
      setPlaylistSent(true);
    } else {
      window.alert(
        "Invalid playlist url. Make sure the url you submit contains 'list='"
      );
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter Youtube Playlist URL"
        value={youtubePlaylistUrl}
        onChange={(e) => setYoutubePlaylistUrl(e.target.value)}
      />
      <button type="button" onClick={handleSearch}>
        Search
      </button>
    </>
  );
}

export default YoutubeUrlInput;
