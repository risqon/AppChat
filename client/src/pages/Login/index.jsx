import React, { Component, Fragment } from 'react';
import './Login.css';
import { connect } from 'react-redux';
import { loginUserAPI } from '../../config/redux/action';
import Button from '../../componens/Button';
import history from '../../history';

class Login extends Component {
	state = {
		username: '',
		password: '',
		loading : false,
		isLogin: false
	};

	handleChangeText = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleLoginSubmit = async (e) => {
		e.preventDefault()
		console.log('dari screen login');
		const { username, password } = this.state;
		if (username && password) {
			const body = {
				username,
				password
			};
			try {
				await this.props.loginAPI(body);
				this.setState({
					username: '',
					password: ''
				});
				history.push('/chat')

			} catch (error) {
				console.log(error);
			}
		} else {
			if (username || password === 0) {
				console.log('username atau password tidak boleh kosong');
			} else {
				alert('username atau password tidak boleh kosong');
			}
		}
	};

	render() {
		return (
			<Fragment>
				<div className="center">
					<h1>Login</h1>
					<form>
						<div className="txt_field">
							<input
								className="form-control"
								type="text"
								required
								id="username"
								onChange={this.handleChangeText}
							/>
							<span />
							<label>Username</label>
						</div>
						<div className="txt_field">
							<input
								className="form-control"
								type="password"
								required
								id="password"
								onChange={this.handleChangeText}
							/>
							<span />
							<label>Password</label>
						</div>
						<div className="pass">Forgot Password</div>
						<Button title="Login" onClick={this.handleLoginSubmit} loading={this.props.isLoading} login={this.props.isLogin}/>
						<div className="signup_link">
							Not a member? <a href="/register">SignUp</a>
						</div>
					</form>
				</div>
			</Fragment>
		);
	}
}

const reduxState = (state) => ({
	isLoading: state.loading,
	isLogin: state.isLogin
});

const reduxDispatch = (dispatch) => ({
	loginAPI: (body) => dispatch(loginUserAPI(body))
});

export default connect(reduxState, reduxDispatch)(Login);
