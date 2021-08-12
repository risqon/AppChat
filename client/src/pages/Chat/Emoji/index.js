// import React, { useState } from "react";
// import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";

//   const Emoji = () => {
//   const [chosenEmoji, setChosenEmoji] = useState(null);

//   const onEmojiClick = (event, emojiObject) => {
//     setChosenEmoji(emojiObject);
//   };

//   return (
//     <div>
//       <Picker
//         onEmojiClick={onEmojiClick}
//         disableAutoFocus={true}
//         skinTone={SKIN_TONE_MEDIUM_DARK}
//         groupNames={{ smileys_people: "PEOPLE" }}
//         native
//       />
//       {chosenEmoji && <EmojiData chosenEmoji={chosenEmoji} />}
//     </div>
//   );
// };

// const EmojiData = ({ chosenEmoji }) => (
//   <div>
//      {chosenEmoji.emoji}
//   </div>
// );

// export default Emoji


// import EmojiReact from 'react-emoji-react';
// import React, { Component } from 'react';
// import { render } from 'react-dom';

// const emojis = [

// ];

// export default class ReactingComponent extends Component {
//   constructor() {
//     super();
//     this.state = {
//       emojis
//     };
//   }

//   // onReaction(name) {
//   //   const emojis = this.state.emojis.map(emoji => {
//   //     if (emoji.name === name) {
//   //       emoji.count += 1;
//   //     }
//   //     return emoji;
//   //   });
//   //   this.setState({ emojis });
//   // }

//   onEmojiClick(name) {
//     console.log(name);
//     const emojis = this.state.emojis.concat([{name, count: 1}]);
//     this.setState({ emojis });
//   }

//   render() {
//     return (
//       <EmojiReact 
//         reactions={this.state.emojis} 
//         onEmojiClick={(name) => this.onEmojiClick(name)}
//       />
//     );
//   }
// }
import React, { useState } from "react";
import InputEmoji from "react-input-emoji";

export default function Emoji() {
  const [text, setText] = useState("");

  function handleOnEnter(text) {
    console.log("enter", text);
  }

  return (
    <InputEmoji
    
      value={text}
      onChange={setText}
      cleanOnEnter
      onEnter={handleOnEnter}
      placeholder="Type a message"
    />

  );
}