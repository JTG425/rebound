// signup.tsx
"use client";

import { signup } from '../actions'
import { useState } from "react"
import Incorrect from './incorrect'
import { HashLoader } from 'react-spinners';
import {motion as m} from "motion/react"
import {useForm, SubmitHandler} from "react-hook-form"
import "./page.css"

type AuthInputs = {
  email: string
  password: string
}

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthInputs>()


  const onSubmit: SubmitHandler<AuthInputs> = async (data) => {
    setLoading(true)
    setErrorMessage(null)
    const result = await signup(data)
    console.log(data)
  }

  const buttonVariants = {
    loading: { 
      scale: 0.98, 
    },
    initial: { 
      scale: 1 
    }
  }

  const loadingVariants = {
    loading: { 
      opacity: 1,
      scale: 1, 
    },
    initial: { 
      opacity: 0,
      scale: 0 
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign Up</h2>
      <input 
        id="email" 
        name="email" 
        type="email" 
        placeholder="Your Email" 
        {...register("email", { required: true })}
      />
      {errors.email && <span>This field is required</span>}
      <input 
        id="password" 
        name="password" 
        type="password" 
        placeholder="Your Password"
        {...register("password", { required: true })} 
        />
      {errors.password && <span>This field is required</span>}
      <m.button 
        type="submit"
        disabled={loading}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 1 }}
        initial="initial"
        animate={loading ? "loading" : "initial"}
        variants={buttonVariants}
        >
          <p>Sign Up</p>
          <m.div
            className='loader'
            initial="initial"
            animate={loading ? "loading" : "initial"}
            variants={loadingVariants}
          >
            <HashLoader color="#3aaeed"  size={20} />
          </m.div>
        </m.button>
      { errorMessage && <Incorrect message={errorMessage} /> }
    </form>
  )
}
