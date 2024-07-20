// Importing necessary libraries and components
import React, { useState } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form"; // Importing Bootstrap Form component
import Alert from "react-bootstrap/Alert"; // Importing Bootstrap Alert component
import Button from "react-bootstrap/Button"; // Importing Bootstrap Button component
import Col from "react-bootstrap/Col"; // Importing Bootstrap Col component
import Row from "react-bootstrap/Row"; // Importing Bootstrap Row component
import Image from "react-bootstrap/Image"; // Importing Bootstrap Image component
import Container from "react-bootstrap/Container"; // Importing Bootstrap Container component

import { Link, useHistory } from "react-router-dom"; // Importing routing components

import styles from "../../styles/SignInUpForm.module.css"; // Importing custom styles
import btnStyles from "../../styles/Button.module.css"; // Importing custom button styles
import appStyles from "../../App.module.css"; // Importing custom app styles
import { useSetCurrentUser } from "../../contexts/CurrentUserContext"; // Hook to set current user context
import { useRedirect } from "../../hooks/useRedirect"; // Hook for redirecting
import { setTokenTimestamp } from "../../utils/utils"; // Utility function to set token timestamp

// Function component definition
function SignInForm() {
  const setCurrentUser = useSetCurrentUser(); // Hook to set current user
  useRedirect("loggedIn"); // Redirect if user is already logged in

  // State to manage sign in data
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData; // Destructuring sign in data

  const [errors, setErrors] = useState({}); // State to manage errors

  const history = useHistory(); // Hook to navigate programmatically

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Preventing default form submission

    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData); // API call to log in
      setCurrentUser(data.user); // Setting current user in context
      setTokenTimestamp(data); // Setting token timestamp
      history.goBack(); // Navigating back on success
    } catch (err) {
      setErrors(err.response?.data); // Setting errors in state
    }
  };

  // Handler for form input changes
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value, // Updating the respective state field
    });
  };

  // Component rendering
  return (
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign in</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                className={styles.Input}
                value={username}
                onChange={handleChange} // Handler for username input change
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message} {/* Displaying username errors */}
              </Alert>
            ))}

            <Form.Group controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                className={styles.Input}
                value={password}
                onChange={handleChange} // Handler for password input change
              />
            </Form.Group>
            {errors.password?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message} {/* Displaying password errors */}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="submit"
            >
              Sign in
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message} {/* Displaying non-field errors */}
              </Alert>
            ))}
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">
            Don't have an account? <span>Sign up now!</span> {/* Link to sign up page */}
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={"https://media.istockphoto.com/id/2043823329/sv/foto/internet-network-cybersecurity-concept-data-privacy-protection-from-malicious-attacks-digital.webp?s=2048x2048&w=is&k=20&c=CLXCM43F15xlb6qgwbSlF4vNsUHMZW2hG8xBMCzrRRg="}
        /> {/* Displaying image on larger screens */}
      </Col>
    </Row>
  );
}

// Exporting the component as default
export default SignInForm;
