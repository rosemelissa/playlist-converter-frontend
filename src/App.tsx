import {useState} from 'react';
import ConverterResults from './components/ConverterResults';
import SpotifySignIn from './components/SpotifySignIn';
import YoutubeUrlInput from './components/YoutubeUrlInput';

function App(): JSX.Element {
  const [spotifyAuthorised, setSpotifyAuthorised] = useState<boolean>(false);
  const [playlistSent, setPlaylistSent] = useState<boolean>(false);

  return (
    <>
    {!spotifyAuthorised && <SpotifySignIn setSpotifyAuthorised = {setSpotifyAuthorised}/>}
    {spotifyAuthorised && (!playlistSent) && <YoutubeUrlInput setPlaylistSent = {setPlaylistSent} />}
    {spotifyAuthorised && playlistSent && <ConverterResults setPlaylistSent = {setPlaylistSent}/>}
    </>
  );
}

export default App;
