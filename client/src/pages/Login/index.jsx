import React, { Component, Fragment } from 'react';
import './Login.css';
import Button from '../../componens/Button';
import history from '../../history';
import RequestApi from '../../config/axios';
import Swal from 'sweetalert2'

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: "",
			username: "",
			password: "",
			isLogin: false,
		};
	}

	handleChangeText = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	submit = async (e) => {
		e.preventDefault()
		const { username, password } = this.state
		try {
			const req = {
				method: 'POST',
				url: '/users/login',
				data: {
					data: {
						username,
						password
					},
				}
			}
			const res = await RequestApi(req)
			const token = `${res.data.token}`
			if (res.data.token === null) {
				
				Swal.fire({
					text: "Username or Password wrong!",
					icon: "error",
					timer: 3000,
				});
				this.setState({
					username : "",
					password: ""
				})

			} else {
				localStorage.setItem("Authorization", token);
				localStorage.setItem("username", username)
				Swal.fire({
					icon: "success",
					title: "Login success",
					showConfirmButton: false,
					timer: 1200,
				});
				history.push('/chat')
			}
		} catch (error) {
			console.log(error)
			Swal.fire({
				title: "Something when wrong!",
				text: "Please ask administrator to fix the issue",
				icon: "error",
				timer: 3000,
			});
		}

	}

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
						<Button title="Login" onClick={this.submit} />
						<div className="signup_link">
							Not a member? <a href="/register">SignUp</a>
						</div>
					</form>
				</div>
			</Fragment>
		);
	}
}


export default Login;
