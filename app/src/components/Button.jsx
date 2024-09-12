import clsx from "clsx"
import React from "react"

export default function Button({ onClick, title, isFull, className }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        className,
        isFull ? "w-full" : "w-4/12 md:w-1/12",
        "bg-green-500 h-1/4  rounded-md hover:bg-green-600 text-white"
      )}
    >
      {title}
    </button>
  )
}
