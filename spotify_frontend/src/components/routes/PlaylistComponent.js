import "./playlistComponent.css";
import FocusComponent from "../playlist/FocusComponent";
import SpotifyPlaylistComponent from "../playlist/SpotifyPlaylistComponent";
import SoundOfPakistanComponent from "../playlist/SoundOfPakistanComponent";

function PlaylistComponent() {
  return (
    <>
      <div className="row Playlist-Row-1">
        <FocusComponent />
      </div>
      <div className="row Playlist-Row-2">
        <SpotifyPlaylistComponent />
      </div>
      <div className="row Playlist-Row-3">
        <SoundOfPakistanComponent />
      </div>
    </>
  );
}

export default PlaylistComponent;
