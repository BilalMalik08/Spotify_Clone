import "./loggedInLibraryFormComponent.css";
import React, { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../../utils/serverHelpers";

function LoggedInLibraryFormComponent() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const response = await makeAuthenticatedGETRequest("/playlist/get/me");
      setPlaylists(response.Data);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  return (
    <>
      <div className="row Library-Row-1">
        <h3 className="heading Library-heading">My Playlists</h3>
        <div className="container Library-Container">
          <div className="cards">
            <div className="row row-cols-1 row-cols-md-5 g-1">
              {playlists.map((playlist) => (
                <div className="col" key={playlist._id}>
                  <div className="card Library-Card">
                    <img
                      src={playlist.thumbnail}
                      className="card-img-top Library-Card-Img-Top"
                      alt="Playlist Thumbnail"
                    />
                    <div className="card-body Library-Card-Body">
                      <h5 className="card-title Library-Card-Title">
                        {playlist.name}
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoggedInLibraryFormComponent;
