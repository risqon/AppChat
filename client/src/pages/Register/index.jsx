import React, { Component, Fragment } from 'react';
import './Register.css';
import { connect } from 'react-redux';
import { registerUserAPI } from '../../config/redux';
import Button from '../../componens/Button';
import history from '../../history';

class Register extends Component {
	state = {
		email: '',
		password: '',
		retypepassword: ''
	};

	handleChangeText = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleRegisterSubmit = async (e) => {
		const { email, password, retypepassword } = this.state;
		console.log('dari screen register');
		if (email && password && retypepassword) {
			const body = {
				email,
				password,
				retypepassword
			};
			try {
				await this.props.registerAPI(body);
				this.setState({
					email:'',
					password:'',
					retypepassword:''
				})
				history.push('/')
				alert('Registrasi sukses')
			} catch (error) {
				console.log(error);
			}
		} else {
			if (email || password || retypepassword === 0) {
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
					<h1>Registrasi</h1>
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
						<div className="txt_field">
							<input
								className="form-control"
								type="password"
								required
								id="retypepassword"
								onChange={this.handleChangeText}
							/>
							<span />
							<label>Konfirmasi Password</label>
						</div>
						<Button title="Confirm" onClick={this.handleRegisterSubmit} loading={this.props.isLoading}/>
						<div className="signup_link">
							Have an account? <a href="/">Sign</a>
						</div>
					</form>
				</div>
			</Fragment>
		);
	}
}

const reduxState = (state) => ({
	isLoading: state.loading,

});


const reduxDispatch = (dispatch) => ({
	registerAPI: (body) => dispatch(registerUserAPI(body))
});

export default connect(reduxState, reduxDispatch)(Register);
