import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import AuthComponent from '../../components/common/AuthComponent'
import { reviewerLogin, reviewerSignup } from '../../utils/api/reviewerApi'
import {actions, deauthenticateUser} from '../../redux/authSlice'

function Auth() {
  const [errorEncountered, setError] = useState('')
  const [verificationState, setVerificationState] = useState(true)
  const dispatch = useDispatch()

  async function handleLogin(e) {
    e.preventDefault()
    const email = e.target[0].value
    const pass = e.target[1].value
  
    // console.log(email, pass)
    const response = await reviewerLogin(email, pass)
    
    if(response.error){
      console.log(response.error)
      return setError(response.error)
    }
    if(response.message == 'Email sent successfully'){
      return setVerificationState(false)
    }
    // console.log(response.client, response.token)
    console.log(response)
    dispatch(actions.setReviewerToken(response.token))
    localStorage.setItem(process.env.REACT_APP_REVIEWER_TOKEN_KEY, response.token)
    localStorage.setItem('user',JSON.stringify(response.reviewer))
  }
  async function handleSignup(e){
    e.preventDefault()
    const fullname = e.target[0].value
    const email = e.target[1].value
    const mobile = e.target[2].value
    const address = e.target[3].value
    const pass = e.target[4].value
    const confirmPass = e.target[5].value

    if(pass != confirmPass){
      return setError("Password doesn't match")
    }
    const response = await reviewerSignup(fullname, email, pass, mobile, address)
    console.log(response)

    if(response.error){
      console.log(response.error)
      return setError(response.error)
    }
    if(response.message = 'Email sent successfully')
      return setVerificationState(false)
  }
  return (<AuthComponent
    handleLogin={handleLogin}
    handleSignup={handleSignup}
    errorEncountered={errorEncountered}
    setError={setError}
    userType='reviewer'
    verificationState={verificationState}
  />
  )
}

export default Auth