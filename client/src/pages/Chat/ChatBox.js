import React, { Component } from 'react';
import ChatForm from './ChatForm';
import ChatList from './ChatList';
import moment from 'moment'
import RequestApi from '../../config/axios';
import io from 'socket.io-client'

const socket = io("http://localhost:3001");
export default class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], loading: false }

    }

    componentDidMount() {
        this.getChat()

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

    getChat = async () => {
        const token = await localStorage.getItem(`setToken`)
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
            console.log('get', res)
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

    addChat = async (name, message) => {
        const id = Date.now()
        const time = moment().format('h:mm a')
        const token = await localStorage.getItem(`setToken`)

        this.setState((state, props) =>
        ({
            data:
                [...state.data,
                {
                    id,
                    name,
                    message,
                    time,
                    sent: true
                }]
        }))

        socket.emit('newChat', {
            id,
            name,
            message
        })

        try {
            const req = {
                method: 'POST',
                url: '/chats',
                data: {
                    data: {
                        id, name, message
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

    resendChat = async (id, name, message) => {
        const token = await localStorage.getItem(`setToken`)

        try {
            const req = {
                method: 'POSH',
                url: '/chats',
                data: {
                    data: {
                        id, name, message
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
        const token = await localStorage.getItem(`setToken`)

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
            if (res) {
                this.setState(state => ({
                    data: state.data.filter(item => item.id !== id)
                }))
            }
            alert('are you sere??')
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
                            <h1 className="text-dark">React Chats</h1>
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