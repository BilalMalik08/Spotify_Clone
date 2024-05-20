import "./loggedInCreatePlaylistFormComponent.css";
import React, { useState } from "react";
import { makeAuthenticatedPOSTRequest } from "../../utils/serverHelpers";
import SuccessComponent from "../popups/SuccessComponent";
import ErrorComponent from "../popups/ErrorComponent";

function LoggedInCreatePlaylistFormComponent() {
  const [playlistName, setPlaylistName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      name: playlistName,
      thumbnail,
      songs: [], // Initially empty, can be populated later
    };

    try {
      const response = await makeAuthenticatedPOSTRequest(
        `/playlist/create`,
        body
      );

      if (response.status === 200) {
        setPlaylistName("");
        setThumbnail("");
        setShowSuccess(true);
      } else {
        console.error(
          "Error creating playlist:",
          response.data.error || "Unknown error"
        );
        setErrorMessage(
          "Error creating playlist: " + (response.data.error || "Unknown error")
        );
        setShowError(true);
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrorMessage("Network error: " + error.message);
      setShowError(true);
    }
  };

  return (
    <>
      <div className="row Playlist-Create-FormComponent-Row1">
        <h3 className="Playlist-Create-FormComponent-Heading">
          Create Playlist
        </h3>
      </div>
      <div className="row Playlist-Create-FormComponent-Row2">
        <div className="container-fluid Playlist-Create-FormComponent-Container">
          <form
            className="Playlist-Create-FormComponent-Form"
            onSubmit={handleSubmit}
          >
            <div className="mb-3 Playlist-Create-FormComponent-Password-Container">
              <div className="Playlist-Create-FormComponent-Password-Field">
                <label
                  htmlFor="playlistname"
                  className="form-label Playlist-Create-FormComponent-Form-Label"
                >
                  Playlist Name
                </label>
                <input
                  type="text"
                  className="form-control Playlist-Create-FormComponent-Form-Control"
                  id="playlistname"
                  name="playlistname"
                  placeholder="Enter a playlist name"
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                />
              </div>
              <div className="Playlist-Create-FormComponent-Password-Field">
                <label
                  htmlFor="thumbnail"
                  className="form-label Playlist-Create-FormComponent-Form-Label"
                >
                  Thumbnail
                </label>
                <input
                  type="text"
                  className="form-control Playlist-Create-FormComponent-Form-Control"
                  id="thumbnail"
                  name="thumbnail"
                  placeholder="Enter a thumbnail"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                />
              </div>
            </div>

            <div className="Playlist-Create-FormComponent-Line"></div>

            <button type="submit" className="btn btn-dark Cloudinary-BTN">
              Submit
            </button>
          </form>
          {showSuccess && (
            <SuccessComponent
              message="Playlist created successfully"
              setShowSuccess={setShowSuccess}
            />
          )}
          {showError && (
            <ErrorComponent
              message={errorMessage}
              setShowError={setShowError}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default LoggedInCreatePlaylistFormComponent;
