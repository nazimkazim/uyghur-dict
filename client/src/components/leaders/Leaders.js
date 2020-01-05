import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getLeaders } from "../../actions/profileActions";
import Spinner from "../common/Spinner";

class Leaders extends Component {
  componentDidMount() {
    this.props.getLeaders();
  }

  render() {
    const { leaders } = this.props;
    let showLeaders;
    if (leaders.users == null) {
      showLeaders = <Spinner />;
    } else {
      showLeaders = leaders.users.map(leader => (
        <div key={leader._id}>
          <li className="list-group-item d-flex justify-content-between align-items-center mt-2">
            <figure className="figure">
              <img
                src={
                  leader.user
                    ? leader.user.avatar
                    : "https://via.placeholder.com/150"
                }
                className="figure-img img-fluid rounded"
                style={{ width: "50%" }}
                alt={leader.user ? leader.user.avatar : "no photo"}
              />
              <figcaption>
                <Link to={`/leaders/${leader._id}`}>
                  {leader.user
                    ? leader.user.name
                    : "User may not exist"}
                </Link>
              </figcaption>
            </figure>
            <span>
              Added {leader.user ? leader.user.score / 150 : 0} words
            </span>
            <span className="badge badge-primary badge-pill">
              {leader.user ? leader.user.score : 0}
            </span>
          </li>
        </div>
      ));
    }

    return (
      <div className="row d-flex justify-content-center">
        <div className="col-md-8">
          <h3 className="text-center">Leaders</h3>
          <div className="list-group">{showLeaders}</div>
        </div>
      </div>
    );
  }
}

Leaders.propTypes = {
  getLeaders: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  leaders: state.users,
  profile: state.profile
});

export default connect(mapStateToProps, { getLeaders })(withRouter(Leaders));
