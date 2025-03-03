"use client";
import ToggleAuth from './toggle'
import { motion as m, AnimatePresence } from "motion/react"
import "./page.css"

export default function LoginPage() {

  return (
    <AnimatePresence mode='wait'>
      <m.div
        key="login-page"
        className='login-page'
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ 
          duration: 0.25, 
          type: "linear"
      }}
      >
        <ToggleAuth />
      </m.div>
    </AnimatePresence>
  )
}