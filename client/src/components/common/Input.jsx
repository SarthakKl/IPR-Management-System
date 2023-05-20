import React from 'react'

const Input = ({value,label})=>{
    return(
        <div className='input_wrapper'>
            <label>{label}</label>
            <input type="text" value={value} disabled/>
        </div>
    )
}

export default Input