import React, { useState } from "react";
import { Link } from "react-router-dom";

// Importing Bootstrap components for forms and input groups
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

// Importing custom styles and components
import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function CommentCreateForm(props) {
  // Destructuring props to extract post details and setter functions
  const { post, setPost, setComments, profileImage, profile_id } = props;

  // State to manage the content of the comment
  const [content, setContent] = useState("");

  // Handle input field changes
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  // Handle form submission to create a new comment
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Post the comment to the server
      const { data } = await axiosRes.post("/comments/", {
        content,
        post,
      });
      // Update comments state to include the new comment
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      // Update post state to increment the comments count
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      // Clear the comment input field
      setContent("");
    } catch (err) {
      // Handle error (optional)
      // console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          {/* Link to the profile of the user creating the comment */}
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          {/* Textarea for comment input */}
          <Form.Control
            className={styles.Form}
            placeholder="my comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      {/* Submit button for posting the comment */}
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        post
      </button>
    </Form>
  );
}

export default CommentCreateForm;
