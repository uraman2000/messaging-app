import clsx from "clsx"
import React from "react"

export default function Bubble({ isUser, message }) {
  return (
    <div
      className={clsx(
        isUser ? "bg-green-500 self-end" : "bg-blue-500",
        " w-fit p-4 rounded-full text-white"
      )}
    >
      {message}
    </div>
  )
}
