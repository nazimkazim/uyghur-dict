import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getCurrentProfile } from "../../actions/profileActions";
//import { Link } from "react-router-dom";

class Profile extends Component {
 

  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { profile, loading } = this.props.profile;
    const { auth } = this.props;
    console.log(profile);
    let profileShow;

    if (profile === null || loading) {
      profileShow = <Spinner />;
    } else {
      profileShow = (
        <div className="row">
          <div className="col-md-4" align="center">
            <figure className="figure">
              <img
                src={auth.user.avatar}
                className="figure-img img-fluid rounded"
                alt={auth.user.avatar}
              />
            </figure>
          </div>
          <div className="col-md-6">{profile.bio}</div>
          <div className="col-md-2">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <div className="row">
                  <div className="col">
                    {profile.social ? (
                      <a href={profile.social.facebook} >
                        <i className="fab fa-facebook" />
                      </a>
                    ) : null}
                  </div>
                  <div className="col">
                    {profile.social ? (
                      <a href={profile.social.vk} >
                        <i className="fab fa-vk" />
                      </a>
                    ) : null}
                  </div>
                  <div className="col">
                    {profile.social ? (
                      <a href={profile.social.instagram}>
                        <i className="fab fa-instagram" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </li>
              {profile.country ? (
                <li className="list-group-item">Country: {profile.country}</li>
              ) : null}
              {profile.city ? (
                <li className="list-group-item">City: {profile.city}</li>
              ) : null}
              {profile.gender ? (
                <li className="list-group-item">Gender: {profile.gender}</li>
              ) : null}
              {profile.education ? (
                <li className="list-group-item">
                  Education: {profile.education}
                </li>
              ) : null}
              {profile.languages ? (
                <li className="list-group-item">
                  Languages:{" "}
                  {profile.languages.map(language => (
                    <span key={language}>{language}</span>
                  ))}
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col align-self-center">{profileShow}</div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
