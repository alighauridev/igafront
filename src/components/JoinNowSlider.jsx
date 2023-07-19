import React from 'react'
import PeopleSearch from '../Svgs/PeopleSearch'
import Button from './Button'
import { ArrowRightAlt } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function JoinNowSlider(props) {

    const {userInfo} = useSelector(state => state.auth)

    const lines = [
        "Search for People",
        "Hire the best talent",
        "Pay for work completed",
    ]
    const [currrentIndex, setCurrentIndex] = React.useState(0)
    const lineRef = React.useRef(null)
    const dotRef = React.useRef(null)

    const handleScroll = () => {
        if(currrentIndex < lines.length-1){
            setCurrentIndex(currrentIndex+1)
            lineRef.current.scrollBy({left:lineRef.current.clientWidth,behavior:'smooth'})
            dotRef.current.scrollBy({left:dotRef.current.clientWidth,behavior:'smooth'})
        }else{
            setCurrentIndex(0)
            lineRef.current.scrollBy({left:-lineRef.current.clientWidth*(lines.length-1),behavior:'smooth'})
            dotRef.current.scrollBy({left:-dotRef.current.clientWidth*(lines.length-1),behavior:'smooth'})
        }
    }

    const navigate = useNavigate()

  return (
    <div style={props.style} className='h-full flex flex-col justify-between space-y-7 p-4 relative rounded-lg text-white bg-secondary'>
        <div>
            <PeopleSearch />
        </div>
        <div ref={lineRef} className='flex flex-row overflow-hidden'>
            {
                lines.map((line,index) => 
                    <p key={index} className='min-w-full text-white text-2xl xl:text-4xl font-normal'>
                        {line}
                    </p>
                
            )}
        </div>
        <div ref={dotRef} className='flex flex-row space-x-2'>
            {
                lines.map((line,index) => 
                   <div className={`${currrentIndex===index ? 'bg-primary w-4 xl:w-6' : 'bg-[#00000052] w-2 xl:w-3'} rounded-full h-2 xl:h-3 `}></div>
                
            )}
        </div>
        <div className='flex items-center'>
            <div className='rounded-full h-2 w-2 xl:h-3 xl:w-3   bg-border' />
            <div className='flex flex-1 h-1 bg-border' />
            <div className='rounded-full h-2 w-2 xl:h-3 xl:w-3 bg-border' />
        </div>
        <div className='flex'>
            { userInfo?._id === undefined && <Button onClick={()=>navigate("/register")} text="Join Now" style={{background:"white",color:"#4864E1"}} />}
        </div>
        {/* Meke this div center to the root div */}
        <div onClick={handleScroll} className=' absolute top-[20%] -right-5 m-auto rounded-full p-2 bg-primary'>
            <div className='rounded-full bg-secondary flex items-center justify-center'>
                <ArrowRightAlt />
            </div>
            
        </div>
    </div>
  )
}

export default JoinNowSlider