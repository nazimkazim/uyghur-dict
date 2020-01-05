/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addWord } from "../../actions/wordActions";
import {
  lexisOptions,
  grammarOptions,
  partOfSpeechOptions,
  styleOptions,
  originOptions,
  sphereOptions
} from "../common/options";

class AddWord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ugrWordCyr: "",
      ugrWordArb: "",
      rusTranslation: "",
      examples: [{ exCyr: "", trRus: "", exLat: "", trEng: "", exArab: "" }],
      origin: "",
      sphere: "",
      see: "",
      lexis: "",
      grammar: "",
      partOfSpeech: "",
      style: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const wordData = {
      ugrWordCyr: this.state.ugrWordCyr,
      ugrWordArb: this.state.ugrWordArb,
      rusTranslation: this.state.rusTranslation,
      examples: this.state.examples,
      origin: this.state.origin,
      sphere: this.state.sphere,
      see: this.state.see,
      lexis: this.state.lexis,
      grammar: this.state.grammar,
      partOfSpeech: this.state.partOfSpeech,
      style: this.state.style
    };
    this.props.addWord(wordData, this.props.history);
    console.log(wordData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChange(i, e) {
    const { name, value } = e.target;
    let examples = [...this.state.examples];
    examples[i] = { ...examples[i], [name]: value };
    this.setState({ examples });
  }

  addClick() {
    this.setState(prevState => ({
      examples: [
        ...prevState.examples,
        { exCyr: "", trRus: "", exLat: "", trEng: "", exArab: "" }
      ]
    }));
  }

  createUI() {
    return this.state.examples.map((el, i) => (
      <div key={i}>
        <TextFieldGroup
          placeholder=""
          info="Введите пример предложения на уйгурском (cyr)"
          name="exCyr"
          value={el.exCyr || ""}
          className="exCyr"
          onChange={this.handleChange.bind(this, i)}
        />
        <TextFieldGroup
          placeholder=""
          info="Введите перевод примерного предложения на русском"
          name="trRus"
          value={el.trRus || ""}
          onChange={this.handleChange.bind(this, i)}
        />
        <TextFieldGroup
          placeholder=""
          info="Введите пример предложения на уйгурском (lat)"
          name="exLat"
          value={el.exLat}
          onChange={this.handleChange.bind(this, i)}
        />
        <TextFieldGroup
          placeholder=""
          info="Введите перевод примерного предложения на Английском"
          name="trEng"
          value={el.trEng}
          onChange={this.handleChange.bind(this, i)}
        />
        <TextFieldGroup
          placeholder=""
          info="Введите перевод примерного предложения на арабском"
          name="exArab"
          value={el.exArab}
          onChange={this.handleChange.bind(this, i)}
        />
        <input
          type="button"
          value="remove"
          onClick={this.removeClick.bind(this, i)}
        />
        <hr />
      </div>
    ));
  }

  removeClick(i) {
    let examples = [...this.state.examples];
    examples.splice(i, 1);
    this.setState({ examples });
  }

  /* onChangeExamples = e => {
    //this.state.example[index].exCyr = e.target.value
    if (
      ["exCyr", "trRus", "exLat", "trEng", "exArab"].includes(
        e.target.className
      )
    ) {
      let example = [...this.state.example];
      example[e.target.dataset.id][e.target.className] = e.target.value;
      this.setState({ example }, () => console.log(this.state.example));
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }; */

  /* addTranslations(e) {
    e.preventDefault();

    
    this.setState(prevState => ({
      example: [
        ...prevState.example,
        { exCyr: "", trRus: "", exLat: "", trEng: "", exArab: "" }
      ]
    }));
  } */

  onCheck(e) {
    this.setState({
      current: !this.state.current
    });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="add-word">
        {errors.wordalreadyexists && (
          <div class="alert alert-primary" role="alert">
            {errors.wordalreadyexists}
          </div>
        )}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Word</h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Бала"
                  info="Введите слово на уйгурском"
                  name="ugrWordCyr"
                  value={this.state.ugrWordCyr}
                  onChange={this.onChange}
                  error={errors.ugrWordCyr}
                />
                <TextFieldGroup
                  placeholder="جاراڭ - جۇرۇڭ"
                  info="Введите слово на уйгурском (арабским шрифтом)"
                  name="ugrWordArb"
                  value={this.state.ugrWordArb}
                  onChange={this.onChange}
                  error={errors.ugrWordCyr}
                />
                <TextFieldGroup
                  placeholder="Ребенок"
                  info="Введите слово на русском"
                  name="rusTranslation"
                  value={this.state.rusTranslation}
                  onChange={this.onChange}
                  error={errors.rusTranslation}
                />
                <div className="form-check mb-form">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="see"
                    value={this.state.see}
                    onChange={this.onCheck}
                    id="see"
                  />
                  <label htmlFor="see">Смотри</label>
                </div>
                <div className="input-group">{this.createUI()}</div>
                <input
                  type="button"
                  value="add more"
                  onClick={this.addClick.bind(this)}
                />
                <h6>Происхождение слова</h6>
                <SelectListGroup
                  placeholder="Арабское"
                  name="origin"
                  value={this.state.origin}
                  onChange={this.onChange}
                  error={errors.origin}
                  options={originOptions}
                />
                <h6>Сфера употребления слова</h6>
                <SelectListGroup
                  placeholder="Физика"
                  name="sphere"
                  value={this.state.sphere}
                  onChange={this.onChange}
                  error={errors.sphere}
                  options={sphereOptions}
                />
                <h6>Лексика слова</h6>
                <SelectListGroup
                  placeholder=""
                  name="lexis"
                  value={this.state.lexis}
                  onChange={this.onChange}
                  error={errors.lexis}
                  options={lexisOptions}
                />
                <h6>Стиль слова</h6>
                <SelectListGroup
                  placeholder=""
                  name="style"
                  value={this.state.style}
                  onChange={this.onChange}
                  error={errors.style}
                  options={styleOptions}
                />
                <h6>Часть речи</h6>
                <SelectListGroup
                  placeholder=""
                  name="partOfSpeech"
                  value={this.state.partOfSpeech}
                  onChange={this.onChange}
                  error={errors.partOfSpeech}
                  options={partOfSpeechOptions}
                />
                <h6>Грамматика слова</h6>
                <SelectListGroup
                  placeholder=""
                  name="grammar"
                  value={this.state.grammar}
                  onChange={this.onChange}
                  error={errors.grammar}
                  options={grammarOptions}
                />
                <input
                  type="submit"
                  value="submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddWord.propTypes = {
  addWord: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addWord })(withRouter(AddWord));
