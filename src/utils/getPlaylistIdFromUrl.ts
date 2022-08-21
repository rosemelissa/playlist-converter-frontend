function getPlaylistIdFromUrl(playlistUrl: string): string | null {
  if (!playlistUrl.includes("list=")) {
    return null;
  }
  const indexNum: number = playlistUrl.indexOf("list=");
  let playlistId = playlistUrl.substring(indexNum + 5);
  if (playlistId.includes("&")) {
    playlistId = playlistId.substring(0, playlistId.indexOf("&"));
  }
  return playlistId;
}

export default getPlaylistIdFromUrl;
