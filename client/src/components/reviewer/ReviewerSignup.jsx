import React from 'react'
import '../common/AuthComponent.scss'
import logo from '../../assets/logo.png'

function ReviewerSignup({handleSignup, errorEncountered, setPageState, setError}) {
    const handleNav = () => {
        setError('')
        setPageState(true)
    }
  return (
    <div className='auth_page'>
        <div className='login_component'>
            <div className="left_div">
                <div className="text_message">
                    <h2>Welcome Back,</h2>
                    <p>We are here to help you in your own business</p>
                </div>
                <img src="https://cdn.dribbble.com/users/902228/screenshots/14327668/media/57d86248b897feea562f8e2fe46bf7b2.jpg?compress=1&resize=1000x750&vertical=top" alt="" />
            </div>
            <div className="right_div">
                <form
                    onSubmit={handleSignup}
                >
                    <img src={logo} className='logo' alt="" />
                    <div className="main">
                        <div className="welcome_text">
                            <h2>Signup</h2>
                            <p>
                            Secure Your Intellectual Property
                            </p>    
                        </div>
                        <div className="inputs">
                            <input
                                placeholder='Full Name'
                                required
                                type='text'
                            />
                            <input
                                placeholder='Email'
                                required
                                type='email'
                            />
                            <input 
                                placeholder='Mobile Number'
                                required
                                type='text'
                            />
                            <input
                                placeholder='Address'
                                required
                                type='text'
                            />
                            <input
                                placeholder='Password'
                                required
                                type='password'
                            />
                            <input
                                placeholder='Confirm Password'
                                required
                                type='password'
                            />
                            <button
                                className='auth_btns'
                            >
                                Sign Up
                            </button>
                            <div className='auth-msg'>
                                <span className='select-none'>Already a member?</span>
                                <span 
                                    className='nav-auth-btn' 
                                    onClick={handleNav}
                                >
                                    Log in
                                </span>
                            </div>
                            <div
                                className = {errorEncountered==''?'error-div-hidden':'error-div-visible'}
                            >
                                {errorEncountered}
                            </div>
                        </div>
                    </div>
                </form>

            </div>
            
            
        </div>
    </div>
  )
}

export default ReviewerSignup