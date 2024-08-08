import React from "react";

// Importing Bootstrap container for layout
import Container from "react-bootstrap/Container";

// Importing custom styles and components
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";


const PopularProfiles = ({ mobile }) => {
  // Retrieve popular profiles data from context
  const { popularProfiles } = useProfileData();

  return (
    <>
      <Container
        className={`${appStyles.Content} ${
          mobile && "d-lg-none text-center mb-3"
        }`}
      >
        {popularProfiles.results.length ? (
          <>
            <p>Most followed profiles.</p>
            {mobile ? (
              // Display profiles in a flexible layout for mobile view
              <div className="d-flex justify-content-around">
                {popularProfiles.results.slice(0, 4).map((profile) => (
                  <Profile key={profile.id} profile={profile} mobile />
                ))}
              </div>
            ) : (
              // Display all popular profiles
              popularProfiles.results.map((profile) => (
                <Profile key={profile.id} profile={profile} />
              ))
            )}
          </>
        ) : (
          // Show a loading spinner if popular profiles data is not yet loaded
          <Asset spinner />
        )}
      </Container>
      
    </>
  );
};

export default PopularProfiles;
