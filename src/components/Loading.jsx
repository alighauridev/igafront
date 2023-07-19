import React from 'react'
import ReactLoading from 'react-loading';


function Loading(props) {
  return (
    <ReactLoading type={props.type} color={"#3276FA"} height={props.size || 20} width={props.size || 20} />
  )
}

export default Loading