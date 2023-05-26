import React, { useState } from 'react'
import '../common/AuthComponent.scss'
import logo from '../../assets/logo.png'

function ClientSignup({handleSignup, errorEncountered, setPageState, setError}) {
    const [userCategory, setUserCategory] = useState('Individual')

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
                <div className='right_div'>
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
                                <div className='user-categories'>
                                    <div className='individual-category'>
                                        <input  
                                            type='radio'
                                            name='user-category'
                                            id='individual-cat'
                                            onChange={(e) => {
                                                if(e.target.checked)
                                                    setUserCategory('Individual')
                                            }}
                                            value={userCategory}
                                            checked = {userCategory == 'Individual'}
                                        />
                                        <label
                                            htmlFor='individual-cat'
                                        >
                                            Individual
                                        </label>
                                    </div>
                                    <div className='individual-category'>
                                        <input
                                            type='radio'
                                            name='user-category'
                                            id = 'organisation-cat'
                                            value={userCategory}
                                            onChange={(e) => {
                                                if(e.target.checked)
                                                    setUserCategory('Organisation')
                                            }}
                                            checked = {userCategory == 'Organisation'}
                                        />
                                        <label
                                            htmlFor='organisation-cat'
                                        >
                                            Organisation
                                        </label>
                                    </div>
                                </div>
                                <input
                                    placeholder={userCategory == 'Individual'? 'Full Name':'Name'}
                                    required
                                    type='text'
                                />
                                <input
                                    placeholder='Email'
                                    required
                                    type='email'
                                />
                                <input
                                    placeholder='Contact'
                                    required
                                    type='text'
                                />
                                {
                                    userCategory == 'Organisation' &&
                                    <textarea
                                    placeholder='Please share a brief description of your organisation'
                                    required
                                    />
                                }
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
                            </div>
                        </div>
                        
                    </form>

                </div>
                    
                    <div
                        className = {errorEncountered==''?'error-div-hidden':'error-div-visible'}
                    >
                        {errorEncountered}
                    </div>
                    
                </div>
            </div>
    )
}

export default ClientSignup