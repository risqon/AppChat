const initialState = {
	popup: false,
	isLogin: false,
	loading: false,
	user: {},
	errors: {},
	access_token: null,
	status: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD.TOKEN_SUBMISSION_REGISTER': 
			return {
				...state,
				token_register: action.token_register,
				status: action.status
			};

		case 'ADD.ACCESS_TOKEN':
			return {
				...state,
				access_token: action.access_token,
				isLogin: action.value
			};

		case 'SET_ERRORS_KEY':
			return {
				...state,
				errors: action.errors,
				status: action.status
			};

		case 'SET_LOADING_KEY':
			return {
				...state,
				loading: action.value
			};
		case 'CLEAR.KEY':
			return initialState
			
		// Default
		default:
			return state;
	}

};

export default reducer