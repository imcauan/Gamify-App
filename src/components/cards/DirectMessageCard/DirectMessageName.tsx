"use client"
import useAuthContext from '@/hooks/useAuthContext';
import React from 'react'

interface DirectMessageNameProps {
    username?: string
}

const DirectMessageName = ({ username }: DirectMessageNameProps) => {
  const { user } = useAuthContext();
  return (
    <>
      <p className='text-sm text-white font-normal'>{ user?.username === username ? username + " (yourself)" : username}</p>
    </>
  )
}

export default DirectMessageName