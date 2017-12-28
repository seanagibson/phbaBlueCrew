import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class SignupForm extends React.Component {
  render() {
    const { data, errors, loading, handleOnChange, submit } = this.props;

    return (
      <Form onSubmit={submit} loading={loading}>
        {errors.global && (
          <Message negative>
            <Message.Header> Oops! Something is wrong. </Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email address"
            value={data.email}
            onChange={handleOnChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>

        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            value={data.password}
            onChange={handleOnChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>

        <Button primary>Register</Button>
      </Form>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default SignupForm;
