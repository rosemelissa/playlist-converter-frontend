interface SpotifySignInProps {
  setSpotifyAuthorised: React.Dispatch<React.SetStateAction<boolean>>;
}

function SpotifySignIn({
  setSpotifyAuthorised,
}: SpotifySignInProps): JSX.Element {
  return (
    <button type="button" onClick={() => setSpotifyAuthorised(true)}>
      Log in to Spotify
    </button>
  );
}

export default SpotifySignIn;
