import React, { useEffect } from 'react'
import { useState } from 'react'
import './AuthComponent.scss'
import ClientSignup from '../client/ClientSignup'
import ReviewerSignup from '../reviewer/ReviewerSignup'
import AdminSignup from '../admin/AdminSignup'
import logo from '../../assets/logo.png'
import { toast } from 'react-toastify'

function AuthComponent({handleLogin, handleSignup, errorEncountered, setError, userType, successMessage, setSuccessMessage}){
    const [onLoginPage, setPageState] = useState(true)

    const notify = (msg) => toast.error(msg, {
        position: "top-right",  
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const notifySuccess = (msg) => toast.success(msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
    const handleNav = () => {
        setError('')
        setPageState(false)
    }
    useEffect(() => {
        if(successMessage){
            notifySuccess(successMessage)
            setSuccessMessage('')
        }
    }, [successMessage])
    useEffect(() => {
        if(errorEncountered){
            notify(errorEncountered)
            setError('')
        }
    }, [errorEncountered])
    return (
        <div className='auth_page'>
            {
                onLoginPage  &&
                <div className='login_component'>
                    <div className="left_div">
                        <div className='logo'>
                            <h4><span>Invent</span>Assure</h4>
                        </div>
                        <div className="text_message">
                            <h2>Welcome Back,</h2>
                            <p>We are here to help you in your own business</p>
                        </div>
                        <img src="https://cdn.dribbble.com/users/902228/screenshots/14327668/media/57d86248b897feea562f8e2fe46bf7b2.jpg?compress=1&resize=1000x750&vertical=top" alt="" />
                    </div>
                    <div className='right_div'>
                        <form
                            className=''
                            onSubmit={handleLogin}
                        >   
                            {/* <h4 className='logo'><span>Invent</span>Assure</h4>   */}
                            {/* <img src={logo} className='logo' alt="" /> */}
                            <div className='main'>
                                <div className="welcome_text">
                                    <h3>{userType} Login</h3>
                                    <p>
                                        Secure Your Intellectual Property
                                    </p>    
                                </div>
                                
                                <div className='inputs'>
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
                                    <div className="remember_me">
                                        <span>Remember me</span>
                                        <input type="checkbox" />
                                    </div>
                                    <button
                                        className='auth_btns'
                                    >
                                        Login
                                    </button>
                                    {
                                        userType !== 'admin' &&
                                        <div className='auth-msg'>
                                            <span className='select-none'>Don't have an account?</span>
                                            <span className='nav-auth-btn' onClick={handleNav}> Sign Up</span>
                                        </div>       
                                    }
                                    <p style={{marginTop: "30px",textAlign:"center"}}>-Or-</p>
                                    <div className="other_login">
                                        <div>
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png" alt="" />
                                        </div>
                                        <div>
                                            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }
            {
                !onLoginPage && userType === 'client' &&
                <ClientSignup 
                    handleSignup={handleSignup} 
                    errorEncountered = {errorEncountered}
                    setPageState = {setPageState}
                    setError = {setError}
                />
            }
            {
                !onLoginPage && userType === 'reviewer' &&
                <ReviewerSignup 
                    handleSignup={handleSignup} 
                    errorEncountered = {errorEncountered}
                    setPageState = {setPageState}
                    setError = {setError}
                />
            }
            {
                !onLoginPage && userType === 'admin' &&
                <AdminSignup 
                    handleSignup={handleSignup} 
                    errorEncountered = {errorEncountered}
                    setPageState = {setPageState}
                    setError = {setError}
                />
            }
        </div>
    )
}

export default AuthComponent