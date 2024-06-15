import { UserEntity } from '@/entities/UserEntity';
import React from 'react'

interface DirectMessageRootProps {
    children: React.ReactNode;
}

const DirectMessageRoot = ({ children }: DirectMessageRootProps) => {
  return (
    <div className='flex w-full p-4 gap-2 '>
          { children }
    </div>
  )
}

export default DirectMessageRoot