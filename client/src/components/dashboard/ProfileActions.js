import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Change profile
      </Link>
      <Link to="/add-a-word" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1" />
        Add word
      </Link>
      <Link to="/my-words" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1" />
        My words
      </Link>
    </div>
  );
};

export default ProfileActions;
