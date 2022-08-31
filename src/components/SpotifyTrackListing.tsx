import { ISpotifyTrack } from "../utils/interfaces";
import formatDuration from "../utils/formatDuration"

interface SpotifyTrackListingProps {
    thisTrack: ISpotifyTrack|undefined;
}

function SpotifyTrackListing({thisTrack}: SpotifyTrackListingProps): JSX.Element {
    if (thisTrack) {
        return(
            <>
            <h3>Title: {thisTrack.name}</h3>
            <p>Artists: {thisTrack.artists.map(artist => artist.name)}</p>
            <p>Length: {formatDuration(thisTrack.duration_ms)}</p>
            <img src={thisTrack.album.images[0].url} alt={thisTrack.name}/>

            </>
        )
    } else {
        return (
            <>
                <h3>Sorry, track couldn't be found</h3>
            </>
        )
    }
    
}

export default SpotifyTrackListing;