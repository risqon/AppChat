import React from 'react';
import { MdInsertEmoticon } from "react-icons/md";
import { Picker, emojiIndex } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import { addEmoji, toggleEmojiPicker} from './Emoji';

export default class ChatForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            message: '',
            showEmojiPicker: false
        };
        this.addEmoji = addEmoji.bind(this);
        this.toggleEmojiPicker = toggleEmojiPicker.bind(this);
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
        if (this.state.message.trim() === '') return
        this.props.addChat(this.state.name, this.state.message);
        this.setState({ name: '', message: '' })
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
                                    <input type="text" className="form-control type_name" value={this.state.name} onChange={this.handleName} placeholder='Insert Your Name Here' required />
                                    {showEmojiPicker ?
                                        (<Picker
                                            style={{
                                                position: 'absolute',
                                                bottom: '50px',
                                                right: '40px'
                                            }}
                                            onSelect={this.addEmoji}
                                        />)
                                        : null}
                                    <button type="button" className="btn-emoji" onClick={this.toggleEmojiPicker}>
                                        <MdInsertEmoticon size={30}/>
                                    </button>
                                    <ReactTextareaAutocomplete
                                        type="text"
                                        className="form-control type_msg"
                                        value={message}
                                        name="message"
                                        loadingComponent={() => <span>Loading</span>}
                                        onChange={this.handleMessage}
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
