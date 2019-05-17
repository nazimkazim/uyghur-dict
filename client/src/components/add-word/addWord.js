import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AddWord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ugrWordCyr: '',
      rusTranslation: '',
      example: '',
      exampleTranslation: '',
      origin: '',
      sphere: '',
      lexis: '',
      grammar: '',
      partOfSpeech: '',
      style: '',
      errors: {}
    };
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
      { label: 'Взаимный залог', value: 'Взаимный залог' },
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
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Word</h1>
              <form /* onSubmit={onSubmit} */>
                <TextFieldGroup
                  placeholder="Бала"
                  info="Введите слово на уйгурском"
                  name="ugrWordCyr"
                  value={this.state.ugrWordCyr}
                  //onChange={onChange}
                  error={errors.ugrWordCyr}
                />
                <TextFieldGroup
                  placeholder="Ребенок"
                  info="Введите слово на русском"
                  name="rusTranslation"
                  value={this.state.rusTranslation}
                  //onChange={onChange}
                  error={errors.rusTranslation}
                />
                <TextFieldGroup
                  placeholder=""
                  info="Введите пример предложения на уйгурском"
                  name="example"
                  value={this.state.example}
                  //onChange={onChange}
                  error={errors.example}
                />
                <TextFieldGroup
                  placeholder=""
                  info="Введите перевод примерного предложения на русском"
                  name="exampleTranslation"
                  value={this.state.exampleTranslation}
                  //onChange={onChange}
                  error={errors.exampleTranslation}
                />
                <h6>Происхождение слова</h6>
                <SelectListGroup
                  placeholder="Male"
                  name="gender"
                  value={this.state.gender}
                  //onChange={this.onChange}
                  error={errors.gender}
                  options={originOptions}
                />
                <h6>Сфера употребления слова</h6>
                <SelectListGroup
                  placeholder="Male"
                  name="gender"
                  value={this.state.gender}
                  //onChange={this.onChange}
                  error={errors.gender}
                  options={sphereOptions}
                />
                <h6>Лексика слова</h6>
                <SelectListGroup
                  placeholder=""
                  name="lexis"
                  value={this.state.lexis}
                  //onChange={this.onChange}
                  error={errors.lexis}
                  options={lexisOptions}
                />
                <h6>Стиль слова</h6>
                <SelectListGroup
                  placeholder=""
                  name="lexis"
                  value={this.state.style}
                  //onChange={this.onChange}
                  error={errors.style}
                  options={styleOptions}
                />
                <h6>Часть речи</h6>
                <SelectListGroup
                  placeholder=""
                  name="lexis"
                  value={this.state.partOfSpeech}
                  //onChange={this.onChange}
                  error={errors.partOfSpeech}
                  options={partOfSpeechOptions}
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
  profile: PropTypes.object.isRequired,
  erorrs: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(withRouter(AddWord));
