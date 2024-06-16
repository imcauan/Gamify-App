"use client";

import { DirectMessageCard } from '@/components/cards/DirectMessageCard';
import SearchInput from '@/components/common/SearchInput/SearchInput';
import { UserEntity } from '@/entities/UserEntity';
import useGetUsers from '@/hooks/get-user';
import useAuthContext from '@/hooks/useAuthContext';
import { Bell } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const Page = () => {
  const { user } = useAuthContext();
  const [users, setUsers] = React.useState<UserEntity[] | null>([]);
  const [search, setSearch] = React.useState<string>("")

  React.useEffect(() => {
    useGetUsers()
    .then(data => setUsers(data));
  }, [])

  const filteredUsers = search.length > 0 
  ? users?.filter(u => u.username.includes(search))
  : [];
  
  return (
    <div className='flex flex-col w-full h-full'>
      <div className='p-4 flex w-full justify-between'>
        <h1 className='text-lg text-white font-semibold'>Directs</h1>
        <Link href={"/user/notifications"}>
          <Bell className="text-white hover:text-red-600 cursor-pointer" />
        </Link>
      </div>
      <div className='w-full px-4'>
        <SearchInput 
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
        <div className='flex flex-col my-3'>
          { search.length > 0 ? (
            filteredUsers?.map(user => (
              <DirectMessageCard.Root key={user.id}>
              <DirectMessageCard.Image user={user} />
              <div className='flex flex-col'>
                <DirectMessageCard.Name username={user.username}/>
                <DirectMessageCard.Text message='Lorem ipsum sit dor amet.'/>
              </div>
            </DirectMessageCard.Root>
            ))
          ) : (
            users?.map(user => (
              <DirectMessageCard.Root key={user.id}>
              <DirectMessageCard.Image user={user} />
              <div className='flex flex-col'>
                <DirectMessageCard.Name username={user.username}/>
                <DirectMessageCard.Text message='Lorem ipsum sit dor amet.'/>
              </div>
            </DirectMessageCard.Root>
            ))
          )}
        </div>
    </div>
  )
}

export default Page