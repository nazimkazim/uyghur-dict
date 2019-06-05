import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { getCurrentProfile, getLeaders } from '../../actions/profileActions';
import Spinner from '../common/Spinner';

class Leaders extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getLeaders();
  }

  render() {
    const { leaders } = this.props;
    const { loading } = this.props.profile;
    console.log(leaders.users);

    let showLeaders;

    if (!leaders.users || loading) {
      showLeaders = <Spinner />;
    } else {
      showLeaders = leaders.users.map(leader => (
        <div key={leader._id}>
          <li className="list-group-item d-flex justify-content-between align-items-center mt-2">
            <figure className="figure">
              <img
                src={leader.user.avatar}
                className="figure-img img-fluid rounded"
                style={{ width: '50%' }}
                alt={leader.user.avatar}
              />
              <figcaption>
                <Link to={`/leaders/${leader._id}`}>{leader.user.name}</Link>
              </figcaption>
            </figure>
            <span>Добавил(а) {leader.user.score / 150} слов</span>
            <span className="badge badge-primary badge-pill">
              {leader.user.score}
            </span>
          </li>
        </div>
      ));
    }

    return (
      <div className="row d-flex justify-content-center">
        <div className="col-md-8">
          <h3 className="text-center">Лидеры</h3>
          <div className="list-group">{showLeaders}</div>
        </div>
      </div>
    );
  }
}

Leaders.propTypes = {
  getLeaders: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  leaders: state.users,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getLeaders, getCurrentProfile }
)(withRouter(Leaders));
