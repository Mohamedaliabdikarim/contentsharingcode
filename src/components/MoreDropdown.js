// Importing necessary libraries and styles
import React from "react";
import Dropdown from "react-bootstrap/Dropdown"; // Importing Bootstrap Dropdown component
import styles from "../styles/MoreDropdown.module.css"; // Importing custom styles
import { useHistory } from "react-router"; // Hook for navigation

// Defining a custom dropdown toggle component
// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fas fa-ellipsis-v" // Font Awesome icon for the three dots
    ref={ref} // Referencing the DOM node
    onClick={(e) => {
      e.preventDefault(); // Preventing default event behavior
      onClick(e); // Handling click event
    }}
  />
));

// Functional component for more options dropdown
export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className="ml-auto" drop="left"> {/* Dropdown menu aligned to the left */}
      <Dropdown.Toggle as={ThreeDots} /> {/* Using custom ThreeDots component as toggle */}

      <Dropdown.Menu
        className="text-center"
        popperConfig={{ strategy: "fixed" }} // Fixed positioning strategy
      >
        <Dropdown.Item
          className={styles.DropdownItem} // Custom styling for dropdown item
          onClick={handleEdit} // Edit handler
          aria-label="edit" // Accessibility label
        >
          <i className="fas fa-edit" /> {/* Font Awesome icon for edit */}
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem} // Custom styling for dropdown item
          onClick={handleDelete} // Delete handler
          aria-label="delete" // Accessibility label
        >
          <i className="fas fa-trash-alt" /> {/* Font Awesome icon for delete */}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

// Functional component for profile edit dropdown
export const ProfileEditDropdown = ({ id }) => {
  const history = useHistory(); // Hook for navigation
  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left"> {/* Dropdown menu aligned to the left */}
      <Dropdown.Toggle as={ThreeDots} /> {/* Using custom ThreeDots component as toggle */}
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit`)} // Navigation to edit profile page
          aria-label="edit-profile" // Accessibility label
        >
          <i className="fas fa-edit" /> edit profile
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/username`)} // Navigation to edit username page
          aria-label="edit-username" // Accessibility label
        >
          <i className="far fa-id-card" />
          change username
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/password`)} // Navigation to edit password page
          aria-label="edit-password" // Accessibility label
        >
          <i className="fas fa-key" />
          change password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
