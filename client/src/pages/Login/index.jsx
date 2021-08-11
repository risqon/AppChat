import React, { Component, Fragment } from 'react';
import './Login.css';
import { connect } from 'react-redux';
import { loginUserAPI } from '../../config/redux/action';
import Button from '../../componens/Button';
import history from '../../history';

class Login extends Component {
	state = {
		email: '',
		password: ''
	};

	handleChangeText = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleLoginSubmit = async (e) => {
		e.preventDefault()
		console.log('dari screen login');
		const { email, password } = this.state;
		if (email && password) {
			const body = {
				email,
				password
			};
			try {
				await this.props.loginAPI(body);
				this.setState({
					email: '',
					password: ''
				});
				history.push('/chat');
				alert('login success')

			} catch (error) {
				console.log(error);
			}
		} else {
			if (email || password === 0) {
				console.log('email atau password tidak boleh kosong');
			} else {
				alert('emai atau password tidak boleh kosong');
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
								id="email"
								onChange={this.handleChangeText}
							/>
							<span />
							<label>Email</label>
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
						<Button title="Login" onClick={this.handleLoginSubmit} loading={this.props.isLoading} />
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
	popupProps: state.popup,
	isLoading: state.loading,
	isLogin: state.isLogin
});

const reduxDispatch = (dispatch) => ({
	loginAPI: (body) => dispatch(loginUserAPI(body))
});

export default connect(reduxState, reduxDispatch)(Login);
