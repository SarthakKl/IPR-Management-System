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
    const [isAdminVerified, setAdminVerifiedState] = useState(true)


    const checkToken = async () => {
        const response = await checkVerificationToken(token)
        if(response.error){
            return setMessage(response.error)
        }
        if(response.messsage === 'Not verified by admin'){
          return setAdminVerifiedState(false)
        }
        dispatch(actions.setReviewerToken(response.token))
        dispatch(actions.setUserName(response.reviewer.fullname))
        setMessage('Email verified successfully. Redirecting...')
        localStorage.setItem('REVIEWER_TOKEN', response.token)
        localStorage.setItem('REVIEWER_NAME', response.reviewer.fullname)
        navigate('/reviewer/dashboard', {replace:true})
    }
    useEffect(() => {
        checkToken()
    }, []);
  return (
    <div className='main-div'>
        {message}
        {
          !isAdminVerified &&
          <div className='outer-div'>
            Your account is not verified by admin yet. Please contact your administrator.
          </div>
        }
    </div>
  )
}

export default ReviewerVerification