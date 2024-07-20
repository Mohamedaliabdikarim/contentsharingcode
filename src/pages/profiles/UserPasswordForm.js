// Importing necessary libraries and components
import React, { useEffect, useState } from "react";

// Importing Bootstrap components for UI
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

// Importing hooks for routing and API interaction
import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// Importing styles
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

// Component definition
const UserPasswordForm = () => {
  const history = useHistory(); // Hook to navigate programmatically
  const { id } = useParams(); // Hook to get route parameters
  const currentUser = useCurrentUser(); // Hook to get current user context

  // State for form data
  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;

  // State for error handling
  const [errors, setErrors] = useState({});

  // Handler for form input changes
  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  // Effect to ensure user is authorized to access the form
  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      // Redirect user if they are not the owner of this profile
      history.push("/");
    }
  }, [currentUser, history, id]);

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData); // API call to change password
      history.goBack(); // Navigate back on success
    } catch (err) {
      // Set error state on failure
      setErrors(err.response?.data);
    }
  };

  // Component rendering
  return (
    <Row>
      <Col className="py-2 mx-auto text-center" md={6}>
        <Container className={appStyles.Content}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>New password</Form.Label>
              <Form.Control
                placeholder="new password"
                type="password"
                value={new_password1}
                onChange={handleChange}
                name="new_password1"
              />
            </Form.Group>
            {errors?.new_password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Form.Group>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                placeholder="confirm new password"
                type="password"
                value={new_password2}
                onChange={handleChange}
                name="new_password2"
              />
            </Form.Group>
            {errors?.new_password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.Button} ${btnStyles.Blue}`}
              onClick={() => history.goBack()}
            >
              cancel
            </Button>
            <Button
              type="submit"
              className={`${btnStyles.Button} ${btnStyles.Blue}`}
            >
              save
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

// Exporting the component as default
export default UserPasswordForm;
