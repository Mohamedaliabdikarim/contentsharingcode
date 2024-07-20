// Importing necessary hooks from React
import { useEffect, useRef, useState } from "react";

// Custom hook definition
const useClickOutsideToggle = () => {
  const [expanded, setExpanded] = useState(false); // State to manage the expanded state
  const ref = useRef(null); // useRef hook to reference the element

  // useEffect to handle click outside event
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false); // Set expanded to false if clicked outside the referenced element
      }
    };

    document.addEventListener("mouseup", handleClickOutside); // Adding event listener for mouseup event
    return () => {
      document.removeEventListener("mouseup", handleClickOutside); // Removing event listener on cleanup
    };
  }, [ref]); // Dependency array to refetch when ref changes

  return { expanded, setExpanded, ref }; // Returning state and ref
};

// Exporting the custom hook as default
export default useClickOutsideToggle;
