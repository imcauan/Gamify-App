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

const socket = io("http://localhost:3333");

const formSchema = z.object({
  message: z
    .string()
});

export default function CreateMessageForm({ chatId }: CreateMessageFormProps) {
  const queryClient = useQueryClient();
  const { mutateAsync: createMessageFn } = useMutation({
    mutationFn: CreateMessage,
    onSuccess(_, variables) {
      const cached = queryClient.getQueryData(["messages"]);

      socket.on("received_message", (message) => {
        queryClient.setQueryData(["messages"], (data: MessageEntity[]) => {
          return [
            ...data,
            {
              content: message.content,
              chatId,
              authorId: user?.id
            },
          ];
        });
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
    socket.emit("message", message);

    await createMessageFn({
      content: message,
      chatId,
      authorId: user?.id!,
    });
  }

  return (
    <div className="flex w-full sticky bottom-0 text-white justify-start items-end h-full pb-4 px-4 rounded-tl-md rounded-tr-md lg:mb-0">
      <Avatar>
        {user?.avatarUrl}
        <AvatarFallback>
          <User className="text-white" />
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
              placeholder="Message"
              className="bg-transparent border-none"
            />
          </div>
        </Form>
      </form>
    </div>
  );
}
