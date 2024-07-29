"use client";

import React from "react";
import * as z from "zod";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../common/FormInput/FormInput";
import { io } from "socket.io-client";
import useAuthContext from "@/hooks/useAuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateMessage } from "@/hooks/create-message";
import { MessageEntity } from "@/entities/MessageEntity";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { User } from "lucide-react";

interface CreateMessageFormProps {
  chatId: string;
}

const socket = io("http://localhost:3333", {
  withCredentials: true,
});

const formSchema = z.object({
  message: z
    .string()
    .min(1, { message: "Commentary needs at least 1 character" }),
});

export default function CreateMessageForm({ chatId }: CreateMessageFormProps) {
  const queryClient = useQueryClient();
  const { mutateAsync: createMessageFn } = useMutation({
    mutationFn: CreateMessage,
    onSuccess(_, variables) {
      const cached = queryClient.getQueryData(["messages"]);

      queryClient.setQueryData(["messages"], (data) => {
        return [
          ...data,
          {
            content: variables.content,
          },
        ];
      });
    },
  });
  const { user } = useAuthContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  async function handleSubmitMessage({ message }: z.infer<typeof formSchema>) {
    const messageReq = await createMessageFn({
      content: message,
      chatId,
      authorId: user?.id!,
    });
    //  socket.emit('sendMessage', message)
  }

  return (
    <div className="flex w-full sticky bottom-0 text-white justify-start items-end h-full pb-4 px-4 rounded-tl-md rounded-tr-md lg:mb-0">
      <Avatar>
        { user?.avatarUrl }
        <AvatarFallback>
          <User className="text-white"/>
        </AvatarFallback>
      </Avatar>
      <form
        onSubmit={form.handleSubmit(handleSubmitMessage)}
        className="flex w-full justify-between items-end gap-2"
      >
        <Form {...form}>
          <div className="flex lg:block w-full justify-between">
            <FormInput
              form={form}
              name="message"
              placeholder="Type your comment here"
              className="bg-transparent border-none"
            />
          </div>
        </Form>
      </form>
    </div>
  );
}
