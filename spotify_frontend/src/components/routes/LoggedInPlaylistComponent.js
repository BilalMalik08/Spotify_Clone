import "./playlistComponent.css";
import LoggedInFocusComponent from "../playlist/LoggedInFocusComponent";
import LoggedInSpotifyplaylistComponent from "../playlist/LoggedInSpotifyplaylistComponent";
import LoggedInSoundOfPakistanComponent from "../playlist/LoggedInSoundOfPakistanComponent";

function LoggedInPlaylistComponent() {
  return (
    <>
      <div className="row Playlist-Row-1">
        <LoggedInFocusComponent />
      </div>
      <div className="row Playlist-Row-2">
        <LoggedInSpotifyplaylistComponent />
      </div>
      <div className="row Playlist-Row-3">
        <LoggedInSoundOfPakistanComponent />
      </div>
    </>
  );
}

export default LoggedInPlaylistComponent;
