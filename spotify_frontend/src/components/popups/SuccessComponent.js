import "./successComponent.css";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function SuccessComponent({ message, setShowSuccess }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 300); // Delay to allow fade-out animation to complete
    }, 3000);

    return () => clearTimeout(timer);
  }, [setShowSuccess]);

  return (
    <div
      className={`alert alert-success success-popup ${
        fadeOut ? "fade-out" : ""
      }`}
      role="alert"
    >
      <FontAwesomeIcon className="success-icon" icon={faCheckCircle} />{" "}
      {message}
    </div>
  );
}

export default SuccessComponent;
