import axios from 'axios'
//import { RequestApi } from '../../axios'


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
                value: true
            })
            const req = {
                method: 'POST',
                url: 'http://localhost:3001/api/users/register',
                data: {
                    email: body.email.toLowerCase(),
                    password: body.password,
                    retypepassword: body.retypepassword,
                },
            }
            console.log('INI REQ', req)
            const res = await axios(req)
            console.log(res)
            return res
        } catch (err) {
            console.log(err.res, 'erroroooo')
            dispatch({
                type: 'SET_ERRORS_KEY',
                errors: err.response.data.errors,
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
    console.log(body, 'DATA action')
    return async (dispatch) => {
        try {
            dispatch({
                type: 'SET_LOADING_KEY',
                value: true
            })
            const req = {
                method: 'POST',
                url: 'http://localhost:3001/api/users/login',
                data: {
                    email: body.email,
                    password: body.password,
                },
            }
            console.log('INI REQ', req)
            const res = await axios(req)
            console.log(res, 'Login success')
            dispatch({
                type: 'ADD.ACCESS_TOKEN',
                access_token: `Bearer ${res.data.access_token}`,
                isLogin: true
            })
            return res
        } catch (err) {
            console.log(err.res, 'erroroooo')
            dispatch({
                type: 'SET_ERRORS_KEY',
                errors: err.response.data.errors,
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

// export const loginUserAPI = (email, password) => (dispatch) => {
//     console.log(email, password)

//     return new Promise((resolve, reject) => {
//         axios.post('http://localhost:3001/api/users/login', { email, password })
//             .then((res) => {
//                 console.log('success:', res);
//                 const userData = {
//                     email: res.data.data.email,
//                     token: res.data.token
//                 }
//                 dispatch({ type: "CHANGE_ISLOGIN", value: true })
//                 // dispatch({ type: "CHANGE_USER", value: userData })
//                 resolve(true)
//             }).catch((error) => {
//                 console.log('email:', error);
//                 dispatch({ type: "CHANGE_ISLOGIN", value: false })
//                 reject(false)
//             })
//     })

// }