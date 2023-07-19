import { Search } from '@mui/icons-material'
import React from 'react'

function searchBar() {
  return (
    <div className='flex flex-1 p-3 rounded-3xl border border-[#D5D5D5] space-x-3'>
        <Search />
        <input type="text" className='font-text text-text flex-1 outline-none bg-transparent' placeholder='Find Services And Services Providers' />
    </div>
  )
}

export default searchBar