import React, { useState } from 'react'
import AuthComponent from '../../components/common/AuthComponent'
import { clientLogin, clientSignup } from '../../utils/api/clientApi'
import {actions} from '../../redux/authSlice'
import { useDispatch } from 'react-redux'

function Auth() {
  const [errorEncountered, setError] = useState('')
  const [verificationState, setVerificationState] = useState('')
  const dispatch = useDispatch()

  async function handleLogin(e) {
    e.preventDefault()
    const email = e.target[0].value
    const pass = e.target[1].value
  
    // console.log(email, pass)
    const response = await clientLogin(email, pass)
    console.log(response)
    if(response.error){
      console.log(response.error)
      return setError(response.error)
    }
    if(response.message === 'Email sent successfully'){
      return setError('Email sent successfully. You can close this window')
    }
    // console.log(response.client, response.token)
    dispatch(actions.setClientToken(response.token))
    dispatch(actions.setUserName(response.client.fullname)) 
    localStorage.setItem('CLIENT_TOKEN', response.token)
    localStorage.setItem('CLIENT_NAME', response.client.fullname)
  }
  async function handleSignup(e){
    e.preventDefault()
    console.log(e)
    let userCategory
    if(e.target[0].checked)
      userCategory = 'Individual'
    else
      userCategory = 'Organisation'
    const fullname = e.target[2].value
    const email = e.target[3].value
    const contact = e.target[4].value
    const description = userCategory === 'Organisation'?e.target[5].value:'';
    const pass = e.target[userCategory==='Individual'?5:6].value
    const confirmPass = e.target[userCategory==='Individual'?6:7].value

    if(pass !== confirmPass){
      return setError("Password doesn't match")
    }
    const response = await clientSignup({userCategory, fullname, email, contact, pass, description})
    console.log(response)

    if(response.error){
      console.log(response.error)
      return setError(response.error)
    }
    if(response.message === 'successful')
      return setVerificationState(false)
  }
  return (
    <AuthComponent 
      handleLogin = {handleLogin} 
      handleSignup = {handleSignup}
      errorEncountered = {errorEncountered} 
      setError = {setError}
      userType = 'client'
      verificationState = {verificationState}
    />
  )
}

export default Auth