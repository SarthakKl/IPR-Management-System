import React from 'react'
import { useState } from 'react'
import './AuthComponent.scss'
import ClientSignup from '../client/ClientSignup'
import ReviewerSignup from '../reviewer/ReviewerSignup'

function AuthComponent({handleLogin, handleSignup, errorEncountered, setError, userType, verificationState}){
    const [onLoginPage, setPageState] = useState(true)

    const handleNav = () => {
        setError('')
        setPageState(false)
    }
    return (
        <div className='auth-component'>
            {
                onLoginPage && verificationState &&
                <div className='outer-div'>
                    <div>
                        <div className=' auth-title'>Login</div>
                        <form
                            className='auth-form'
                            onSubmit={handleLogin}>
                            <input
                                placeholder='Email'
                                required
                                type='email'
                            />
                            <input
                                placeholder='Password'
                                required
                                type='password'
                            />
                            
                            <button
                                className='auth_btns'
                            >
                                Login
                            </button>
                        </form>
                        <div
                            className = {errorEncountered===''?'error-div-hidden':'error-div-visible'}
                        >
                            {errorEncountered}
                        </div>
                        <div className='auth-msg'>
                            <span className='select-none'>Don't have an account?</span>
                            <span className='nav-auth-btn' onClick={handleNav}>Sign Up</span>
                        </div>
                    </div>
                </div>
            }
            {
                !onLoginPage && userType === 'client' && verificationState &&
                <ClientSignup 
                    handleSignup={handleSignup} 
                    errorEncountered = {errorEncountered}
                    setPageState = {setPageState}
                    setError = {setError}
                />
            }
            {
                !onLoginPage && userType === 'reviewer' && verificationState &&
                <ReviewerSignup 
                    handleSignup={handleSignup} 
                    errorEncountered = {errorEncountered}
                    setPageState = {setPageState}
                    setError = {setError}
                />
            }
            {
                !verificationState &&
                <div className='outer-div'>
                    A verification link has been sent to your email. You can close
                    this window.
                </div>
            }
        </div>
    )
}

export default AuthComponent