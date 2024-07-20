import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Post from "./Post";
import Asset from "../../components/Asset";

const PostByCategory = () => {
  const { categoryName } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`/posts/category/${categoryName}`);
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [categoryName]);

  return (
    <div>
      {loading ? (
        <Asset spinner />
      ) : posts.length ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <Asset message="No posts found." />
      )}
    </div>
  );
};

export default PostByCategory;