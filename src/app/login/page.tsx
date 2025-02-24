import { login, signup } from './actions'
import { motion as m } from "motion/react"
import "./form.css"

export default function LoginPage() {
  return (
    <div className='form-container'>
      <form>
        <input id="email" name="email" type="email" placeholder='Your Email' required />
        <input id="password" name="password" type="password" placeholder='Your Password' required />
        <button formAction={login}>Log in</button>
        <button formAction={signup}>Sign up</button>
      </form>
    </div>
  )
}