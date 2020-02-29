import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';

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
            placeholder="www.facebook.com/nzmai"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="www.vk.com/nazim"
            name="vk"
            icon="fab fa-vk"
            value={this.state.vk}
            onChange={this.onChange}
            error={errors.vk}
          />
          <InputGroup
            placeholder="www.instagram.com/nzmai"
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
      { label: 'Gender', value: 0 },
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create your profile</h1>
              <p className="lead text-center">
                Let us know more about you
              </p>
              <small className="d-block pb-3">* = required</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="Write a unique name or nickname"
                />
                <TextFieldGroup
                  placeholder="Kazakhstan"
                  name="country"
                  value={this.state.country}
                  onChange={this.onChange}
                  error={errors.country}
                />
                <TextFieldGroup
                  placeholder="Almaty"
                  name="city"
                  value={this.state.city}
                  onChange={this.onChange}
                  error={errors.city}
                />
                <TextFieldGroup
                  placeholder="Kazakh National University"
                  value={this.state.education}
                  onChange={this.onChange}
                  error={errors.education}
                />
                <TextFieldGroup
                  placeholder="Kazakh, Uyghur, Russian"
                  name="languages"
                  value={this.state.languages}
                  onChange={this.onChange}
                  error={errors.languages}
                  info="Comma separated values (e.g. Казахский, Узбекский, Уйгурский, Русский )"
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
                  placeholder="Short bio"
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
                    Add social media
                  </button>
                  <span className="text-muted">Optional</span>
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
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
