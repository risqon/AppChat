import React from 'react';
import ChatItem from './ChatItem'

export default function ChatList(props) {
    const nodeChat = props.chats.map((item, index) =>
        <ChatItem
            key={index}
            id={item.id}
            name={item.name}
            message={item.message}
            sent={item.sent}
            time={item.time}
            resend={() => props.resend(item.id, item.name, item.message)}
            remove={() => props.remove(item.id)} />)
    return (
            <div>{nodeChat}</div>
    )
}