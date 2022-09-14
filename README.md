# YouTube-to-Spotify Playlist Converter

Easily convert your YouTube playlists into Spotify playlists! Try the app here (note: the app is currently in developer mode and awaiting approval from Spotify. Until it gains approval, your Spotify account must be whitelisted manually by me in order to use the app.)

## Running locally

Clone the repo and run `yarn` to install dependencies.

Replace the values in /src/constants.ts with whatever URLs you will use for your deployed/local React app.

### Set up YouTube API

Follow the instructions at <a href="https://developers.google.com/youtube/v3/getting-started">https://developers.google.com/youtube/v3/getting-started</a> to create a YouTube project. Note that step 4 can be skipped as this app doesn't use OAth2.0 protocol with the YouTube API, and step 5 can be ignored as this app doesn't use a client library for API implementation.

Go to your newly created project in the Google Developers Console and find your API key in the credentials section.

Create a `.env` file following the format of `.env.example`. Set the value of `REACT_APP_YT_API_KEY` as the API key of your YouTube project.

### Set up Spotify API

Follow the instructions at <a href="https://developer.spotify.com/documentation/general/guides/authorization/app-settings/">https://developer.spotify.com/documentation/general/guides/authorization/app-settings/</a> to create a Spotify app. In the 'Redirect URIs' section, add the address where you will be running this React app (e.g. http://localhost:3000).

Set the values of `REACT_APP_SPOTIFY_CLIENT_ID` and `REACT_APP_SPOTIFY_CLIENT_SECRET` in `.env` to the CLIENT_ID and CLIENT_SECRET of your newly created app (they can be found in your <a href="https://developer.spotify.com/dashboard/applications">developer dashboard</a>).

### Running the app

Run the app with yarn start

## Credits and references

- <a href="https://github.com/tobika/spotify-auth-PKCE-example/blob/main/public/main.js">Spotify authentication using PKCE</a>
- <a href="https://youtu.be/1vR3m0HupGI">Using Spotify's API</a>
- <a href="https://github.com/WeAreAcademy/academy-react-starter">Academy's simplified CRA starter</a>