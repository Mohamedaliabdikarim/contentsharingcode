// Importing necessary libraries and components
import React from "react";
import styles from "../../styles/Post.module.css"; // Importing custom styles
import { useCurrentUser } from "../../contexts/CurrentUserContext"; // Hook to get current user context

// Importing Bootstrap components for UI
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

// Importing routing components
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar"; // Custom Avatar component
import { axiosRes } from "../../api/axiosDefaults"; // Axios instance for API requests
import { MoreDropdown } from "../../components/MoreDropdown"; // Custom dropdown component

// Component definition
const Post = (props) => {
  const {
    id, // Post ID
    owner, // Owner of the post
    profile_id, // Profile ID of the owner
    profile_image, // Profile image of the owner
    comments_count, // Number of comments on the post
    likes_count, // Number of likes on the post
    like_id, // ID of the like if liked by current user
    title, // Title of the post
    content, // Content of the post
    image, // Image of the post
    updated_at, // Last updated time of the post
    postPage, // Boolean to check if it's a post page
    setPosts, // Function to set posts state
  } = props;

  const currentUser = useCurrentUser(); // Hook to get current user context
  const is_owner = currentUser?.username === owner; // Check if current user is the owner of the post
  const history = useHistory(); // Hook to navigate programmatically

  // Handler for editing the post
  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  // Handler for deleting the post
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`); // API call to delete the post
      history.goBack(); // Navigate back on success
    } catch (err) {
      // console.log(err);
    }
  };

  // Handler for liking the post
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id }); // API call to like the post
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  // Handler for unliking the post
  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`); // API call to unlike the post
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
    
    }
  };

  // Component rendering
  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} /> {/* Avatar component */}
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && postPage && (
              <MoreDropdown
                handleEdit={handleEdit} // Edit post handler
                handleDelete={handleDelete} // Delete post handler
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} /> {/* Post image */}
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>} {/* Post title */}
        {content && <Card.Text>{content}</Card.Text>} {/* Post content */}
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}
          <Link to={`/posts/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

// Exporting the component as default
export default Post;
