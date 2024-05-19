import "./homeComponent.css";
import LoggedInSidebarComponent from "./LoggedInSidebarComponent";
import LoggedInNavbarComponent from "./LoggedInNavbarComponent";
import LoggedInPlaylistComponent from "./LoggedInPlaylistComponent";

function LoggedInHomeComponent() {
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
            <LoggedInPlaylistComponent />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoggedInHomeComponent;
