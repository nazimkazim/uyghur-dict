import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getPublicProfileByID } from '../../actions/profileActions';
import { Link } from 'react-router-dom';

class PublicProfile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props);
    this.props.getPublicProfileByID(this.props.profile._id);
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
                      <a href={profile.social.facebook} target="_blank">
                        <i className="fab fa-facebook" />
                      </a>
                    ) : null}
                  </div>
                  <div className="col">
                    {profile.social ? (
                      <a href={profile.social.vk} target="_blank">
                        <i className="fab fa-vk" />
                      </a>
                    ) : null}
                  </div>
                  <div className="col">
                    {profile.social ? (
                      <a href={profile.social.instagram} target="_blank">
                        <i className="fab fa-instagram" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </li>
              {profile.country ? (
                <li className="list-group-item">Страна: {profile.country}</li>
              ) : null}
              {profile.city ? (
                <li className="list-group-item">Город: {profile.city}</li>
              ) : null}
              {profile.gender ? (
                <li className="list-group-item">Пол: {profile.gender}</li>
              ) : null}
              {profile.education ? (
                <li className="list-group-item">
                  Образование: {profile.education}
                </li>
              ) : null}
              {profile.languages ? (
                <li className="list-group-item">
                  Языки:{' '}
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

PublicProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  getPublicProfileByID: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPublicProfileByID }
)(PublicProfile);
