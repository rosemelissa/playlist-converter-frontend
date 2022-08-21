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
    </>
  );
}

export default ConverterResults;
