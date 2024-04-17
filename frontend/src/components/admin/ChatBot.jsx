import React, { useState } from 'react';
import '../../App.css'; // Import your CSS file

const Chatbot = () => {
  const [chatMessages, setChatMessages] = useState([]);

  const sendMessage = async () => {
    const inputText = document.getElementById("input").value;
    if (!inputText) return;

    setChatMessages(prevMessages => [...prevMessages, { text: inputText, isUser: true }]); // Add user's message to chat
    document.getElementById("input").value = '';

    try {
      const res = await fetch('http://localhost:3000/api/v1/chat', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({ question: inputText }),
      });

      const data = await res.json();
      if (data.message) {
        setChatMessages(prevMessages => [...prevMessages, { text: data.message, isUser: false }]); // Add bot's response to chat
      }
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

//   return (
//     <div>
//       <div id="chat-area">
//         {chatMessages.map((message, index) => (
//           <div key={index} className={`box ${message.isUser ? '' : 'answer'}`}>
//             {message.text}
//           </div>
//         ))}
//       </div>
//       <div className="submit-form">
//         <div className="input">
//           <textarea id="input" cols="40" rows="3"></textarea>
//           <button onClick={sendMessage}>Submit</button>
//         </div>
//       </div>
//     </div>
//   );
// };

return (
  <div className="chat-container">
    <div className="chat-header">
      <div className="avatar_chat">
            <img src="/images/Chatbot.png" alt="avatar" />
      </div>
      AI Assistant Bonita
    </div>
    <div className="chat-area">
      {chatMessages.map((message, index) => (
        <div key={index} className={`message ${message.isUser ? '' : 'answer'}`}>
          {message.text}
        </div>
      ))}
    </div>
    <div className="input-area">
      <textarea id="input" cols="40" rows="3" placeholder="Enter your question..."></textarea>
      <button onClick={sendMessage} >
           <i className="fa fa-paper-plane"></i>
       </button>
    </div>
  </div>
);
};

export default Chatbot;
