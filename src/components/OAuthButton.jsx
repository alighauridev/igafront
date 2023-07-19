import React from 'react'

function OAuthButton(props) {
  return (
    <div style={props.style} onClick={props.onClick || null } className='flex items-center justify-center space-x-4 p-3 font-heading font-semibold text-lg border border-[#EFF3FA] rounded-md hover:bg-[#a5c1f4] hover:text-white'>
        {props.ICON && <props.ICON />}
        <p>{props.text}</p>
    </div>
  )
}

export default OAuthButton