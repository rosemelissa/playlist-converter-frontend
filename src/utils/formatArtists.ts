import { ISpotifyTrack } from "./interfaces";

function formatArtists(artistsArray: ISpotifyTrack["artists"]): string {
    let outputString: string = artistsArray[0].name;
    if (artistsArray.length > 1) {
        for (let i = 1; i < artistsArray.length; i++) {
            outputString += `, ${artistsArray[i].name}`
        }
    }
    return outputString;
}

export default formatArtists;