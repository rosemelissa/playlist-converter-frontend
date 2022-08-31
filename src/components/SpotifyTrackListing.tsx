import { ISpotifyTrack, IYoutubeAndSpotify } from "../utils/interfaces";
import formatDuration from "../utils/formatDuration"

interface SpotifyTrackListingProps {
    thisTrack: IYoutubeAndSpotify
}

function SpotifyTrackListing({thisTrack}: SpotifyTrackListingProps): JSX.Element {
    if (thisTrack.spotify) {
        return(
            <>
            <h3>Title: {thisTrack.spotify.name}</h3>
            <p>Artists: {thisTrack.spotify.artists.map(artist => artist.name)}</p>
            <p>Length: {formatDuration(thisTrack.spotify.duration_ms)}</p>
            <img src={thisTrack.spotify.album.images[0].url} alt={thisTrack.spotify.name}/>

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