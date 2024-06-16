"use client"

import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
  const { userId } = useParams();
  return (
    <div className='w-full h-full flex justify-center items-center text-white'>
       <p> Usuário com ID { userId } </p> 
    </div>
  )
}

export default Page