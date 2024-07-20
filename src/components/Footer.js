// Importing necessary libraries and styles
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; // Importing Bootstrap components
import styles from '../styles/Footer.module.css'; // Importing custom styles

// Functional component definition
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row>
          <Col md={6}>
            <h5>Quick Links</h5>
            <ul className={styles.links}>
              <li><a href="/">Home</a></li> {/* Link to Home page */}
              <li><a href="/about">About</a></li> {/* Link to About page */}
            </ul>
          </Col>
          <Col md={6}>
            <h5>Follow Us</h5>
            <div className={styles.social}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a> {/* Link to Facebook */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a> {/* Link to Twitter */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a> {/* Link to Instagram */}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a> {/* Link to LinkedIn */}
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            &copy; 2024 CONTENT SHARING {/* Footer copyright text */}
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

// Exporting the component as default
export default Footer;
