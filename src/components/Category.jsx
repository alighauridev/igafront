import { Icon, SvgIcon } from '@mui/icons-material'
import React from 'react'

function Category(props) {
  return (
    <div style={props.style} className='border rounded-md p-7 space-y-4 flex flex-col bg-transparent border-[#EDEDED] hover:bg-primary hover:shadow-md'>
        <div className='w-10 h-10 object-cover'>
           {/* <div className='flex-1 border w-32 h-32'> */}
           <props.icon className='text-secondary' />
           {/* </div> */}
            {/* <img className='w-full h-full' src={props.icon} alt="icon" /> */}
            {/* take icon name in prop and pass it to mui icons  */}
            {/* <SvgIcon data-testid={props.icon} className='text-secondary' /> */}
        </div>
        <div>
            <p className='font-heading font-medium text-heading text-lg'>{props.name}</p>
        </div>
    </div>
  )
}

export default Category