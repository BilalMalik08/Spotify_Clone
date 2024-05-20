import "./loggedInUploadSongsFormComponent.css";
import CloudinaryUpload from "../shared/CloudinaryUpload";
import React, { useState } from "react";
import { makeAuthenticatedPOSTRequest } from "../../utils/serverHelpers";
import SuccessComponent from "../popups/SuccessComponent";
import ErrorComponent from "../popups/ErrorComponent";

function LoggedInUploadSongsFormComponent() {
  const [songName, setSongName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [trackUrl, setTrackUrl] = useState("");
  const [uploadedSongFilename, setUploadedSongFilename] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleUpload = (url) => {
    console.log("File uploaded to:", url);
    setTrackUrl(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      name: songName,
      thumbnail,
      track: trackUrl,
    };

    console.log("Form submitted with data:", body);

    try {
      const response = await makeAuthenticatedPOSTRequest(`/song/create`, body);

      if (response.status === 200) {
        setSongName("");
        setThumbnail("");
        setTrackUrl("");
        setUploadedSongFilename("");
        setShowSuccess(true);
      } else {
        console.error(
          "Error creating song:",
          response.data.error || "Unknown error"
        );
        setErrorMessage(
          "Error creating song: " + (response.data.error || "Unknown error")
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
      <div className="row LoggedIn-UploadSongs-FormComponent-Row1">
        <h3 className="LoggedIn-UploadSongs-FormComponent-Heading">
          Upload Songs
        </h3>
      </div>
      <div className="row LoggedIn-UploadSongs-FormComponent-Row1">
        <div className="container-fluid LoggedIn-UploadSongs-FormComponent-Container">
          <form
            className="LoggedIn-UploadSongs-FormComponent-Form"
            onSubmit={handleSubmit}
          >
            <div className="mb-3 LoggedIn-UploadSongs-FormComponent-Password-Container">
              <div className="LoggedIn-UploadSongs-FormComponent-Password-Field">
                <label
                  htmlFor="songname"
                  className="form-label LoggedIn-UploadSongs-FormComponent-Form-Label"
                >
                  Song Name
                </label>
                <input
                  type="text"
                  className="form-control LoggedIn-UploadSongs-FormComponent-Form-Control"
                  id="songname"
                  name="songname"
                  placeholder="Enter a song name"
                  value={songName}
                  onChange={(e) => setSongName(e.target.value)}
                />
              </div>
              <div className="LoggedIn-UploadSongs-FormComponent-Password-Field">
                <label
                  htmlFor="thumbnail"
                  className="form-label LoggedIn-UploadSongs-FormComponent-Form-Label"
                >
                  Thumbnail
                </label>
                <input
                  type="text"
                  className="form-control LoggedIn-UploadSongs-FormComponent-Form-Control"
                  id="thumbnail"
                  name="thumbnail"
                  placeholder="Enter a thumbnail"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                />
              </div>
            </div>

            <div>
              {uploadedSongFilename ? (
                <div className="Cloudinary">{uploadedSongFilename}</div>
              ) : (
                <CloudinaryUpload
                  setName={setUploadedSongFilename}
                  setURL={setTrackUrl}
                  onUpload={handleUpload}
                />
              )}
            </div>

            <div className="LoggedIn-UploadSongs-FormComponent-Line"></div>

            <button type="submit" className="btn btn-dark Cloudinary-BTN">
              Submit
            </button>
          </form>
          {showSuccess && (
            <SuccessComponent
              message="Song created successfully"
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

export default LoggedInUploadSongsFormComponent;
