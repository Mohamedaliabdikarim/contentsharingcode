// Importing necessary libraries and styles
import React from "react";
import Spinner from "react-bootstrap/Spinner"; // Importing Bootstrap Spinner component
import styles from "../styles/Asset.module.css"; // Importing custom styles

// Functional component definition
const Asset = ({ spinner, src, message }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && <Spinner animation="border" />} {/* Displaying spinner if 'spinner' prop is true */}
      {src && <img src={src} alt={message} />} {/* Displaying image if 'src' prop is provided */}
      {message && <p className="mt-4">{message}</p>} {/* Displaying message if 'message' prop is provided */}
    </div>
  );
};

// Exporting the component as default
export default Asset;
