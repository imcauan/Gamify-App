import { useFetchUserById } from '@/hooks/get-users'
import React from 'react'

const Page = async ({ 
    searchParams,
  }:{
    searchParams: { [key: string]: string | undefined }
  }) => {

  const userId = searchParams['userId'] ?? ""
  const { messages } = await useFetchUserById(userId);
  const filteredMessages = messages.filter(m => m.destination === userId);

  return (
    <div className='w-full h-full flex justify-center items-center text-white'>
      {/* { filteredMessages.length > 0 ? (
        filteredMessages.map(m => ())
      ) : (
        <h1 className='text-white'>No messages in this chat.</h1>
      )} */}
      <h1>Oi {userId}</h1>
    </div>
  )
}

export default Page