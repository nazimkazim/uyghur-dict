import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getPublicProfileByID } from '../../actions/profileActions';
import { Link } from 'react-router-dom';
import usersReducer from '../../reducers/usersReducer';

class PublicProfile extends Component {
  componentDidMount() {
    this.props.getPublicProfileByID(this.props.match.params.id);
  }

  render() {
    const { loading } = this.props;
    const { user } = this.props.user;
    //console.table(user.user.avatar);
    console.log(user);
    let profileShow;

    if (user === null || loading) {
      profileShow = <Spinner />;
    } else {
      profileShow = (
        <div className="row">
          <div className="col-md-4" align="center">
            {user.user ? (
              <figure className="figure">
                <img
                  src={user.user.avatar}
                  className="figure-img img-fluid rounded"
                  alt={user.user.name}
                />
              </figure>
            ) : null}
          </div>
          <div className="col-md-6">{user.bio}</div>
          <div className="col-md-2">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <div className="row">
                  <div className="col">
                    {user.social ? (
                      <a href={user.social.facebook} target="_blank">
                        <i className="fab fa-facebook" />
                      </a>
                    ) : null}
                  </div>
                  <div className="col">
                    {user.social ? (
                      <a href={user.social.vk} target="_blank">
                        <i className="fab fa-vk" />
                      </a>
                    ) : null}
                  </div>
                  <div className="col">
                    {user.social ? (
                      <a href={user.social.instagram} target="_blank">
                        <i className="fab fa-instagram" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </li>
              {user.country ? (
                <li className="list-group-item">Страна: {user.country}</li>
              ) : null}
              {user.city ? (
                <li className="list-group-item">Город: {user.city}</li>
              ) : null}
              {user.gender ? (
                <li className="list-group-item">Пол: {user.gender}</li>
              ) : null}
              {user.education ? (
                <li className="list-group-item">
                  Образование: {user.education}
                </li>
              ) : null}
              {user.languages ? (
                <li className="list-group-item">
                  Языки:{' '}
                  {user.languages.map(language => (
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
  getPublicProfileByID: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.users
});

export default connect(
  mapStateToProps,
  { getPublicProfileByID }
)(PublicProfile);
