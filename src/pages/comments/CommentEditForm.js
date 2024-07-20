import React, { useState } from "react";

// Importing Bootstrap form component
import Form from "react-bootstrap/Form";
// Importing Axios for API requests
import { axiosRes } from "../../api/axiosDefaults";

// Importing custom styles
import styles from "../../styles/CommentCreateEditForm.module.css";

function CommentEditForm(props) {
  // Destructuring props to extract comment details and setter functions
  const { id, content, setShowEditForm, setComments } = props;

  // State to manage the content of the comment form
  const [formContent, setFormContent] = useState(content);

  // Handle input field changes
  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  // Handle form submission to update the comment
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Update the comment on the server
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      // Update the comments state to reflect the edited comment
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(),
                updated_at: "now",
              }
            : comment;
        }),
      }));
      // Hide the edit form after successful submission
      setShowEditForm(false);
    } catch (err) {
      // Handle error (optional)
      // console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        {/* Textarea for editing the comment content */}
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="text-right">
        {/* Button to cancel editing and hide the edit form */}
        <button
          className={styles.Button}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </button>
        {/* Button to submit the edited comment */}
        <button
          className={styles.Button}
          disabled={!formContent.trim()}
          type="submit"
        >
          save
        </button>
      </div>
    </Form>
  );
}

export default CommentEditForm;
