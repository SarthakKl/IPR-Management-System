import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams} from 'react-router-dom';
import { checkVerificationToken } from '../../utils/api/clientApi';
import {actions} from '../../redux/authSlice'

function ReviewerVerification() {
  const {token} = useParams()
    const [message, setMessage] = useState('Verifying email...')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const checkToken = async () => {
        const response = await checkVerificationToken(token)
        if(response.error){
            return setMessage(response.error)
        }
        dispatch(actions.setReviewerToken(response.token))
        setMessage('Email verified successfully. Redirecting...')
        localStorage.setItem(process.env.REACT_APP_REVIEWER_TOKEN_KEY, response.token)
        navigate('/reviewer/dashboard', {replace:true})
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

export default ReviewerVerification