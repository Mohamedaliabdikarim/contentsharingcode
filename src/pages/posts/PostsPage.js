// Importing necessary libraries and components
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form"; // Importing Bootstrap Form component
import Col from "react-bootstrap/Col"; // Importing Bootstrap Col component
import Row from "react-bootstrap/Row"; // Importing Bootstrap Row component
import Container from "react-bootstrap/Container"; // Importing Bootstrap Container component
import Post from "./Post"; // Importing Post component
import Asset from "../../components/Asset"; // Importing Asset component
import appStyles from "../../App.module.css"; // Importing custom styles
import styles from "../../styles/PostsPage.module.css"; // Importing custom styles
import { useLocation } from "react-router"; // Hook to get current location
import { axiosReq } from "../../api/axiosDefaults"; // Importing Axios instance for API requests
import NoResults from "../../assets/no-results.png"; // Importing no results image
import InfiniteScroll from "react-infinite-scroll-component"; // Importing InfiniteScroll component
import { fetchMoreData } from "../../utils/utils"; // Utility function to fetch more data
import PopularProfiles from "../profiles/PopularProfiles"; // Importing PopularProfiles component
import { useCurrentUser } from "../../contexts/CurrentUserContext"; // Hook to get current user context

// Function component definition
function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] }); // State to manage posts
  const [categories, setCategories] = useState([]); // State to manage categories
  const [hasLoaded, setHasLoaded] = useState(false); // State to manage loading status
  const [query, setQuery] = useState(""); // State to manage search query
  const [selectedCategory, setSelectedCategory] = useState(""); // State to manage selected category

  const { pathname } = useLocation(); // Hook to get current location
  const currentUser = useCurrentUser(); // Hook to get current user context

  // Fetch categories on component mount
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

  // useEffect to fetch posts on component mount and when dependencies change
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}&category=${selectedCategory}`); // API call to fetch posts
        setPosts(data); // Setting fetched posts to state
        setHasLoaded(true); // Setting loading status to true
      } catch (err) {
        console.log(err); // Logging errors if any
      }
    };

    setHasLoaded(false); // Setting loading status to false
    const timer = setTimeout(() => {
      fetchPosts(); // Calling the fetchPosts function after a delay
    }, 1000);

    return () => {
      clearTimeout(timer); // Clearing the timer on component unmount
    };
  }, [filter, query, selectedCategory, pathname, currentUser]); // Dependency array to refetch when these values change

  // Handler for category change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value); // Setting selected category
  };

  // Component rendering
  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile /> {/* Displaying popular profiles for mobile */}
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()} // Preventing default form submission
        >
          <Form.Control
            value={query} // Binding search query state
            onChange={(event) => setQuery(event.target.value)} // Handler for search input change
            type="text"
            className="mr-sm-2"
            placeholder="Search posts"
          />
          <Form.Group controlId="categoryFilter">
            <Form.Label>Search by Category</Form.Label>
            <Form.Control
              as="select"
              value={selectedCategory} // Binding selected category state
              onChange={handleCategoryChange} // Handler for category selection change
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name} {/* Displaying categories */}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>

        {hasLoaded ? (
          <>
            {posts.results.length ? (
              <InfiniteScroll
                children={posts.results.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} /> // Displaying posts
                ))}
                dataLength={posts.results.length} // Length of the posts array
                loader={<Asset spinner />} // Loader component
                hasMore={!!posts.next} // Checking if there are more posts
                next={() => fetchMoreData(posts, setPosts)} // Function to fetch more data
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} /> {/* Displaying no results message */}
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner /> {/* Displaying spinner while loading */}
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles /> {/* Displaying popular profiles for large screens */}
      </Col>
    </Row>
  );
}

// Exporting the component as default
export default PostsPage;
