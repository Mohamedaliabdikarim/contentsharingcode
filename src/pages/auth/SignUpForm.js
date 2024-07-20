// Importing necessary libraries and components
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom"; // Importing routing components

import styles from "../../styles/SignInUpForm.module.css"; // Importing custom styles
import btnStyles from "../../styles/Button.module.css"; // Importing custom button styles
import appStyles from "../../App.module.css"; // Importing custom app styles

import Form from "react-bootstrap/Form"; // Importing Bootstrap Form component
import Button from "react-bootstrap/Button"; // Importing Bootstrap Button component
import Image from "react-bootstrap/Image"; // Importing Bootstrap Image component
import Col from "react-bootstrap/Col"; // Importing Bootstrap Col component
import Row from "react-bootstrap/Row"; // Importing Bootstrap Row component
import Container from "react-bootstrap/Container"; // Importing Bootstrap Container component
import Alert from "react-bootstrap/Alert"; // Importing Bootstrap Alert component

import axios from "axios"; // Importing axios for API requests
import { useRedirect } from "../../hooks/useRedirect"; // Hook for redirecting

// Function component definition
const SignUpForm = () => {
  useRedirect("loggedIn"); // Redirect if user is already logged in

  // State to manage sign up data
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData; // Destructuring sign up data

  const [errors, setErrors] = useState({}); // State to manage errors

  const history = useHistory(); // Hook to navigate programmatically

  // Handler for form input changes
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value, // Updating the respective state field
    });
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Preventing default form submission
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData); // API call to sign up
      history.push("/signin"); // Navigating to sign in page on success
    } catch (err) {
      setErrors(err.response?.data); // Setting errors in state
    }
  };

  // Component rendering
  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign up</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange} // Handler for username input change
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message} {/* Displaying username errors */}
              </Alert>
            ))}

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange} // Handler for password1 input change
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message} {/* Displaying password1 errors */}
              </Alert>
            ))}

            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange} // Handler for password2 input change
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message} {/* Displaying password2 errors */}
              </Alert>
            ))}

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="submit"
            >
              Sign up
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message} {/* Displaying non-field errors */}
              </Alert>
            ))}
          </Form>
        </Container>

        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span> {/* Link to sign in page */}
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={"https://img.freepik.com/free-photo/sign-up-form-button-graphic-concept_53876-101286.jpg?t=st=1719850060~exp=1719853660~hmac=d02d70c98fe6688b600ba421ca30741d576da4eddd9cbdfface004c5708a3b8b&w=2000"}
        /> {/* Displaying image on larger screens */}
      </Col>
    </Row>
  );
};

// Exporting the component as default
export default SignUpForm;
