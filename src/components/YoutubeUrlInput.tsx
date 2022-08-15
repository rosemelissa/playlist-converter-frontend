import {useState} from 'react';

interface YoutubeUrlInputProps {
    setPlaylistSent: React.Dispatch<React.SetStateAction<boolean>>;
}

function YoutubeUrlInput({setPlaylistSent}: YoutubeUrlInputProps):JSX.Element {
    const [youtubePlaylistUrl, setYoutubePlaylistUrl] = useState<string>('');
    return (
        <form onSubmit={() => setPlaylistSent(true)}>
            <input type='text' placeholder='Enter Youtube Playlist URL' value={youtubePlaylistUrl} onChange={(e) => setYoutubePlaylistUrl(e.target.value)}/>
            <button type='submit' value='Submit'></button>
        </form>
    )
}

export default YoutubeUrlInput