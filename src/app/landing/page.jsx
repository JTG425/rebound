"use client";
import "./page.css"
import { redirect } from 'next/navigation'
import { motion as m } from 'framer-motion'

export default function Landing() {

  const handleNavigation = () => {
    redirect('/login')
  }



  return (
    <div className="page">
      <div className="landing-page-header">
        <h1>Welcome To Rebound</h1>
        <button onClick={handleNavigation}>Get Started</button>
      </div>
    </div>
  );
}
