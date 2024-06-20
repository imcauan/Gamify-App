"use client"

import React from "react";
import * as z from "zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../common/FormInput/FormInput";
import { io } from "socket.io-client";
import useAuthContext from "@/hooks/useAuthContext";
import { api } from "@/services/api";
import { MessageEntity } from "@/entities/MessageEntity";

interface CreateMessageFormProps {
  userId: string;
}

const socket = io('http://localhost:3333');

const formSchema = z.object({
  message: z
    .string()
    .min(1, { message: "Commentary needs at least 1 character" }),
});

export default function CreateMessageForm({ userId }: CreateMessageFormProps) {
  const { user } = useAuthContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  async function handleSubmitMessage(message: { message: string }) {
    try {
     const MessageRequest = await api
     .post<MessageEntity>("/new/message", {
       content: message,
       authorId: user?.id!,
       destination: userId
     });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex w-full sticky bottom-0 text-white p-4 gap-3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitMessage)}
          className="flex w-full justify-between items-end gap-2"
        >
          <FormInput
            form={form}
            name="message"
            placeholder="Type your comment here"
            className="bg-transparent border-none"
          />
          <Button
            className="rounded bg-red-600 cursor-pointer hover:bg-red-700"
            type="submit"
          >
            <Send className="text-white" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
