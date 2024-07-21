"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod";
import FormInput from '../common/FormInput/FormInput';
import { Form } from '../ui/form';
import { Button } from '../ui/button';
import { Send, User } from 'lucide-react';
import useAuthContext from '@/hooks/useAuthContext';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CreateCommentary from '@/hooks/create-commentary';

const formSchema = z.object({
    content: z.string().min(1, { message: "Commentary needs at least 1 character"})
})

interface CreateCommentFormProps {
  postId: string,
}

const CreateCommentForm = ({ postId }: CreateCommentFormProps) => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: ""
      }
      })
        const { mutateAsync: CreateCommentaryFn } = useMutation({
          mutationFn: CreateCommentary,
          onSuccess(_, variables) {
            const cached = queryClient.getQueryData(['commentaries'])
      
            queryClient.setQueryData(['commentaries'], data => {
              return [...data, {
                content: variables.content,
                user,
              }]
            })
          },
        })

  const handleCreateCommentary = async ({ content }: z.infer<typeof formSchema> ) => {
    const commentary = await CreateCommentaryFn({
      content, 
      postId, 
      userId: user?.id!
    });
  }

  return (
    <div className="flex w-full sticky bottom-0 text-white items-end justify-evenly h-full mb-4 gap-7">
      <Avatar>
        {user?.avatarUrl}
        <AvatarFallback>
          <User className="text-black"/>
        </AvatarFallback>
      </Avatar>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateCommentary)} className='flex items-center justify-between gap-8'>
              <FormInput 
                form={form}
                name='content'
                placeholder='Add a comment...'
                className="bg-transparent border-none w-full"
              />
              <Button className='rounded bg-red-600 cursor-pointer hover:bg-red-700 mt-2' type='submit'>
                  <Send className='text-white'/>
              </Button>
          </form>
        </Form>
    </div>
  )
}

export default CreateCommentForm