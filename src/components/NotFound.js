// Importing necessary libraries and assets
import React from "react";
import NoResults from "../assets/no-results.png"; // Importing no results image
import styles from "../styles/NotFound.module.css"; // Importing custom styles
import Asset from "./Asset"; // Importing Asset component

// Functional component definition
const NotFound = () => {
  return (
    <div className={styles.NotFound}> {/* Applying custom styles */}
      <Asset
        src={NoResults} // Source of the no results image
        message={`Sorry, the page you're looking for doesn't exist`} // Displaying message
      />
    </div>
  );
};

// Exporting the component as default
export default NotFound;
