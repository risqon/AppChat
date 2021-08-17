import React from 'react';
import ReactMarkdown from 'react-markdown'

export default function ChatItem(props) {
    return (
        <div className='d-flex mb-4 ml-5'>
            <div className="img_cont_msg">
                <p className="rounded-circle user_img_msg">^_^</p>
            </div>
            <div className='boks'>
                <h6 className='name'>{props.username}</h6>
                <div className="msg_cotainer">
                    <div> <ReactMarkdown
                        source={props.message}
                        escapeHtml={false}
                    /> </div>
                </div>
                <div className='row'>
                    <span className="msg_time">{props.time}</span>
                    {props.sent && <button className='btn btn danger' onClick={props.remove}><i className='cg-cl-del fas fa-trash-alt fa-xs'></i></button>}
                </div>
                <div className='row'>
                </div>
                {!props.sent &&
                    <div className="btn_resend">
                        <button className="btn btn-outline-success btn-sm circle"
                            onClick={() => props.resend(props.message)}>
                            <i className="fas fa-redo-alt"></i>
                        </button>
                        <p className='spinner'>network failed</p>
                    </div>}
            </div>
        </div>
    )
}