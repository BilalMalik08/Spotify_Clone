import "./homeComponent.css";
import NavbarComponent from "./NavbarComponent";
import SidebarComponent from "./SidebarComponent";
import PlaylistComponent from "./PlaylistComponent";

function HomeComponent() {
  return (
    <>
      <div className="row Home-Row-1">
        <div className="cols col-md-2 Home-Left-Col">
          <SidebarComponent />
        </div>
        <div className="cols col-md-10 Home-Right-Col">
          <div className="row Home-Row-2">
            <NavbarComponent />
          </div>
          <div className="row Home-Row-3">
            <PlaylistComponent />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeComponent;
