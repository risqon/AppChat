import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import ChatBox from '../src/pages/Chat/ChatBox'
import history from './history';




class App extends Component {
	render() {
		return (
			<Router history={history}>
				<Switch>
					<Route exact path="/">
						<Login />
					</Route>
					<Route path="/register">
						<Register />
					</Route>
					<Route path="/chat">
						<ChatBox />
					</Route>
				</Switch>
			</Router>
		);
	}
}

export default App;
