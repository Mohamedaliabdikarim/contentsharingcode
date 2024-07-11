import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

const CategoryList = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosReq.get('/categories/');
        console.log('Fetched categories:', response.data); // Log fetched categories
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div style={{ padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "5px" }}>
      <h2>Categories</h2>
      <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
        {categories.length > 0 ? (
          categories.map((category) => (
            <li key={category.id} style={{ margin: "10px 0" }}>
              <Link to="#" onClick={() => onSelectCategory(category.name)} style={{ textDecoration: "none", color: "#007bff" }}>
                {category.name}
              </Link>
            </li>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </ul>
    </div>
  );
};

export default CategoryList;
