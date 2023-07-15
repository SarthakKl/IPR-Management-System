import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import AuthComponent from '../../components/common/AuthComponent'
import {actions, deauthenticateUser} from '../../redux/authSlice'
import { adminLogin, adminSignup } from '../../utils/api/adminApi'
import CustomSpinner from '../../components/common/CustomSpinner'

function Auth() {
  const [errorEncountered, setError] = useState('')
  const [loading, setLoadingState] = useState(false)
  // const [verificationState, setVerificationState] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const dispatch = useDispatch()

  async function handleLogin(e) {
    e.preventDefault()
    const email = e.target[0].value
    const pass = e.target[1].value
  
    // console.log(email, pass)
    setLoadingState(true)
    const response = await adminLogin(email, pass)
    setLoadingState(false)
    
    if(response.error){
      console.log(response.error)
      return setError(response.error)
    }
    // console.log(response)
    if(response.message === 'Email sent successfully'){
      return setSuccessMessage('Email sent successfully. You can close this window')
    }
    // console.log(response.client, response.token)
    console.log(response)
    dispatch(actions.setAdminToken(response.token))
    dispatch(actions.setUserName(response.admin.fullname))
    localStorage.setItem('ADMIN_TOKEN', response.token)
    localStorage.setItem('ADMIN_NAME',JSON.stringify(response.admin.fullname))
  }
  async function handleSignup(e){
    e.preventDefault()
    console.log(e)
    const fullname = e.target[0].value
    const email = e.target[1].value
    const mobile = e.target[2].value
    const address = e.target[3].value
    const pass = e.target[4].value
    const confirmPass = e.target[5].value

    if(pass !== confirmPass){
      return setError("Password doesn't match")
    }
    const response = await adminSignup(fullname, email, pass, mobile, address)
    console.log(response)

    if(response.error){
      console.log(response.error)
      return setError(response.error)
    }
    if(response.message === 'Email sent successfully')
      return setSuccessMessage(false)
  }
  return (
    <div>
      <CustomSpinner classname = {loading?'spinner-div':'spinner-div-hidden'}/>
      <AuthComponent
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        errorEncountered={errorEncountered}
        setError={setError}
        userType='admin'
        successMessage = {successMessage}
        setSuccessMessage={setSuccessMessage}
      />
    </div>
  )
}

export default Auth