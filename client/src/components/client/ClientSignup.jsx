import React from 'react'
import '../common/AuthComponent.scss'
function ClientSignup({handleSignup, errorEncountered, setPageState, setError}) {
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
                        onSubmit={handleSignup}>
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