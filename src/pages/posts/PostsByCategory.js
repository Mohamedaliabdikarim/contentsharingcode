import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

const PostByCategory = ({ categoryName }) => {
  const [posts, setPosts] = useState({ results: [] });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosReq.get(`/posts/category/${categoryName}/`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [categoryName]);

  return (
    <div>
      <h2>Posts in {categoryName}</h2>
      {posts.results.length ? (
        <InfiniteScroll
          dataLength={posts.results.length}
          next={() => fetchMoreData(posts, setPosts)}
          hasMore={!!posts.next}
          loader={<Asset spinner />}
        >
          {posts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setPosts} />
          ))}
        </InfiniteScroll>
      ) : (
        <span>No posts in this category yet...</span>
      )}
    </div>
  );
};

export default PostByCategory;
