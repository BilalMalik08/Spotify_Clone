import "./homeComponent.css";
import SidebarComponent from "./SidebarComponent";

function HomeComponent() {
  return (
    <>
      <div className="row Home-Left-Row-1">
        <div className="cols col-md-2 Home-Left-Col">
          <SidebarComponent />
        </div>
      </div>
    </>
  );
}

export default HomeComponent;
