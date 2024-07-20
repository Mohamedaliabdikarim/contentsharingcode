// Importing necessary libraries and components
import React, { useRef, useState, useEffect } from "react";
import Form from "react-bootstrap/Form"; // Importing Bootstrap Form component
import Button from "react-bootstrap/Button"; // Importing Bootstrap Button component
import Row from "react-bootstrap/Row"; // Importing Bootstrap Row component
import Col from "react-bootstrap/Col"; // Importing Bootstrap Col component
import Container from "react-bootstrap/Container"; // Importing Bootstrap Container component
import Alert from "react-bootstrap/Alert"; // Importing Bootstrap Alert component
import Image from "react-bootstrap/Image"; // Importing Bootstrap Image component

import Asset from "../../components/Asset"; // Importing custom Asset component
import Upload from "../../assets/upload.png"; // Importing upload image

import styles from "../../styles/PostCreateEditForm.module.css"; // Importing custom styles
import appStyles from "../../App.module.css"; // Importing custom styles
import btnStyles from "../../styles/Button.module.css"; // Importing custom button styles

import { useHistory } from "react-router"; // Importing hook to navigate programmatically
import { axiosReq } from "../../api/axiosDefaults"; // Importing Axios instance for API requests

// Function component definition
function PostCreateForm() {
  const [errors, setErrors] = useState({}); // State to manage errors
  const [categories, setCategories] = useState([]); // State to manage categories

  // State to manage post data
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    category_id: "", // Ensure this matches the backend field name
  });
  const { title, content, image, category_id } = postData; // Destructuring post data

  const imageInput = useRef(null); // useRef hook for image input reference
  const history = useHistory(); // useHistory hook to navigate programmatically

  // useEffect to fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosReq.get("/categories/"); // API call to fetch categories
        setCategories(data.results || []); // Setting fetched categories to state
      } catch (err) {
        console.log(err); // Logging errors if any
        setCategories([]); // Setting categories to empty array in case of an error
      }
    };

    fetchCategories(); // Calling the fetchCategories function
  }, []);

  // Handler for form input changes
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value, // Updating the respective state field
    });
  };

  // Handler for image input changes
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image); // Revoking the old image URL
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]), // Setting new image URL
      });
    }
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Preventing default form submission
    const formData = new FormData(); // Creating a new FormData object

    formData.append("title", title); // Appending title to FormData
    formData.append("content", content); // Appending content to FormData
    if (imageInput.current.files[0]) {
      formData.append("image", imageInput.current.files[0]); // Appending image to FormData if exists
    }
    if (category_id) {
      formData.append("category_id", category_id); // Appending category ID to FormData if exists
    }

    try {
      const { data } = await axiosReq.post("/posts/", formData); // API call to create a post
      history.push(`/posts/${data.id}`); // Navigating to the created post
    } catch (err) {
      
      if (err.response?.status !== 401) {
        setErrors(err.response?.data); // Setting errors to state if not unauthorized
      }
    }
  };

  // JSX for form text fields
  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange} // Handler for title input change
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message} {/* Displaying title errors */}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange} // Handler for content input change
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message} {/* Displaying content errors */}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="category_id" // Ensure this matches the backend field name
          value={category_id}
          onChange={handleChange} // Handler for category selection change
        >
          <option value="">Select a category</option>
          {Array.isArray(categories) &&
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name} {/* Displaying categories */}
              </option>
            ))}
        </Form.Control>
      </Form.Group>
      {errors?.category_id?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message} {/* Displaying category errors */}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()} // Handler for cancel button
      >
        Cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        Create
      </Button>
    </div>
  );

  // Component rendering
  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded /> {/* Displaying the selected image */}
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image" // Upload prompt message
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage} // Handler for image input change
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message} {/* Displaying image errors */}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div> {/* Displaying text fields for small screens */}
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container> {/* Displaying text fields for large screens */}
        </Col>
      </Row>
    </Form>
  );
}

// Exporting the component as default
export default PostCreateForm;
