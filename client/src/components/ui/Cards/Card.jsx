import React from 'react'
import './Card.scss'

function Card({title, count, clicked}) {
  return (
    <div className='info-card' onClick={clicked}>
        <div className='text'>{title}</div>
        <div className='count'>{count}</div>
    </div>
  )
}

export default Card