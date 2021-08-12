import { RequestApi } from '../../axios'


export const actionUserName = () => (dispatch) => {
    setTimeout(() => {
        return dispatch({ type: 'CHANGE_USER', value: 'Risqon al akhyar' })
    })
}

export const registerUserAPI = (body) => {
    console.log(body, 'DATA action')
    return async (dispatch) => {
        try {
            dispatch({
                type: 'SET_LOADING_KEY',
                loading: true
            })
            const req = {
                method: 'POST',
                url: '/users/register',
                data: {
                    data: {
                        username: body.username,
                        email: body.email.toLowerCase(),
                        password: body.password,
                        retypepassword: body.retypepassword,
                    }

                }
            }
            console.log('INI REQ', req)
            const res = await RequestApi(req)
            console.log(res)
        } catch (err) {
            console.log(err.res, 'erroroooo')
            dispatch({
                type: 'SET_ERRORS_KEY',
                errors: err.message,
            })
            throw new Error(err)
        } finally {
            dispatch({
                type: 'SET_LOADING_KEY',
                value: false
            })
        }
    }
}

export const loginUserAPI = (body) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: 'SET_LOADING_KEY',
                loading: true
            })
            const req = {
                method: 'POST',
                url: '/users/login',
                data: {
                    data: body
                }
            }
            console.log('INI REQ', req)
            const res = await RequestApi(req)
            console.log(res.data)
            const token = `${res.data.token}`
            await localStorage.setItem('setToken', token)
            dispatch({
                        type: 'ADD.ACCESS_TOKEN',
                        access_token: `Bearer ${res.data.access_token}`,
                        isLogin: true
                    })
            return res
         
        } catch (err) {
            console.log(err, 'erroroooo')
            dispatch({
                type: 'SET_ERRORS_KEY',
                errors: err.errors,
            })
            throw new Error(err)
        } finally {
            dispatch({
                type: 'SET_LOADING_KEY',
                loading: false
            })
        }

    }

}

