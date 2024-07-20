// Importing necessary libraries and components
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Hook to get route parameters
import axios from "axios"; // Axios for API requests
import Post from "./Post"; // Post component to display individual posts
import Asset from "../../components/Asset"; // Asset component for loading and no posts message

// Component definition
const PostByCategory = () => {
  const { categoryName } = useParams(); // Hook to get the category name from the URL
  const [posts, setPosts] = useState([]); // State to store posts
  const [loading, setLoading] = useState(true); // State to manage loading status

  // Effect to fetch posts when categoryName changes
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`/posts/category/${categoryName}`); // API call to fetch posts by category
        setPosts(data); // Setting fetched posts to state
        setLoading(false); // Setting loading to false after data is fetched
      } catch (err) {
        
        setLoading(false); // Setting loading to false in case of an error
      }
    };

    fetchPosts(); // Calling the fetchPosts function
  }, [categoryName]); // Dependency array to refetch when categoryName changes

  // Component rendering
  return (
    <div>
      {loading ? ( // Conditional rendering based on loading state
        <Asset spinner /> // Displaying spinner while loading
      ) : posts.length ? ( // Conditional rendering based on posts length
        posts.map((post) => <Post key={post.id} post={post} />) // Displaying posts if found
      ) : (
        <Asset message="No posts found." /> // Displaying message if no posts found
      )}
    </div>
  );
};

// Exporting the component as default
export default PostByCategory;
