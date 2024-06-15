import React from 'react'

interface DirectMessageNameProps {
    username?: string
}

const DirectMessageName = ({ username }: DirectMessageNameProps) => {
  return (
    <>
      <p className='text-sm text-white font-normal'>{ username }</p>
    </>
  )
}

export default DirectMessageName