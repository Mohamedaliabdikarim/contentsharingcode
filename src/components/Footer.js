import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row>
          <Col md={6}>
            <h5>Quick Links</h5>
            <ul className={styles.links}>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
            </ul>
          </Col>
          <Col md={6}>
            <h5>Follow Us</h5>
            <div className={styles.social}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            &copy; 2024 CONTENTSHARING
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;