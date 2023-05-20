import React, { useState } from 'react'
import '../common/AuthComponent.scss'
function ClientSignup({handleSignup, errorEncountered, setPageState, setError}) {
    const [userCategory, setUserCategory] = useState('Individual')

    const handleNav = () => {
        setError('')
        setPageState(true)
    }
    return (
            <div className='outer-div'>
                <div>
                    <div className='auth-title'>Sign Up</div>
                    <form
                        className='auth-form'
                        onSubmit={handleSignup}
                    >
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
                            <div>
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
                    </form>
                    <div
                        className = {errorEncountered==''?'error-div-hidden':'error-div-visible'}
                    >
                        {errorEncountered}
                    </div>
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
    )
}

export default ClientSignup