// Importing necessary libraries and components
import React, { useEffect, useState } from "react";

// Importing Bootstrap components for UI
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

// Importing hooks for routing and API interaction
import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";

// Importing user context hooks
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

// Importing styles
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

// Component definition
const UsernameForm = () => {
  const [username, setUsername] = useState(""); // State for username
  const [errors, setErrors] = useState({}); // State for error handling

  const history = useHistory(); // Hook to navigate programmatically
  const { id } = useParams(); // Hook to get route parameters

  const currentUser = useCurrentUser(); // Hook to get current user context
  const setCurrentUser = useSetCurrentUser(); // Hook to set current user context

  // Effect to set the username if the user is authorized
  useEffect(() => {
    if (currentUser?.profile_id?.toString() === id) {
      setUsername(currentUser.username);
    } else {
      history.push("/"); // Redirect if not authorized
    }
  }, [currentUser, history, id]);

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      await axiosRes.put("/dj-rest-auth/user/", {
        username, // Sending updated username to API
      });
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username, // Updating username in context
      }));
      history.goBack(); // Navigate back on success
    } catch (err) {
      setErrors(err.response?.data); // Set error state on failure
    }
  };

  // Component rendering
  return (
    <Row>
      <Col className="py-2 mx-auto text-center" md={6}>
        <Container className={appStyles.Content}>
          <Form onSubmit={handleSubmit} className="my-2">
            <Form.Group>
              <Form.Label>Change username</Form.Label>
              <Form.Control
                placeholder="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Form.Group>
            {errors?.username?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.Button} ${btnStyles.Blue}`}
              onClick={() => history.goBack()} // Handler for cancel button
            >
              cancel
            </Button>
            <Button
              className={`${btnStyles.Button} ${btnStyles.Blue}`}
              type="submit" // Handler for submit button
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
export default UsernameForm;
