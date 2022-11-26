import React from 'react'
import BootstrapButton from 'react-bootstrap/Button';
import './Button.scss'
function Button({variant, onClick, disabled, children}) {
  return (
    <BootstrapButton
     variant = {variant}
     onClick = {onClick}
     disabled = {disabled}
    >
      {children}
    </BootstrapButton>
  )
}

export default Button