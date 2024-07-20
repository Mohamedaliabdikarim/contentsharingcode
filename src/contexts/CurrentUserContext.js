// Importing necessary libraries and hooks from React and axios
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults"; // Importing custom axios instances
import { useHistory } from "react-router"; // Hook for navigation
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils"; // Utility functions

// Creating contexts for current user and setting current user
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

// Custom hooks to use the contexts
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

// Provider component to wrap around components that need access to the current user context
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // State to manage current user
  const history = useHistory(); // Hook to navigate programmatically

  // Function to fetch current user data
  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/"); // API call to fetch user data
      setCurrentUser(data); // Setting fetched user data to state
    } catch (err) {
      // console.log(err); // Logging errors if any
    }
  };

  // useEffect to fetch user data on component mount
  useEffect(() => {
    handleMount(); // Calling the handleMount function
  }, []); // Empty dependency array to run only once on mount

  // useMemo to set up axios interceptors
  useMemo(() => {
    // Request interceptor to refresh token if needed
    axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) { // Check if token should be refreshed
          try {
            await axios.post("/dj-rest-auth/token/refresh/"); // API call to refresh token
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin"); // Redirecting to sign in page on error
              }
              return null;
            });
            removeTokenTimestamp(); // Removing token timestamp
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    // Response interceptor to handle token expiration
    axiosRes.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          setCurrentUser((prevCurrentUser) => {
            if (prevCurrentUser) {
              history.push("/signin"); // Redirecting to sign in page on error
            }
            return null;
          });
          removeTokenTimestamp(); // Removing token timestamp
        }
        return Promise.reject(error);
      }
    );
  }, [history, setCurrentUser]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
