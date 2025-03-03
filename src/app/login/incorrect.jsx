// incorrect.jsx
"use client";
import { motion as m } from "motion/react"
import { useEffect, useState } from "react"
import "./page.css"

export default function Incorrect({ message }) {
  const [showPopup, setShowPopup] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <m.div
      className="incorrect"
      initial={{ opacity: 0 }}
      animate={{ opacity: showPopup ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {message || "Incorrect Username or Password"}
    </m.div>
  )
}
