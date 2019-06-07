import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <p className="lead">
                  {' '}
                  Социальный проект направленный на цифровизацию уйгурского
                  словаря написанного Эмиром Наджип
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Зарегестрироваться
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Войти
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
