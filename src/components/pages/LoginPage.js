import React from 'react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import { connect } from 'react-redux';
import LoginForm from '../forms/LoginForm';
import { login } from '../../actions/auth';

class LoginPage extends React.Component {
  state = {
    data: {
      email: '',
      password: '',
    },
    loading: false,
    errors: {},
  };

  handleOnChange = e => {
    this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } });
  };

  submit = () => {
    const { data } = this.state;
    const errors = this.validate(data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props
        .login(data)
        .then(res => {
          this.setState({ data: { password: '' } });
        })
        .catch(err => {
          const { global } = err.response.data.errors;
          this.setState({ errors: { ...this.state.errors, global } });
        });
    }
  };

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = 'Invalid Email';
    if (!data.password) errors.password = 'Cannot be Blank';
    return errors;
  };

  render() {
    return (
      <div>
        <h1>Login Page</h1>

        <LoginForm
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

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(LoginPage);
