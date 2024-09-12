import React, { useState } from "react"
import Button from "./Button"

export default function EnterUser({ setUserName }) {
  const [state, setState] = useState("")
  return (
    <div className="bg-gray-500 opacity-90 absolute w-screen z-50 h-screen">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white w-3/4 md:w-1/4 h-fit p-4 rounded-md shadow-md flex flex-col gap-2">
          <p>Enter your name</p>
          <input
            type="text"
            className="border rounded-md border-black p-2"
            onChange={e => setState(e.target.value)}
          />
          <Button
            className="p-2"
            isFull
            title={"Send"}
            onClick={() => setUserName(state)}
          />
        </div>
      </div>
    </div>
  )
}
