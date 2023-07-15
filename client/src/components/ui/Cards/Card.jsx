import React from 'react'
import './Card.scss'

function Card({title, count, classname, clicked}) {
  return (
    <div className={classname} onClick={clicked}>
        <div className='text'>{title}</div>
        <div className='count'>{count}</div>
    </div>
  )
}

export default Card