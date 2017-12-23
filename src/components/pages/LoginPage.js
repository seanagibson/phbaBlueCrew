import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoginForm from "../forms/LoginForm";
import { login } from "../../actions/auth";

class LoginPage extends React.Component {

	submit = data =>
		this.props.login(data).then((response) => {
			if(response.status === 200) {
				window.localStorage.setItem('bluecrewStorage', response.token)
				this.props.history.push("/dashboard");
			}
//			else
		});

	render() {
		return (
			<div>
				<h1>Login Page</h1>

				<LoginForm submit={this.submit} />
			</div>
		);
	}
}


LoginPage.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	login: PropTypes.func.isRequired
};

export default connect(null, {login})(LoginPage);
