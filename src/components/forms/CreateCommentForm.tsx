"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FormInput from "../common/FormInput/FormInput";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { Send, User } from "lucide-react";
import useAuthContext from "@/hooks/useAuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CreateCommentary from "@/hooks/create-commentary";
import { CommentaryEntity } from "@/entities/CommentaryEntity";

const formSchema = z.object({
  content: z
    .string()
});

interface CreateCommentFormProps {
  postId: string;
}

const CreateCommentForm = ({ postId }: CreateCommentFormProps) => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });
  const { mutateAsync: CreateCommentaryFn } = useMutation({
    mutationFn: CreateCommentary,
    onSuccess(_, variables) {
      const cached = queryClient.getQueryData(["commentaries"]);

      queryClient.setQueryData(["commentaries"], (data: CommentaryEntity[]) => {
        return [
          ...data,
          {
            content: variables.content,
            user,
          },
        ];
      });
    },
  });

  const handleCreateCommentary = async ({
    content,
  }: z.infer<typeof formSchema>) => {
    const commentary = await CreateCommentaryFn({
      content,
      postId,
      userId: user?.id!,
    });
  };

  return (
    <div className="flex w-full sticky bottom-0 text-white items-end h-full pb-4 px-4 rounded-tl-md rounded-tr-md lg:mb-0">
      <form
        onSubmit={form.handleSubmit(handleCreateCommentary)}
        className="flex w-full items-center gap-8"
      >
        <Form {...form}>
        <div className="flex lg:block w-full justify-between">
          <FormInput
            form={form}
            name="content"
            placeholder="Add a comment..."
            className="bg-transparent border-none"
          />
          <Button
            className="rounded bg-red-600 cursor-pointer hover:bg-red-700 mt-2 flex lg:hidden"
            type="submit"
          >
            <Send className="text-white" />
          </Button>
        </div>
        </Form>
      </form>
    </div>
  );
};

export default CreateCommentForm;
