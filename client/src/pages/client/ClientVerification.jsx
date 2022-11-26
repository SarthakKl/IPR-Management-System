import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams} from 'react-router-dom';
import { checkVerificationToken } from '../../utils/api/clientApi';
import './ClientVerification.scss'
import {actions} from '../../redux/authSlice'

function ClientVerification() {
    const {token} = useParams()
    const [message, setMessage] = useState('Verifying email...')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const checkToken = async () => {
        const response = await checkVerificationToken(token)
        if(response.error){
            return setMessage(response.error)
        }
        dispatch(actions.setClientToken(response.token))
        setMessage('Email verified successfully. Redirecting...')
        localStorage.setItem(process.env.REACT_APP_CLIENT_TOKEN_KEY, response.token)
        navigate('/client/dashboard', {replace:true})
    }
    useEffect(() => {
        checkToken()
    }, []);
  return (
    <div className='main-div'>
        {message}
    </div>
  )
}

export default ClientVerification