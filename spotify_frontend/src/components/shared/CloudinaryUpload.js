import "./CloudinaryUpload.css";
import React, { useEffect } from "react";
import { cloudinary_upload_preset } from "../../utils/config";

function CloudinaryUpload({ setName, setURL, onUpload = () => {} }) {
  useEffect(() => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dyigpyo2o",
        uploadPreset: cloudinary_upload_preset,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setURL(result.info.secure_url);
          setName(result.info.original_filename);
          onUpload(result.info.secure_url);
        }
      }
    );

    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        widget.open();
      },
      false
    );
  }, [onUpload]);

  return (
    <div className="Cloudinary-BTN-Container">
      <button
        type="button"
        id="upload_widget"
        className="btn btn-dark Cloudinary-BTN"
      >
        Select track
      </button>
    </div>
  );
}

export default CloudinaryUpload;
