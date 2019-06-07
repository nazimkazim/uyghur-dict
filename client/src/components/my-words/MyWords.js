import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getWordsByUser, deleteWord } from '../../actions/wordActions';
import { getCurrentProfile } from '../../actions/profileActions';
import { Link } from 'react-router-dom';

class MyWords extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    displayViewCard: false
  };

  onDeleteClick(id) {
    this.props.deleteWord(id);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getWordsByUser(this.props.auth);
  }

  render() {
    const { words } = this.props.words;
    //console.log(words);
    const { profile, loading } = this.props.profile;
    let wordItems;

    if (profile === null || loading) {
      wordItems = <Spinner />;
    } else {
      if (words.length > 0) {
        wordItems = words.map(word => (
          <li className="list-group-item" key={word._id}>
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                  <p className="font-weight-bold">{word.ugrWordCyr}</p>
                  {word.rusTranslation}
                </div>
                <div className="col-col-sm-6">
                  <Link
                    type="button"
                    className="btn btn-primary btn-small btn-block"
                    to={`/my-words/${word._id}`}
                  >
                    Изменить
                  </Link>
                  <button
                    type="button"
                    className="btn btn-primary btn-small btn-block"
                    onClick={this.onDeleteClick.bind(this, word._id)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          </li>
        ));
      } else {
        wordItems = <h4>Слов не найдено</h4>;
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
        </div>
      </div>
    );
  }
}

MyWords.propTypes = {
  getWordsByUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  deleteWord: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  words: state.words,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getWordsByUser, deleteWord }
)(MyWords);
