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

    const location = props.user.county[0] + "," + props.user.county[1];

    const [messages, setMessages] = useState<any>([
        {
          message: "Hello, I'm ChatGPT! Ask me anything!",
          sentTime: "just now",
          sender: "ChatGPT",
        },
      ]);

      const [isTyping, setIsTyping] = useState(false);

      const handleSendRequest = async (message: any) => {
        const newMessage:any = {
          message,
          direction: 'outgoing',
          sender: "me",
          position: 'normal'
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
              direction: 'incoming',
              position: 'normal'
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
        handleSendRequest("What's there for a " + props.user.age[0].toLowerCase() + " old to do in " + props.user.county[0] + ", " + props.user.county[1] + "?")
      }

    return (
        <div id='results' className="flex flex-col gap-8 sm:w-11/12 lg:w-9/12 justify-center items-center card shadow-md rounded-3xl p-16'">
        {
            <>
                <div className='card-body'>
                    <div className='card-title flex sm:flex-col lg:flex-row justify-between'>
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

                                {messages.map((message:any, i:any) => {
                                    return (
                                        <Message
                                            key={i}
                                            model={message}
                                            avatarPosition={message.sender === "ChatGPT" ? "tl" : "tr"}
                                        >
                                            <Avatar src={message.sender === "ChatGPT" ? "ChatGPT_logo.svg.png" : "icon.svg"} name="icon" />
                                            <Message.Footer sender={message.sender === "ChatGPT" ? "ChatGPT" : props.user.name} sentTime="just now" />
                                        </Message>
                                    )
                                })}
                            </MessageList>
                            <MessageInput placeholder={"Ask me something about " + location} onSend={handleSendRequest} />
                        </ChatContainer>
                    </MainContainer>
                        <div id="buttons" className='flex flex-col gap-2'>
                            <button
                                className='bg-primary text-white p-2 shadow-sm rounded-lg'
                                onClick={() => handleSendRequest("Which country has the same population as " + location + "?" )}
                            >
                                Which country has the same population as {location}?
                            </button>
                            <button
                                className='bg-primary text-white p-2 shadow-sm rounded-lg'
                                onClick={() => handleSendRequest("Is " + location + " a nice place to live?" )}
                            >
                                Is {location} a nice place to live?
                            </button>
                            <button
                                className='bg-primary text-white p-2 shadow-sm rounded-lg'
                                onClick={() => handleSendRequest("What else can you tell me about " + location + "?" )}
                            >
                                What else can you tell me about {location}?
                            </button>
                        </div>
                </div>
            </>
          }
      </div>
    )
}