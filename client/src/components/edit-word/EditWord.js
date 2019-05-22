import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getWordByID } from '../../actions/wordActions';
import isEmpty from '../../validation/is-empty';

class EditWord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ugrWordCyr: '',
      rusTranslation: '',
      example: '',
      exampleTranslation: '',
      origin: '',
      sphere: '',
      see: '',
      lexis: '',
      grammar: '',
      partOfSpeech: '',
      style: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.words.word[0]) {
      nextProps.words.word.map(word => {
        word.ugrWordCyr = !isEmpty(word.ugrWordCyr) ? word.ugrWordCyr : '';
        word.rusTranslation = !isEmpty(word.rusTranslation)
          ? word.rusTranslation
          : '';
        word.rusTranslation = !isEmpty(word.rusTranslation)
          ? word.rusTranslation
          : '';
        word.example = !isEmpty(word.example) ? word.example : '';
        word.exampleTranslation = !isEmpty(word.exampleTranslation)
          ? word.exampleTranslation
          : '';
        word.origin = !isEmpty(word.origin) ? word.origin : '';
        word.sphere = !isEmpty(word.sphere) ? word.sphere : '';
        word.see = !isEmpty(word.see) ? word.see : {};
        word.lexis = !isEmpty(word.lexis) ? word.lexis : {};
        word.grammar = !isEmpty(word.grammar) ? word.grammar : {};
        word.see = !isEmpty(word.see) ? word.see : {};
        word.style = !isEmpty(word.style) ? word.style : {};

        this.setState({
          ugrWordCyr: word.ugrWordCyr,
          rusTranslation: word.rusTranslation,
          example: word.example,
          exampleTranslation: word.exampleTranslation,
          origin: word.origin,
          lexis: word.lexis,
          grammar: word.grammar,
          see: word.see,
          partOfSpeech: word.partOfSpeech
        });
      });
    }
  }

  componentDidMount() {
    this.props.getWordByID(this.props.match.params.id);
  }

  onSubmit(e) {
    let id = this.props.match.params.id;
    e.preventDefault();
    const wordData = {
      ugrWordCyr: this.state.ugrWordCyr,
      rusTranslation: this.state.rusTranslation,
      example: this.state.example,
      exampleTranslation: this.state.exampleTranslation,
      origin: this.state.origin,
      sphere: this.state.sphere,
      see: this.state.see,
      lexis: this.state.lexis,
      grammar: this.state.grammar,
      partOfSpeech: this.state.partOfSpeech,
      style: this.state.style
    };
    //this.props.updateWord(wordData, id, this.props.history);
    //console.log(typeof this.props.words.words[0]._id);
    //console.log(typeof this.props.match.params.id);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      current: !this.state.current
    });
  }
  render() {
    const { errors } = this.state;
    const sphereOptions = [
      { label: 'Выберите сферу употребления слова', value: 0 },
      { label: 'Анатомия', value: 'Анатомия' },
      { label: 'Археология', value: 'Археология' },
      { label: 'Архитектура', value: 'Архитектура' },
      { label: 'Астрономия', value: 'Астрономия' },
      { label: 'Биология', value: 'Биология' },
      { label: 'Ботаника', value: 'Ботаника' },
      { label: 'Бухгалтерия', value: 'Бухгалтерия' },
      { label: 'Ветеренария', value: 'Ветеренария' },
      { label: 'География', value: 'География' },
      { label: 'Диалектизм', value: 'Диалектизм' },
      { label: 'Дипломатический термин', value: 'Дипломатический термин' },
      { label: 'Железнодорожное дело', value: 'Железнодорожное дело' },
      { label: 'Зоология', value: 'Зоология' },
      { label: 'Исторический термин', value: 'Исторический термин' },
      { label: 'Кулинария', value: 'Кулинария' },
      { label: 'Лингвистика', value: 'Лингвистика' },
      { label: 'Математика', value: 'Математика' },
      { label: 'Медицина', value: 'Медицина' },
      { label: 'Религия', value: 'Религия' },
      { label: 'Физкультура и спорт', value: 'Физкультура и спорт' },
      { label: 'Сельзкое хозяйство', value: 'Сельзкое хозяйство' },
      { label: 'Фармацептический термин', value: 'Фармацептический термин' },
      { label: 'Физика', value: 'Физика' },
      { label: 'Физиология', value: 'Физиология' },
      { label: 'Фольклор', value: 'Фольклор' },
      { label: 'Химия', value: 'Химия' },
      { label: 'Экономика', value: 'Экономика' },
      { label: 'Этнография', value: 'Этнография' },
      { label: 'Юридический термин', value: 'Юридический термин' }
    ];
    const originOptions = [
      { label: 'Выберите вариант происхождения слова', value: 0 },
      { label: 'Арабское слово', value: 'Арабское слово' },
      { label: 'Китайское слово', value: 'Китайское слово' },
      { label: 'Русское слово', value: 'Русское слово' },
      { label: 'Монгольский язык', value: 'Монгольский язык' },
      { label: 'Персидское слово', value: 'Персидское слово' },
      { label: 'Уйгурское слово', value: 'Уйгурское слово' },
      { label: 'Китайско-Уйгурское слово', value: 'Китайско-Уйгурское слово' },
      {
        label: 'Монгольско-Уйгурское слово',
        value: 'Могольско-Уйгурское слово'
      },
      { label: 'Русско-уйгурское слово', value: 'Русско-уйгурское слово' },
      { label: 'Арабско-Уйгурское слово', value: 'Арабско-Уйгурское слово' },
      { label: 'Персидско-Уйгурское слово', value: 'Персидско-Уйгурское слово' }
    ];

    const lexisOptions = [
      { label: 'Выберите лексику слова', value: 0 },
      { label: 'В переносном значении', value: 'В переносном значении' },
      { label: 'Малоупотребительно', value: 'Малоупотребительно' },
      { label: 'Поговорка', value: 'Поговорка' },
      { label: 'Пословица', value: 'Пословица' },
      { label: 'В разных значениях', value: 'В разных значениях' },
      { label: 'В прямом значении', value: 'В прямом значении' }
    ];

    const styleOptions = [
      { label: 'Выберите стиль слова', value: 0 },
      { label: 'Бранное слово', value: 'Бранное слово' },
      { label: 'Поэтическое слово', value: 'Поэтическое слово' },
      { label: 'Разговорное слово', value: 'Разговорное слово' },
      { label: 'Книжный стиль', value: 'Книжный стиль' },
      { label: 'Неодобрительно', value: 'Неодобрительно' },
      { label: 'В ироничном смысле', value: 'В ироничном смысле' }
    ];

    const partOfSpeechOptions = [
      { label: 'Выберите часть речи к которому принадлежит слово', value: 0 },
      { label: 'Вводное слово', value: 'Вводное слово' },
      {
        label: 'Вопросительное местоимение',
        value: 'Вопросительное местоимение'
      },
      { label: 'Вопросительная частица', value: 'Вопросительная частица' },
      { label: 'Глагол', value: 'Глагол' },
      {
        label: 'Количественное числительное',
        value: 'Количественное числительное'
      },
      {
        label: 'Существительное',
        value: 'Существительное'
      },
      {
        label: 'Порядковое числительное',
        value: 'Порядковое числительное'
      },
      {
        label: 'Междометие',
        value: 'Междометие'
      },
      {
        label: 'Звукоподражание',
        value: 'Звукоподражание'
      },
      {
        label: 'Личное местоимение',
        value: 'Личное местоимение'
      },
      {
        label: 'Местоимение',
        value: 'Местоимение'
      },
      {
        label: 'Отрицательная частица',
        value: 'Отрицательная частица'
      },
      {
        label: 'Имя прилагательное',
        value: 'Имя прилагательное'
      },
      {
        label: 'Причастие',
        value: 'Причастие'
      },
      {
        label: 'Разделительный союз',
        value: 'Разделительный союз'
      },
      {
        label: 'Собирательное существительное',
        value: 'Собирательное существительное'
      },
      {
        label: 'Соединительный союз',
        value: 'Соединительный союз'
      },
      {
        label: 'Указательное местоимение',
        value: 'Указательное местоимение'
      },
      {
        label: 'Число',
        value: 'Число'
      },
      {
        label: 'Усилительная частица',
        value: 'Усилительная частица'
      },
      {
        label: 'Утвердительная частица',
        value: 'Утвердительная частица'
      }
    ];

    const grammarOptions = [
      { label: 'Выберите грамматику слова', value: 0 },
      { label: 'Имя действия', value: 'Имя действия' },
      { label: 'Лицо глагола', value: 'Лицо глагола' },
      { label: 'Взаимный залог', value: 'Взаимный залог' },
      { label: 'Возвратный залог', value: 'Возвратный залог' },
      { label: 'Грамматика', value: 'Грамматика' },
      { label: 'Дательный падеж', value: 'Дательный падеж' },
      { label: 'Деепречастие', value: 'Деепречастие' },
      { label: 'Единственное число', value: 'Единственное число' },
      { label: 'Множественное число', value: 'Множественное число' },
      { label: 'Многократный вид глагола', value: 'Многократный вид глагола' },
      { label: 'Однократный вид глагола', value: 'Однократный вид глагола' },
      { label: 'Направительный падеж', value: 'Направительный падеж' },
      { label: 'Сравнительная степень', value: 'Сравнительная степень' },
      { label: 'Страдательный залог', value: 'Страдательный залог' },
      { label: 'Родительный падеж', value: 'Родительный падеж' },
      { label: 'Уменьшительная форма', value: 'Уменьшительная форма' }
    ];
    return (
      <div className="add-word">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/my-words" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Word</h1>
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
                <TextFieldGroup
                  placeholder=""
                  info="Введите пример предложения на уйгурском"
                  name="example"
                  value={this.state.example}
                  onChange={this.onChange}
                  error={errors.example}
                />
                <TextFieldGroup
                  placeholder=""
                  info="Введите перевод примерного предложения на русском"
                  name="exampleTranslation"
                  value={this.state.exampleTranslation}
                  onChange={this.onChange}
                  error={errors.exampleTranslation}
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

EditWord.propTypes = {
  getWordByID: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  words: state.words,
  word: state.word
});

export default connect(
  mapStateToProps,
  { getWordByID }
)(withRouter(EditWord));
