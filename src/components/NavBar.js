// Importing necessary libraries and styles
import React from "react";
import Navbar from "react-bootstrap/Navbar"; // Importing Bootstrap Navbar component
import Container from "react-bootstrap/Container"; // Importing Bootstrap Container component
import Nav from "react-bootstrap/Nav"; // Importing Bootstrap Nav component
import logo from "../assets/logo(3)(1).svg"; // Importing logo image
import styles from "../styles/NavBar.module.css"; // Importing custom styles
import { NavLink } from "react-router-dom"; // Importing NavLink for routing
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext"; // Importing hooks to manage current user context
import Avatar from "./Avatar"; // Importing Avatar component
import axios from "axios"; // Importing axios for API requests
import useClickOutsideToggle from "../hooks/useClickOutsideToggle"; // Importing custom hook for click outside toggle
import { removeTokenTimestamp } from "../utils/utils"; // Utility function to remove token timestamp

// Functional component definition
const NavBar = () => {
  const currentUser = useCurrentUser(); // Getting current user from context
  const setCurrentUser = useSetCurrentUser(); // Function to set current user in context

  const { expanded, setExpanded, ref } = useClickOutsideToggle(); // Using custom hook for click outside toggle

  // Function to handle sign out
  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/"); // API call to log out
      setCurrentUser(null); // Setting current user to null in context
      removeTokenTimestamp(); // Removing token timestamp
    } catch (err) {
      // console.log(err); // Logging errors if any
    }
  };

  // JSX for add post icon (visible when user is logged in)
  const addPostIcon = (
    <NavLink
      className={styles.NavLink} // Applying custom styles
      activeClassName={styles.Active} // Applying active styles
      to="/posts/create" // Navigation to create post page
    >
      <i className="far fa-plus-square"></i>Add post
    </NavLink>
  );

  // JSX for navigation links visible when user is logged in
  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink} // Applying custom styles
        activeClassName={styles.Active} // Applying active styles
        to="/feed" // Navigation to feed page
      >
        <i className="fas fa-stream"></i>Feed
      </NavLink>
      <NavLink
        className={styles.NavLink} // Applying custom styles
        activeClassName={styles.Active} // Applying active styles
        to="/liked" // Navigation to liked posts page
      >
        <i className="fas fa-heart"></i>Liked
      </NavLink>
      <NavLink
        className={styles.NavLink} // Applying custom styles
        to="/" // Navigation to home page
        onClick={handleSignOut} // Handling sign out
      >
        <i className="fas fa-sign-out-alt"></i>Sign out
      </NavLink>
      <NavLink
        className={styles.NavLink} // Applying custom styles
        to={`/profiles/${currentUser?.profile_id}`} // Navigation to user's profile page
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} /> {/* Displaying user's avatar */}
      </NavLink>
    </>
  );

  // JSX for navigation links visible when user is logged out
  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink} // Applying custom styles
        activeClassName={styles.Active} // Applying active styles
        to="/signin" // Navigation to sign in page
      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink
        to="/signup" // Navigation to sign up page
        className={styles.NavLink} // Applying custom styles
        activeClassName={styles.Active} // Applying active styles
      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

  // Component rendering
  return (
    <Navbar
      expanded={expanded} // Controlling the expanded state of the navbar
      className={styles.NavBar} // Applying custom styles
      expand="md" // Expanding navbar on medium devices and above
      fixed="top" // Fixing navbar to the top
    >
      <Container>
        <NavLink to="/"> {/* Navigation to home page */}
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" /> {/* Displaying logo */}
          </Navbar.Brand>
        </NavLink>
        {currentUser && addPostIcon} {/* Displaying add post icon if user is logged in */}
        <Navbar.Toggle
          ref={ref} // Referencing the DOM node for click outside toggle
          onClick={() => setExpanded(!expanded)} // Toggling expanded state
          aria-controls="basic-navbar-nav" // Accessibility attribute
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left"> {/* Aligning navigation links to the right */}
            <NavLink
              exact
              className={styles.NavLink} // Applying custom styles
              activeClassName={styles.Active} // Applying active styles
              to="/" // Navigation to home page
            >
              <i className="fas fa-home"></i>Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons} {/* Displaying navigation links based on user authentication */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// Exporting the component as default
export default NavBar;
