import { ISpotifyTrack, IYoutubeAndSpotify } from "../utils/interfaces";
import formatDuration from "../utils/formatDuration"

interface SpotifyTrackListingProps {
    spotifySearchResults: IYoutubeAndSpotify[];
    setSpotifySearchResults: React.Dispatch<React.SetStateAction<IYoutubeAndSpotify[]>>;
    thisTrack: IYoutubeAndSpotify;
}

function SpotifyTrackListing({spotifySearchResults,setSpotifySearchResults , thisTrack}: SpotifyTrackListingProps): JSX.Element {

    const removeTrackFromPlaylist = () => {
        setSpotifySearchResults(spotifySearchResults.filter(result => {
            if (result.spotify && thisTrack.spotify) {
                return (result.spotify.id !== thisTrack.spotify.id);
            } else {
                return true;
            }
    }))}

    if (thisTrack.spotify) {
        return(
            <>
            <h3>Youtube: {thisTrack.youtube.title}</h3>
            <img src={thisTrack.youtube.img} alt={thisTrack.youtube.title}/>
            <h3>Title: {thisTrack.spotify.name}</h3>
            <p>Artists: {thisTrack.spotify.artists.map(artist => artist.name)}</p>
            <p>Length: {formatDuration(thisTrack.spotify.duration_ms)}</p>
            <img src={thisTrack.spotify.album.images[0].url} alt={thisTrack.spotify.name}/>
            <button type="button" onClick={removeTrackFromPlaylist}>Remove from playlist</button>

            </>
        )
    } else {
        return (
            <>
                <h3>Sorry, this track couldn't be found:</h3>
                <p>Title: {thisTrack.youtube.title}</p>
                <img src={thisTrack.youtube.img} alt={thisTrack.youtube.title}/>
            </>
        )
    }
    
}

export default SpotifyTrackListing;