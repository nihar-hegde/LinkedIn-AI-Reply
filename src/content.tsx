import IconLogo from "assets/buttonimage.svg"
import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import { useEffect, useState } from "react"

import Modal from "~features/Modal"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/messaging/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const Content = () => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const textBox = document.querySelector(".msg-form__contenteditable")
      if (textBox) {
        textBox.addEventListener("focus", handleFocus)
        textBox.addEventListener("blur", handleBlur)
        clearInterval(intervalId)
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const handleFocus = () => {
    const textBox = document.querySelector(".msg-form__contenteditable")
    const container = document.createElement("div")
    container.className = "ai-icon"
    container.setAttribute("style", "position:absolute; bottom:0; right:1rem;")
    const imgElement = document.createElement("img")
    imgElement.src = IconLogo
    imgElement.alt = "ai-icon"
    imgElement.setAttribute(
      "style",
      "width: 32px; height: 32px; cursor:pointer;"
    )
    imgElement.addEventListener("click", () => {
      setShowModal(true)
    })
    container.appendChild(imgElement)
    textBox?.appendChild(container)
  }

  // method to unmount AI Icon
  const handleBlur = () => {
    const textBox = document.querySelector(".msg-form__contenteditable")
    const container = textBox?.querySelector(".ai-icon")
    container?.remove()
  }
  const handleCloseModal = () => {
    setShowModal(false)
  }
  return (
    <div>
      <Modal open={showModal} handleClose={handleCloseModal} />
    </div>
  )
}

export default Content
