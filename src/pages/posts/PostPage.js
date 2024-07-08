import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function PostPage() {
  const { id } = useParams();
  const [content, setContent] = useState({ results: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data: content } = await axiosReq.get(`/contents/${id}`);
        setContent({ results: [content] });
        console.log(content);
      } catch (err) {
        console.error('Error fetching content:', err);
        setError('An error occurred while fetching the content. Please try again later.');
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <Container className={appStyles.text}>Comments</Container>
        {/* Displaying content data or error message */}
        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          content.results.length > 0 && (
            <div>
              <h1>{content.results[0].title}</h1>
              <p>{content.results[0].body}</p>
            </div>
          )
        )}
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default PostPage;
