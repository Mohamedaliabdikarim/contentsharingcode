// Importing necessary libraries and hooks from React and axios instances
import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults"; // Importing custom axios instances
import { useCurrentUser } from "../contexts/CurrentUserContext"; // Hook to get current user context
import { followHelper, unfollowHelper } from "../utils/utils"; // Utility functions for follow/unfollow

// Creating contexts for profile data and setting profile data
const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

// Custom hooks to use the contexts
export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

// Provider component to wrap around components that need access to the profile data context
export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    // State to manage profile data
    pageProfile: { results: [] }, // Placeholder for pageProfile
    popularProfiles: { results: [] }, // State to manage popular profiles
  });

  const currentUser = useCurrentUser(); // Hook to get current user context

  // Function to handle following a profile
  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedProfile.id, // Sending the ID of the profile to follow
      });

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id) // Using helper to update profile data
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id) // Using helper to update popular profiles
          ),
        },
      }));
    } catch (err) {
      // console.log(err); // Logging errors if any
    }
  };

  // Function to handle unfollowing a profile
  const handleUnfollow = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`); // Deleting the follow relationship

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            unfollowHelper(profile, clickedProfile) // Using helper to update profile data
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            unfollowHelper(profile, clickedProfile) // Using helper to update popular profiles
          ),
        },
      }));
    } catch (err) {
      // console.log(err); // Logging errors if any
    }
  };

  // useEffect to fetch popular profiles on component mount
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count" // Fetching profiles ordered by followers count
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data, // Setting fetched popular profiles to state
        }));
      } catch (err) {
        // console.log(err); // Logging errors if any
      }
    };

    handleMount(); // Calling the handleMount function
  }, [currentUser]); // Dependency array to refetch when currentUser changes

  // Returning the provider components
  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider
        value={{ setProfileData, handleFollow, handleUnfollow }} // Passing setProfileData, handleFollow, handleUnfollow functions
      >
        {children} {/* Rendering child components */}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
