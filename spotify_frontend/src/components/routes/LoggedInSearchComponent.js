import "./homeComponent.css";
import LoggedInSidebarComponent from "./LoggedInSidebarComponent";
import LoggedInNavbarComponent from "./LoggedInNavbarComponent";
import LoggedInSearchFormComponent from "../playlist/LoggedInSearchFormComponent";

function LoggedInSearchComponent() {
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
            <LoggedInSearchFormComponent />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoggedInSearchComponent;
