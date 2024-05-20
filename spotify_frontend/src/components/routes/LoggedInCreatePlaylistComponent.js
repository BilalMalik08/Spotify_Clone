import "./homeComponent.css";
import LoggedInSidebarComponent from "./LoggedInSidebarComponent";
import LoggedInNavbarComponent from "./LoggedInNavbarComponent";
import LoggedInCreatePlaylistFormComponent from "../playlist/LoggedInCreatePlaylistForm";

function LoggedInCreatePlaylistComponent() {
  return (
    <>
      <div className="row Home-Row-1">
        <div className="cols col-md-2 Home-Left-Col">
          <LoggedInSidebarComponent />
        </div>
        <div className="cols col-md-10 Home-Right-Col">
          <div className="row Home-Row-2">
            <LoggedInNavbarComponent />
          </div>
          <div className="row Home-Row-3">
            <LoggedInCreatePlaylistFormComponent />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoggedInCreatePlaylistComponent;
