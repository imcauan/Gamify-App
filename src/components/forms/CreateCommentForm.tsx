import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod";
import FormInput from '../common/FormInput/FormInput';
import { Form } from '../ui/form';
import { Button } from '../ui/button';
import { Send, User } from 'lucide-react';
import { usePostContext } from '@/hooks/usePostContext';
import useAuthContext from '@/hooks/useAuthContext';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    content: z.string().min(1, { message: "Commentary needs at least 1 character"})
})

interface CreateCommentFormProps {
  postId: string,
}

const CreateCommentForm = ({ postId }: CreateCommentFormProps) => {
  const router = useRouter();
  const { user } = useAuthContext();
  const { commentPost } = usePostContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        content: ""
    }
  })

  const handleCreateCommentary = async (content: z.infer<typeof formSchema> ) => {
    const commentary = await commentPost(content, postId, user?.id!);
    console.log("Commented.");
    
    router.refresh();
  }

  return (
    <div className="flex w-full sticky bottom-0 text-white items-end p-4 gap-3 h-full">
      <Avatar>
        {user?.avatarUrl}
        <AvatarFallback>
          <User className="text-black"/>
        </AvatarFallback>
      </Avatar>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateCommentary)} className='flex items-center gap-2'>
              <FormInput 
                form={form}
                name='content'
                placeholder='Type your comment here'
                className="bg-transparent border-none"
              />
              <Button className='rounded bg-red-600 cursor-pointer hover:bg-red-700' type='submit'>
                  <Send className='text-white'/>
              </Button>
          </form>
        </Form>
    </div>
  )
}

export default CreateCommentForm