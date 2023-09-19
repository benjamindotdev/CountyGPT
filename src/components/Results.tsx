import { useState }  from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  Avatar,
} from '@chatscope/chat-ui-kit-react';

const chatGPTKey= import.meta.env.VITE_CHATGPT_API_KEY;

export const Results = (props: any) => {

    const firstMessage = "What's there for a" + props.user.age[0] + " old to do in " + props.user.county[0] + ", " + props.user.county[1] + "?"

    const [messages, setMessages] = useState([
        {
          message: "Hello, I'm ChatGPT! Ask me anything!",
          sentTime: "just now",
          sender: "ChatGPT",
        },
      ]);

      const [isTyping, setIsTyping] = useState(false);

      const handleSendRequest = async (message: any) => {
        const newMessage = {
          message,
          direction: 'outgoing',
          sender: props.user.name,
        };

        setMessages((prevMessages: any) => [...prevMessages, newMessage]);
        setIsTyping(true);

        try {
          const response = await processMessageToChatGPT([...messages, newMessage]);
          const content = response.choices[0]?.message?.content;
          if (content) {
            const chatGPTResponse = {
              message: content,
              sender: "ChatGPT",
            };
            setMessages((prevMessages: any) => [...prevMessages, chatGPTResponse]);
          }
        } catch (error) {
          console.error("Error processing message:", error);
        } finally {
          setIsTyping(false);
        }
      };

      async function processMessageToChatGPT(chatMessages: any) {
        const apiMessages = chatMessages.map((messageObject: any) => {
          const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
          return { role, content: messageObject.message };
        });

        const apiRequestBody = {
          "model": "gpt-3.5-turbo",
          "messages": [
            { role: "system", content: "I'm a Student using ChatGPT for learning" },
            ...apiMessages,
          ],
        };

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + chatGPTKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        });

        return response.json();
      }

      if(messages.length === 1) {
        handleSendRequest("What's there for a" + props.user.age[0] + " old to do in " + props.user.county[0] + ", " + props.user.county[1] + "?")
      }

    return (
        <div id='results' className="flex flex-col gap-8 w-9/12 justify-center items-center card shadow-md rounded-lg p-16'">
        {
            <>
                <div className='card-body'>
                    <div className='card-title flex justify-between'>
                        <h1 className=''>{props.user.name}</h1>
                        <h2 className='text-primary'>{props.user.age[0]}</h2>
                        <h2 className='text-secondary'>{props.user.county[0]}, {props.user.county[1]}</h2>
                    </div>
                    <MainContainer>
                        <ChatContainer>
                            <MessageList
                                scrollBehavior="smooth"
                                typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
                            >

                                {messages.map((message, i) => {
                                    return (
                                        <Message
                                            key={i}
                                            model={message}
                                            avatarPosition={message.sender === "ChatGPT" ? "tl" : "tr"}
                                        >
                                            <Avatar src={message.sender === "ChatGPT" ? "ChatGPT_logo.svg.png" : "icon.svg"} name="Emily" />
                                            <Message.Footer sender={message.sender} sentTime="just now" />
                                        </Message>
                                    )
                                })}
                            </MessageList>
                            <MessageInput placeholder={"What's there for a " + props.user.age[0].toLowerCase() + " to do in " + props.user.county[0] + ", " + props.user.county[1] + "?"} onSend={handleSendRequest} />
                        </ChatContainer>
                    </MainContainer>
                </div>
            </>
          }
      </div>
    )
}