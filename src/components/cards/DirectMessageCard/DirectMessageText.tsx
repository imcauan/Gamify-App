import React from 'react'

interface DirectMessageTextProps {
    message: string;
}

const DirectMessageText = ({ message }: DirectMessageTextProps) => {
  return (
    <>
      <p className='text-sm text-slate-300 font-semibold'>{ message }</p>    
    </>
  )
}

export default DirectMessageText