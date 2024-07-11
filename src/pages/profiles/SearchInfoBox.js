// src/pages/profiles/SearchInfoBox.js

import React from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

const SearchInfoBox = () => {
  return (
    <Container className="mt-3">
      <Alert variant="info">
        You can search for the category you want to read about in the search field. Categories include:
        <ul>
          <li>Ideas</li>
          <li>Stories</li>
          <li>Articles</li>
          <li>Journalism</li>
        </ul>
      </Alert>
    </Container>
  );
};

export default SearchInfoBox;
