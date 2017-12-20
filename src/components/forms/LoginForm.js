import React from 'react';
import PropTypes from "prop-types";
import { Form, Button, Message } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';

class LoginForm extends React.Component {}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default LoginForm;