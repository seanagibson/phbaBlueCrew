import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignupForm from '../forms/SignupForm';
import { signup } from '../../actions/users';
import isEmail from 'validator/lib/isEmail';

class SignupPage extends React.Component {
  state = {
    data: {
      email: '',
      password: '',
    },
    loading: false,
    errors: {},
  };

  handleOnChange = e => {
    this.setState({ ...this.state, data: { ...this.state.data, [e.target.name]: e.target.value } });
  };

  submit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .signup(this.state.data)
        .then(res => this.setState({ data: { password: '' } }))
        .catch(err => {
          const { global } = err.response.data.errors;
          this.setState({
            loading: false,
            errors: {
              ...this.state.errors,
              global,
            },
          });
        });
    }
  };

  validate = data => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = 'Invalid email';
    if (!data.password) errors.password = 'Password Cannot be blank';
    return errors;
  };

  render() {
    return (
      <div>
        <h1>Register with the Blue Crew</h1>
        <SignupForm
          data={this.state.data}
          errors={this.state.errors}
          loading={this.state.loading}
          handleOnChange={this.handleOnChange}
          submit={this.submit}
        />
      </div>
    );
  }
}

SignupPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  signup: PropTypes.func.isRequired,
};

export default connect(null, { signup })(SignupPage);
