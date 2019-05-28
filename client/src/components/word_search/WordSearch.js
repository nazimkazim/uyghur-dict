import React, { Component } from 'react';
import { searchWord } from '../../actions/wordActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';

class SearchWord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  componentDidMount() {
    this.props.searchWord();
  }

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  render() {
    const { words } = this.props.words;
    let filteredWords = words.filter(word => {
      return word.ugrWordCyr.indexOf(this.state.search) !== -1;
    });

    //console.log(filteredWords);
    return (
      <div>
        <input
          type="text"
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}
        />
        {filteredWords.map(word =>
          word.ugrWordCyr === this.state.search ? (
            <div>
              <div>{word.ugrWordCyr}</div>
              <div>{word.rusTranslation}</div>
            </div>
          ) : (
            ''
          )
        )}
      </div>
    );
  }
}

SearchWord.propTypes = {
  searchWord: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  words: state.words
});

export default connect(
  mapStateToProps,
  { searchWord }
)(SearchWord);
