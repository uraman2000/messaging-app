import { useState, useEffect, useRef } from "react"

// Custom Hook for WebSocket Chat
const useChat = url => {
  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState("")
  const [userName, setUserName] = useState("")
  const [chat, setChat] = useState([])
  const chatBoxRef = useRef(null)

  useEffect(() => {
    // Create WebSocket connection
    const ws = new WebSocket(url)

    ws.onopen = () => {
      console.log("Connected to WebSocket server")
    }

    ws.onmessage = event => {
      let data
      if (typeof event.data === "string") {
        data = event.data
      } else if (event.data instanceof Blob) {
        const reader = new FileReader()
        reader.onload = () => {
          data = reader.result
          setChat(prevChat => [...prevChat, data])
        }
        reader.readAsText(event.data)
      } else {
        data = "Unsupported data type"
      }

      if (typeof data === "string") {
        setChat(prevChat => [...prevChat, data])
      }
    }

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server")
    }

    setSocket(ws)

    // Cleanup on unmount
    return () => {
      ws.close()
    }
  }, [url])

  const sendMessage = () => {
    if (socket && message.trim() && userName.trim()) {
      const formattedMessage = JSON.stringify({ user: userName, message })
      socket.send(formattedMessage)
      setMessage("")
    }
  }

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }
  }, [chat])

  return {
    chat,
    message,
    setMessage,
    userName,
    setUserName,
    sendMessage,
    chatBoxRef,
  }
}

export default useChat
