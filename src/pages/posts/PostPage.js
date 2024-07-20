// Importing necessary libraries and components
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col"; // Importing Bootstrap Col component
import Row from "react-bootstrap/Row"; // Importing Bootstrap Row component
import Container from "react-bootstrap/Container"; // Importing Bootstrap Container component

import appStyles from "../../App.module.css"; // Importing custom styles
import { useParams } from "react-router"; // Hook to get route parameters
import { axiosReq } from "../../api/axiosDefaults"; // Importing Axios instance for API requests
import Post from "./Post"; // Importing Post component
import Comment from "../comments/Comment"; // Importing Comment component
import CommentCreateForm from "../comments/CommentCreateForm"; // Importing CommentCreateForm component
import { useCurrentUser } from "../../contexts/CurrentUserContext"; // Hook to get current user context
import InfiniteScroll from "react-infinite-scroll-component"; // Importing InfiniteScroll component
import Asset from "../../components/Asset"; // Importing Asset component
import { fetchMoreData } from "../../utils/utils"; // Utility function to fetch more data
import PopularProfiles from "../profiles/PopularProfiles"; // Importing PopularProfiles component

// Function component definition
function PostPage() {
  const { id } = useParams(); // Hook to get post id from the URL
  const [post, setPost] = useState({ results: [] }); // State to manage post data

  const currentUser = useCurrentUser(); // Hook to get current user context
  const profile_image = currentUser?.profile_image; // Getting profile image of the current user
  const [comments, setComments] = useState({ results: [] }); // State to manage comments

  // useEffect to fetch post and comments on component mount
  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`), // API call to fetch post details
          axiosReq.get(`/comments/?post=${id}`), // API call to fetch comments
        ]);
        setPost({ results: [post] }); // Setting fetched post data to state
        setComments(comments); // Setting fetched comments to state
      } catch (err) {
        
      }
    };

    handleMount(); // Calling the handleMount function
  }, [id]); // Dependency array to refetch when id changes

  // Component rendering
  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile /> {/* Displaying popular profiles for mobile */}
        <Post {...post.results[0]} setPosts={setPost} postPage /> {/* Displaying post */}
        <Container className={appStyles.Content}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id} // Passing current user's profile id
              profileImage={profile_image} // Passing current user's profile image
              post={id} // Passing post id
              setPost={setPost} // Setting post state
              setComments={setComments} // Setting comments state
            />
          ) : comments.results.length ? (
            "Comments" // Displaying "Comments" text if there are comments
          ) : null}
          {comments.results.length ? (
            <InfiniteScroll
              children={comments.results.map((comment) => (
                <Comment
                  key={comment.id} // Unique key for each comment
                  {...comment} // Passing comment props
                  setPost={setPost} // Setting post state
                  setComments={setComments} // Setting comments state
                />
              ))}
              dataLength={comments.results.length} // Length of the comments array
              loader={<Asset spinner />} // Loader component
              hasMore={!!comments.next} // Checking if there are more comments
              next={() => fetchMoreData(comments, setComments)} // Function to fetch more data
            />
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span> // Message if no comments and user is logged in
          ) : (
            <span>No comments... yet</span> // Message if no comments and user is not logged in
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles /> {/* Displaying popular profiles for large screens */}
      </Col>
    </Row>
  );
}

// Exporting the component as default
export default PostPage;
