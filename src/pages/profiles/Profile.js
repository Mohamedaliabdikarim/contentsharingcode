import React from "react";

// Importing custom styles
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";

// Importing context for user data
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// Importing Link component for navigation
import { Link } from "react-router-dom";

// Importing Avatar component for displaying profile images
import Avatar from "../../components/Avatar";

// Importing Button component from React Bootstrap
import Button from "react-bootstrap/Button";

// Importing context for profile data management
import { useSetProfileData } from "../../contexts/ProfileDataContext";

const Profile = (props) => {
  // Destructuring props to extract profile details and other properties
  const { profile, mobile, imageSize = 55 } = props;
  const { id, following_id, image, owner } = profile;

  // Retrieving current user data
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  // Destructuring functions for follow and unfollow actions
  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        {/* Link to navigate to the profile page */}
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{owner}</strong>
      </div>
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {/* Display follow/unfollow button based on current user and profile owner */}
        {!mobile &&
          currentUser &&
          !is_owner &&
          (following_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
              onClick={() => handleUnfollow(profile)}
            >
              unfollow
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Black}`}
              onClick={() => handleFollow(profile)}
            >
              follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
