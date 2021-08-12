import React from 'react';
import { MdInsertEmoticon } from "react-icons/md";

import Picker from 'emoji-picker-react';

export default class ChatForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', message: '', chosenEmoji: null };

        this.handleName = this.handleName.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleName(event) {
        this.setState({ name: event.target.value });
    }

    handleMessage(event) {
        this.setState({ message: event.target.value });
    }


    handleSubmit(event) {
        event.preventDefault();
        this.props.addChat(this.state.name, this.state.message);
        this.setState({ name: '', message: '' })
    }

    handleEmoji = (event, emojiObject) => {
        this.setState({
            chosenEmoji: ''
        })
    }

    render() {
        return (
            <div className='card-footer'>
                <form onSubmit={this.handleSubmit}>
                    <div className='input-group'>
                        <div className='container'>
                            <div className='form-group row'>

                                <div className="col form">
                                    <input type="text" className="form-control type_name" value={this.state.name} onChange={this.handleName} placeholder='Insert Your Name Here' required />
                                        <Picker onEmojiClick={this.handleEmoji} pickerStyle={{width: '250px', margin: '0px', position: 'absolute'}} />
                                    <div className="emoji">
                                        <MdInsertEmoticon size={30} />
                                    </div>
                                    <input type="text" className="form-control type_msg" value={this.state.message} onChange={this.handleMessage} placeholder='Type a message' />


                                </div>
                                <div className="input-group-append right-form">
                                    <button type="submit" value="Send" className='input-group-text send_btn'><i className="fas fa-location-arrow"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
