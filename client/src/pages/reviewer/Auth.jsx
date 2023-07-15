import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import AuthComponent from '../../components/common/AuthComponent'
import { reviewerLogin, reviewerSignup } from '../../utils/api/reviewerApi'
import {actions} from '../../redux/authSlice'
import CustomSpinner from '../../components/common/CustomSpinner'

function Auth() {
  const [loading, setLoadingState] = useState(false)
  const [errorEncountered, setError] = useState('')
  // const [verificationState, setVerificationState] = useState('')
  const dispatch = useDispatch()
  const [successMessage, setSuccessMessage] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    const email = e.target[0].value
    const pass = e.target[1].value
  
    console.log(email, pass)
    setLoadingState(true)
    const response = await reviewerLogin(email, pass)
    setLoadingState(false)
    console.log(response)

    if(response.error){
      console.log(response.error)
      return setError(response.error)
    }
    if(response.message === 'Email sent successfully'){
      return setSuccessMessage('Email sent successfully. You can close this window')
    }
    if(response.message === 'Not verified by admin'){
      return setError('Your account is not yet verified by admin. Please contact your administrator')
    }
    // console.log(response.client, response.token)
    console.log(response)

    dispatch(actions.setReviewerToken(response.token))
    dispatch(actions.setUserName(response.reviewer.fullname))
    localStorage.setItem('REVIEWER_TOKEN', response.token)
    localStorage.setItem('REVIWER_NAME',JSON.stringify(response.reviewer.fullname))
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
    setLoadingState(true)
    const response = await reviewerSignup(fullname, email, pass, mobile, address)
    setLoadingState(false)
    console.log(response)

    if(response.error){
      console.log(response.error)
      return setError(response.error)
    }
    if(response.message === 'Email sent successfully'){
      console.log("rerer", response)
      return setSuccessMessage('Email sent successfully. You can close this window')
    }
  }
  return (<div>
      <CustomSpinner classname = {loading?'spinner-div':'spinner-div-hidden'}/>
      <AuthComponent
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        errorEncountered={errorEncountered}
        setError={setError}
        userType='reviewer'
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
      />
  </div>
  )
}

export default Auth