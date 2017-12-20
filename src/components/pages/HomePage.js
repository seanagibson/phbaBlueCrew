import React from "react";
import propTypes from 'prop-types';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import * as actions from '../../actions/auth';

const HomePage = ({isAuthenticated, logout}) => (
	<div>
		<h1>Home Page</h1>
		{isAuthenticated ? <button onClick={() => logout()}>Logout</button> : <Link to="/login">Login</Link>}
	</div>
);

HomePage.propTypes = {
	isAuthenticated: propTypes.bool.isRequired,
	logout: propTypes.func.isRequired
};

function mapStateToProps(state) {
	return {
		isAuthenticated: !!state.user.token
	}
}	

export default connect(mapStateToProps, {logou: actions.logout})(HomePage);