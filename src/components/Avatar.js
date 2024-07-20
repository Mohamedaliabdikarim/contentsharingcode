// Importing necessary libraries and styles
import React from "react";
import styles from "../styles/Avatar.module.css"; // Importing custom styles

// Functional component definition
const Avatar = ({ src, height = 45, text }) => { // Destructuring props with default height value
  return (
    <span>
      <img
        className={styles.Avatar} // Applying custom styles to the image
        src={src} // Source of the avatar image
        height={height} // Height of the avatar image
        width={height} // Width of the avatar image (same as height for square image)
        alt="avatar" // Alt text for the image
      />
      {text} {/* Displaying optional text if provided */}
    </span>
  );
};

// Exporting the component as default
export default Avatar;
