import React, { Component, Fragment } from 'react';
import './Register.css';
import Button from '../../componens/Button';
import history from '../../history';
import RequestApi from '../../config/axios'
import Swal from 'sweetalert2';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			retypepassword: '',
		};
	};

	// componentWillUnmount() {
	// 	this.submit()
	// }

	handleChangeText = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	submit = async (e) => {
		e.preventDefault()
		try {

			const req = {
				method: 'POST',
				url: '/users/register',
				data: {
					data: {
						username: this.state.username,
						email: this.state.email,
						password: this.state.password,
						retypepassword: this.state.retypepassword
					}
				}
			}
			const res = await RequestApi(req)
			if (res)
				Swal.fire({
					icon: "success",
					title: "Registrasi success",
					showConfirmButton: false,
					timer: 1200,
				});
			history.push('/')
		} catch (error) {
			console.log(error.message)
			Swal.fire({
				title: "Something when wrong!",
				text: "Please ask administrator to fix the issue",
				icon: "error",
				timer: 3000,
			});
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
								id="username"
								onChange={this.handleChangeText}
							/>
							<span />
							<label>Username</label>
						</div>
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
						<Button title="Confirm" onClick={this.submit} />
						<div className="signup_link">
							Have an account? <a href="/">Sign</a>
						</div>
					</form>
				</div>
			</Fragment>
		);
	}
}

export default Register;
