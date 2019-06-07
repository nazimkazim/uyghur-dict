import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';
import { Link } from 'react-router-dom';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: '',
      displaySocialInputs: '',
      country: '',
      city: '',
      languages: '',
      bio: '',
      gender: '',
      education: '',
      vk: '',
      instagram: '',
      facebook: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Bring languages array back to comma separated value
      const languagesCSV = profile.languages.join(',');

      // if profile field does not exist make empty string
      profile.country = !isEmpty(profile.country) ? profile.country : '';
      profile.city = !isEmpty(profile.city) ? profile.city : '';
      profile.education = !isEmpty(profile.education) ? profile.education : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.gender = !isEmpty(profile.gender) ? profile.gender : '';
      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : '';
      profile.vk = !isEmpty(profile.social.vk) ? profile.social.vk : '';
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : '';

      // Set component fields state
      this.setState({
        handle: profile.handle,
        country: profile.country,
        city: profile.city,
        bio: profile.bio,
        gender: profile.gender,
        languages: languagesCSV,
        education: profile.education,
        vk: profile.vk,
        instagram: profile.instagram,
        facebook: profile.facebook
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      country: this.state.country,
      city: this.state.city,
      gender: this.state.gender,
      bio: this.state.bio,
      languages: this.state.languages,
      education: this.state.education,
      vk: this.state.vk,
      instagram: this.state.instagram,
      facebook: this.state.facebook
    };
    this.props.createProfile(profileData, this.props.history);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Вставьте адрес вашего профайла в Facebook"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Вставьте адрес вашего профайла в VK"
            name="vk"
            icon="fab fa-vk"
            value={this.state.vk}
            onChange={this.onChange}
            error={errors.vk}
          />
          <InputGroup
            placeholder="Вставьте адрес вашего профайла в instagram"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    const options = [
      { label: 'Выберите пол', value: 0 },
      { label: 'Мужской', value: 'Мужской' },
      { label: 'Женский', value: 'Женский' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Вернуться назад
              </Link>
              <h1 className="display-4 text-center">Измените свой профайл</h1>
              <small className="d-block pb-3">* = обязательные поля</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Указатель на профайл"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="Напишите уникальный указатель на ваш профайл, это может быть имя или прозвище"
                />
                <TextFieldGroup
                  placeholder="Казахстан, Россия"
                  name="country"
                  value={this.state.country}
                  onChange={this.onChange}
                  error={errors.country}
                />
                <TextFieldGroup
                  placeholder="Алматы, Урумчи"
                  name="city"
                  value={this.state.city}
                  onChange={this.onChange}
                  error={errors.city}
                />
                <TextFieldGroup
                  placeholder="Казахский Национальный Университет"
                  name="education"
                  value={this.state.education}
                  onChange={this.onChange}
                  error={errors.education}
                />
                <TextFieldGroup
                  placeholder="Казахский, Уйгурский, Узбекский, Русский"
                  name="languages"
                  value={this.state.languages}
                  onChange={this.onChange}
                  error={errors.languages}
                  info="Пишите языки через запятую (e.g. Казахский, Узбекский, Уйгурский, Русский )"
                />
                <SelectListGroup
                  placeholder="Мужской"
                  name="gender"
                  value={this.state.gender}
                  onChange={this.onChange}
                  error={errors.gender}
                  options={options}
                />
                <TextAreaFieldGroup
                  placeholder="Короткая биография"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Добавьте ссылки на социальные сети
                  </button>
                  <span className="text-muted">Необязательно</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Отправить"
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

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
