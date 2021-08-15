import React, { Component } from 'react';
import ChatForm from './ChatForm';
import ChatList from './ChatList';
import moment from 'moment'
import RequestApi from '../../config/axios';
import io from 'socket.io-client'
import Swal from 'sweetalert2';

const socket = io("http://localhost:3001");
export default class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], username: [], dataUser: [], loading: false, isLogin: false }

    }

    componentDidMount() {
        this.getChat()
        this.getUsername()

        socket.on('newChat', (data) => {
            const time = moment().format('h:mm a')
            this.setState((state, props) => ({
                data: [...state.data, { ...data, time, sent: true }]
            }))
        })
        socket.on('delete-frontEnd', (id) => {
            console.log(id)
            this.setState((state, props) => ({
                data: state.data.filter(item => {
                    return item.id !== id.id
                })
            }))
        })
    }

    getUsername = async () => {
        const token = await localStorage.getItem('Authorization')
        try {
            const req = {
                method: 'GET',
                url: '/users/list',
                data: {
                    headers: {
                        'x-access-token': token
                    }
                }
            }
            const res = await RequestApi(req)
            const userName = await localStorage.getItem('username')
            //   console.log('get user', res)
            this.setState({
                username: userName,
                dataUser: res.data
            })
        } catch (error) {
            console.log(error.res)
        }
    }

    getChat = async () => {
        const token = await localStorage.getItem(`Authorization`)
        try {
            this.setState({
                loading: true
            })
            const req = {
                method: 'GET',
                url: '/chats',
                data: {
                    headers: {
                        'x-access-token': token
                    }
                }
            }
            const res = await RequestApi(req)
            const chats = res.data.map(item => {
                item.sent = true
                return item
            })
            // console.log('get', res)
            this.setState({
                data: chats
            })
        } catch (error) {
            console.log(error)
        } finally {
            this.setState({
                loading: false
            })
        }
    }

    addChat = async (message) => {
        const id = Date.now()
        const time = moment().format('h:mm a')
        const token = await localStorage.getItem(`Authorization`)

        this.setState((state, props) =>
        ({
            data:
                [...state.data,
                {
                    id,
                    message,
                    time,
                    sent: true
                }]
        }))

        socket.emit('newChat', {
            id,
            message
        })

        try {
            const req = {
                method: 'POST',
                url: '/chats',
                data: {
                    data: {
                        id, message
                    },
                    headers: {
                        'x-access-token': token
                    }
                }
            }
            const res = await RequestApi(req)
            console.log(res)
        } catch (error) {
            console.log(error)
            this.setState(state => ({
                data: state.data.map(item => {
                    if (item.id === id) {
                        item.sent = false
                    }
                    return item
                })
            }))
        }
    }

    resendChat = async (id, message) => {
        const token = await localStorage.getItem(`Authorization`)

        try {
            const req = {
                method: 'POSH',
                url: '/chats',
                data: {
                    data: {
                        id, message
                    },
                    headers: {
                        'x-access-token': token
                    }
                }
            }
            const res = await RequestApi(req)
            console.log('resend', res)
            this.setState(state => ({
                data: state.res.map(item => {
                    if (item.id === id) {
                        item.sent = true
                    }
                    return item
                })
            }))
        } catch (error) {
            console.log(error)
        }
    }

    removeChat = async (id) => {
        const token = await localStorage.getItem(`Authorization`)
       
        try {
            const req = {
                method: 'DELETE',
                url: `/chats/${id}`,
                data: {

                    headers: {
                        'x-access-token': token
                    }
                }
            }
            socket.emit('delete-backEnd', {
                id
            })
            const res = await RequestApi(req)
            Swal.fire({
                title: 'Are you sure?',
                text: "This message will be deleted !",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#08db93',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No!',
            }).then(res => {
                if (res) {
                    this.setState(state => ({
                        data: state.data.filter(item => item.id !== id)
    
                    }))
                }
                Swal.fire({
                    type: 'success',
                    title: 'chat has been deleted',
                    showConfirmationButton: false,
                 })
            })
            
        } catch (error) {
            console.log(error)
        }
    }


    render() {
        return (
            <div className="container d-flex mx-auto mt-5 col-md-8 col-xl-6 chat">
                <div className="card">
                    <div className="card-header text-center">
                        <div>
                            <h1 className="text-dark">Welcome {this.state.username}</h1>
                        </div>
                    </div>
                    <div className="card-body msg_card_body">
                        <ChatList chats={this.state.data} resend={this.resendChat} remove={this.removeChat} />
                    </div>
                    <ChatForm addChat={this.addChat} />

                </div>
            </div>
        )
    }
}