import "./errorComponent.css";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

function ErrorComponent({ message, setShowError }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setShowError(false);
      }, 300); // Delay to allow fade-out animation to complete
    }, 3000);

    return () => clearTimeout(timer);
  }, [setShowError]);

  return (
    <div
      className={`alert alert-danger error-popup ${fadeOut ? "fade-out" : ""}`}
      role="alert"
    >
      <FontAwesomeIcon className="error-icon" icon={faExclamationCircle} />{" "}
      {message}
    </div>
  );
}

export default ErrorComponent;
