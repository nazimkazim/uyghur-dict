import React, { Component } from "react";
import { searchWord } from "../../actions/wordActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";

class SearchWord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
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
      return (
        word.ugrWordCyr
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
      );
    });

    console.log(filteredWords);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <div className="input-group flex-nowrap">
              <div className="input-group-prepend">
                <span className="input-group-text" id="addon-wrapping">
                  <i className="fas fa-search" />
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                value={this.state.search}
                onChange={this.updateSearch.bind(this)}
                placeholder="Find a word"
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
            <div className="jumbotron mt-4">
              {filteredWords.map(word =>
                word.ugrWordCyr.toLowerCase() ===
                this.state.search.toLowerCase() ? (
                  <div key={word._id}>
                    <div>
                      <h1 className="display-7">
                        {word.ugrWordCyr && word.ugrWordCyr}
                      </h1>
                      <h1>{word.ugrWordArb ? word.ugrWordArb : ""}</h1>
                      <h1>{word.ugrWordLat ? word.ugrWordLat : ""}</h1>
                      <span>
                        {word.origin ? (
                          <span>
                            <div
                              type="button"
                              class="btn btn-primary btn-sm"
                              data-tip={word.origin}
                            >
                              origin
                            </div>
                            <ReactTooltip
                              place="bottom"
                              type="success"
                              effect="solid"
                            />
                          </span>
                        ) : (
                          ""
                        )}{" "}
                        {word.partOfSpeech ? (
                          <span>
                            <div
                              type="button"
                              className="btn btn-primary btn-sm"
                              data-tip={word.partOfSpeech}
                            >
                              part of speech
                            </div>
                            <ReactTooltip
                              place="bottom"
                              type="success"
                              effect="solid"
                            />
                          </span>
                        ) : (
                          ""
                        )}{" "}
                        {word.style ? (
                          <span>
                            <div
                              type="button"
                              class="btn btn-primary btn-sm"
                              data-tip={word.style}
                            >
                              style
                            </div>
                            <ReactTooltip
                              place="bottom"
                              type="success"
                              effect="solid"
                            />
                          </span>
                        ) : (
                          ""
                        )}{" "}
                        {word.sphere ? (
                          <span>
                            <div
                              type="button"
                              class="btn btn-primary btn-sm"
                              data-tip={word.sphere}
                            >
                              sphere
                            </div>
                            <ReactTooltip
                              place="bottom"
                              type="success"
                              effect="solid"
                            />
                          </span>
                        ) : (
                          ""
                        )}{" "}
                        {word.lexis ? (
                          <span>
                            <div
                              type="button"
                              className="btn btn-primary btn-sm"
                              data-tip={word.lexis}
                            >
                              lexis
                            </div>
                            <ReactTooltip
                              place="bottom"
                              type="success"
                              effect="solid"
                            />
                          </span>
                        ) : (
                          ""
                        )}{" "}
                        {word.grammar ? (
                          <span>
                            <div
                              type="button"
                              className="btn btn-primary btn-sm"
                              data-tip={word.grammar}
                            >
                              grammar
                            </div>
                            <ReactTooltip
                              place="bottom"
                              type="success"
                              effect="solid"
                            />
                          </span>
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                    <hr className="my-4" />
                    <p className="lead">
                      {word.ugrWordCyr && word.ugrWordCyr} -{" "}
                      {word.rusTranslation && word.rusTranslation}
                    </p>
                    <hr className="my-4" />
                    <p className="lead">
                      {word.ugrWordLat ? word.ugrWordLat : ""} -{" "}
                      {word.engTranslation && word.engTranslation}
                    </p>
                    {word.examples ? (
                      <ul className="list-group">
                        {word.examples &&
                          word.examples.map(word => (
                            <>
                              <li className="list-group-item list-group-item-info">
                                {word.exCyr && word.exCyr} -{" "}
                                {word.trRus && word.trRus}
                              </li>
                              <li className="list-group-item">
                                {word.exLat && word.exLat} (
                                {word.exArab && word.exArab})-{" "}
                                {word.trEng && word.trEng}
                              </li>
                              <hr />
                            </>
                          ))}
                      </ul>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, { searchWord })(SearchWord);
