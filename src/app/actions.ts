'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '../../utils/supabase/server'

type AuthInputs = {
    email: string
    password: string
}
  

// Login With Supabase
export async function login(formData: AuthInputs) {
  const supabase = await createClient()
  const email = formData.email
  const password = formData.password
  const data = { email, password }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}


// Sign up With Supabase
export async function signup(formData: AuthInputs) {
  const supabase = await createClient()

  const data = {
    email: formData.email,
    password: formData.password
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/confirm')
}


// Fetch User Data
export async function fetchUserData() {
    const supabase = await createClient()
    const { data, error } = await supabase.from('ReboundUserData').select('*') 
    if (error) {
        throw error
    } 
    return data
}


// Add User Task
export async function addUserTask(task: string) {
    const supabase = await createClient()
    const { data, error } = await supabase.from('ReboundUserData').upsert({ tasks: task }) 
    if (error) {
        throw error
    } 
    return data
}