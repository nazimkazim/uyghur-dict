import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getWordsByUser } from '../../actions/wordActions';
import { getCurrentProfile } from '../../actions/profileActions';
import { Link } from 'react-router-dom';

class MyWords extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    displayViewCard: false
  };

  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getWordsByUser();
  }

  render() {
    const { words } = this.props.words;
    const { profile, loading } = this.props.profile;
    const { user } = this.props.auth;
    const { displayViewCard } = this.state;
    let wordItems;
    let viewCard;
    const userID = user.id;

    //console.log(typeof user.id);
    if (profile === null || loading) {
      wordItems = <Spinner />;
    } else {
      if (words.length > 0) {
        wordItems = words.map(word =>
          word.user === userID ? (
            <li className="list-group-item" key={word.ugrWordCyr}>
              <div className="container">
                <div className="row">
                  <div className="col-sm-8">
                    <p className="font-weight-bold">{word.ugrWordCyr}</p>
                    {word.rusTranslation}
                  </div>
                  <div className="col-col-sm-4">
                    <button
                      type="button"
                      className="btn btn-primary btn-small btn-block"
                      onClick={() => {
                        this.setState(prevState => ({
                          displayViewCard: !prevState.displayViewCard
                        }));
                      }}
                    >
                      View
                    </button>
                    <Link
                      type="button"
                      className="btn btn-primary btn-small btn-block"
                      to={`/my-words/${word._id}`}
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-primary btn-small btn-block"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ) : (
            ''
          )
        );
      } else {
        wordItems = <h4>No words found</h4>;
      }
      if (displayViewCard) {
        viewCard = (
          <div
            className="card border-primary mb-3"
            style={{ maxWidth: '18rem' }}
          >
            <div className="card-header">Инфо о слове</div>
            <div className="card-body text-primary">
              <h5 className="card-title">Название</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        );
      }
    }
    return (
      <div className="my-word">
        <div className="row">
          <div className="col-md-4">
            <div className="card" style={{ width: '18rem' }}>
              <ul className="list-group list-group-flush">
                <li className="list-group-item active">Мои слова</li>
                {wordItems}
              </ul>
            </div>
          </div>
          <div className="col-md-8">{viewCard}</div>
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
