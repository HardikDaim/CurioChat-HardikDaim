import React, { useState } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import {
  ChatContainer,
  ConversationHeader,
  VoiceCallButton,
  VideoCallButton,
  InfoButton,
  TypingIndicator,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  SendButton,
} from "@chatscope/chat-ui-kit-react";


// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = {
  //  Explain things like you're talking to a software professional with 5 years of experience.
  role: "system",
  content:
    "Explain things like you're talking to a software professional with 2 years of experience.",
};

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      message:
        "Curio: Greetings! I'm Curio, an AI bot made by Hardik Daim, here to assist and engage in meaningful conversations. How can I help you today?",
      sender: "ChatGPT",
    },
    {
      message:
        "Curio: I can solve anything for you, including coding problems and identifying errors.",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleMessageSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "gpt-3.5-turbo-0613",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };
    const API_KEY = "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";
    const apiEndpoint = "https://api.openai.com/v1/engines/gpt-3.5-turbo/completions";

    
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <ChatContainer
        style={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        <ConversationHeader>
          <Avatar src="/logo.png" />
          <ConversationHeader.Content
            userName="CurioCHAT [BETA]"
            info="AI-Powered ChatApp"
          />

          <ConversationHeader.Actions>
         <a class="group inline-flex hidden sm:block items-center sm:mr-4  justify-center rounded-full sm:py-2 sm:px-4 text-sm font-semibold focus:outline-none border-2 border-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 bg-white-600 text-blue-600 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600"><span>BETA  <span></span></span></a>
            {/* <VoiceCallButton style={{ color: "#3f51b5" }} />
            <VideoCallButton style={{ color: "#3f51b5", marginLeft: "1rem" }} />
            <InfoButton style={{ color: "#3f51b5", marginLeft: "1rem" }} /> */}
            <a class="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600" href="https://hardikdaim.netlify.app" target="_blank"><span>Visit Website  <span></span></span></a>
          </ConversationHeader.Actions>
        </ConversationHeader>

        <MessageList
          style={{
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/black-thread-light.png')",
            /* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
          }}
          scrollBehavior="smooth"
          typingIndicator={
            isTyping ? <TypingIndicator content="Curio is typing" /> : null
          }
        >
          {messages.map((message, i) => (
            <Message key={i} model={message} />
          ))}
        </MessageList>
      </ChatContainer>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "sticky",
          bottom: 0,
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/black-thread-light.png')",
        }}
        className="py-2"
      >
        <MessageInput
          style={{ flex: 1, background: "white", marginLeft: "0.75rem" }}
          placeholder="Type message here"
          onSend={handleMessageSend}
          sendButton={false}
          attachButton={false}
        />

        {/* <input
          
          placeholder="Type message here"
          onSend={handleMessageSend}
          className="block w-full rounded-lg border-0 py-1.5 pl-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ml-3"
        /> */}
        <SendButton
          onSend={handleMessageSend}
          style={{ color: "#0C3276", marginLeft: "10px" }}
        />
      </div>
    </div>
  );
}
