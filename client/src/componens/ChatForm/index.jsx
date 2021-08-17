import React from 'react';
import { MdInsertEmoticon } from "react-icons/md";
import { Picker, emojiIndex } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
//import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import { addEmoji, toggleEmojiPicker } from '../method';
//import RequestApi from '../../config/axios';

export default class ChatForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            showEmojiPicker: false,
        };
        this.addEmoji = addEmoji.bind(this);
        this.toggleEmojiPicker = toggleEmojiPicker.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        })
    }

    handleSubmit(event) {
        this.props.addChat(this.state.message);
        this.setState({ message: '' })
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleSubmit()
        }
    }

    render() {
        const {
            showEmojiPicker, message
        } = this.state
        return (
            <div className='card-footer'>
                <form onSubmit={this.handleSubmit}>
                    <div className='input-group'>
                        <div className='container'>
                            <div className='form-group row'>
                                <div className="col form">
                                    {showEmojiPicker ?
                                        (<Picker
                                            style={{
                                                position: 'absolute',
                                                bottom: '50px',
                                                left: '40px'
                                            }}
                                            onSelect={this.addEmoji}
                                        />)
                                        : null}
                                    <div className="emoji-row">
                                        <button type="button" className="btn-emoji" onClick={this.toggleEmojiPicker}>
                                            <MdInsertEmoticon size={30} />
                                        </button>
                                        <input
                                            type="text"
                                            className="form-control type_msg"
                                            value={message}
                                            name="message"
                                            onChange={this.handleChange}
                                            onKeyPress={this.handleKeyPress}
                                            placeholder='Type a message'
                                            trigger={{
                                                ':': {
                                                    dataProvider: token =>
                                                        emojiIndex.search(token).map(o => ({
                                                            colons: o.colons,
                                                            native: o.native,
                                                        })),
                                                    component: ({ entity: { native, colons } }) => (
                                                        <div>{`${colons} ${native}`}</div>
                                                    ),
                                                    output: item => `${item.native}`,
                                                },
                                            }}
                                        />
                                        <div className="input-group-append right-form">
                                            <button type="submit" value="Send" className='input-group-text send_btn'><i className="fas fa-location-arrow"></i></button>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
