import { useEffect, useRef, useState } from "react"
import Bubble from "./components/Bubble"
import useChat from "./customHook/useChat"
import EnterUser from "./components/EnterUser"
import Button from "./components/Button"

export default function App() {
  const {
    chat,
    message,
    setMessage,
    userName,
    setUserName,
    sendMessage,
    chatBoxRef,
  } = useChat("/chat")
  return (
    <>
      {!userName && <EnterUser setUserName={e => setUserName(e)} />}
      <div className="p-2  flex justify-center h-screen overflow-y-hidden">
        <div className="border w-3/4 h-3/4 shadow-md">
          <div
            ref={chatBoxRef}
            className="border-b h-3/4 flex-col flex gap-2 p-4 overflow-y-scroll"
          >
            {chat.map((msg, index) => {
              const { user, message } = JSON.parse(msg)
              return (
                <Bubble
                  key={index}
                  isUser={user == userName}
                  message={message}
                />
              )
            })}
          </div>

          <div className="h-full flex ">
            <textarea
              className=" p-4  h-1/4 w-11/12 z-10 resize-none"
              type="text"
              placeholder="Enter Message"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <Button onClick={sendMessage} title={"Send"} />
          </div>
        </div>
      </div>
    </>
  )
}
