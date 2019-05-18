import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getWordsByUser } from '../../actions/wordActions';
import { getCurrentProfile } from '../../actions/profileActions';

class MyWords extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getWordsByUser();
  }
  render() {
    const { words } = this.props.words;
    const { profile, loading } = this.props.profile;
    const { user } = this.props.auth;
    let wordItems;
    const userID = user.id;

    //console.log(typeof user.id);
    if (profile === null || loading) {
      wordItems = <Spinner />;
    } else {
      if (words.length > 0) {
        wordItems = words.map(word =>
          word.user === userID ? (
            <li className="list-group-item" key={word.ugrWordCyr}>
              <p className="font-weight-bold">{word.ugrWordCyr}</p>
              {word.rusTranslation}
            </li>
          ) : (
            ''
          )
        );
      } else {
        wordItems = <h4>No words found</h4>;
      }
    }
    return (
      <div className="my-word">
        <div className="row">
          <div className="col-md-12">
            <div className="card" style={{ width: '18rem' }}>
              <ul className="list-group list-group-flush">
                <li className="list-group-item active">Мои слова</li>
                {wordItems}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MyWords.propTypes = {
  getWordsByUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  words: state.words,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getWordsByUser }
)(MyWords);
