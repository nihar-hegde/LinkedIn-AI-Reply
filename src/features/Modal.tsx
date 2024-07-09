import InsertIcon from "assets/Insert.svg"
import RegenerateIcon from "assets/Regenerate.svg"
import VectorIcon from "assets/Vector.svg"
import React, { useState } from "react"

interface IPrompts {
  role: string
  message: string
}

const Modal = ({
  open,
  handleClose
}: {
  open: boolean
  handleClose: () => void
}) => {
  const [prompts, setPrompts] = useState<IPrompts[]>([])
  const [userPrompt, setUserPrompt] = useState<string>("")

  // method to update states and render div accordingly
  const handleGenerate = () => {
    if (userPrompt && userPrompt?.length > 0) {
      const data = [
        {
          role: "user",
          message: userPrompt
        },
        {
          role: "system",
          message:
            "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
        }
      ]
      setPrompts((prev) => [...prev, ...data])
    }
    setUserPrompt("")
  }

  // method to add the AI response in a textbox
  const handleInsert = () => {
    const placeHolder = document.querySelector(".msg-form__placeholder")
    placeHolder?.remove()
    const textBox = document.querySelector(".msg-form__contenteditable")
    if (textBox) {
      textBox.textContent = prompts[prompts.length - 1]?.message

      const range = document.createRange()
      range.selectNodeContents(textBox)
      range.collapse(false)
      const selection = window.getSelection()
      if (selection) {
        selection.removeAllRanges()
        selection.addRange(range)
      }
    }

    const sendButton = document.querySelector(".msg-form__send-button")
    if (sendButton) {
      // @ts-ignore
      sendButton.disabled = false
    }

    setUserPrompt("")
    setPrompts([])
    handleClose()
  }

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75 ${open ? "block" : "hidden"}`}
      onClick={handleOutsideClick}>
      <div className="bg-white p-6 space-y-4 rounded-lg shadow-lg w-[550px] min-h-42 flex flex-col">
        {prompts &&
          prompts.length > 0 &&
          prompts.map((prompt, index) => (
            <div
              key={index}
              className={`max-w-max  ${prompt.role === "user" ? "self-end" : "self-start"} text-2xl font-normal text-gray-700 ${prompt.role === "user" ? "bg-gray-200" : "bg-blue-100"} p-2 px-4 mb-2 rounded-lg`}>
              {prompt.message}
            </div>
          ))}
        <input
          type="text"
          placeholder="Your prompt"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          className="border text-2xl w-full border-gray-300 p-2 rounded-md mb-2 h-12"
        />

        {prompts && prompts.length === 0 ? (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleGenerate}
              className="flex text-2xl items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
              <img src={VectorIcon} alt="icon" className="w-6 h-6 mr-2" />
              <span>Generate</span>
            </button>
          </div>
        ) : (
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleInsert}
              className="flex text-2xl items-center justify-center text-gray-700 border-2 border-gray-700 px-4 py-2 rounded cursor-pointer">
              <img src={InsertIcon} alt="icon" className="w-6 h-6 mr-2" />
              <span>Insert</span>
            </button>
            <button
              type="button"
              className="flex text-2xl items-center justify-center bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
              <img src={RegenerateIcon} alt="icon" className="w-6 h-6 mr-2" />
              <span>Regenerate</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
