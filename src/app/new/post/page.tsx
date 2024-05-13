"use client";

import FileUploader from "@/components/common/FileUploader/FileUploader";
import FormInput from "@/components/common/FormInput/FormInput";
import FormTextarea from "@/components/common/FormInput/FormTextarea";
import Screen from "@/components/common/Screen";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PostEntity } from "@/entities/PostEntity";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  caption: z
    .string()
    .max(600, { message: "Character limit reached."  }),
  
  location: z
    .string()
    .max(100, { message: "Character limit reached."}),

  tags: z
    .string()
    .max(100, { message: "Character limit reached."}),
  
  file: z
    .custom<File[]>(),
});

interface CreatePostProps {
  post: PostEntity
}

const Page = ({ post }: CreatePostProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caption: "",
      location: "",
      file: [],
      tags: ""
    }
  });
  return (
    <Screen>
      <div className="flex gap-4 p-5">
        <Link href="/home">
          <ArrowLeft className="text-white" />
        </Link>
        <h1 className="text-white font-semibold text-xl">Create Post</h1>
      </div>
      <Form {...form}>
        <div className="p-4 flex flex-col gap-3 h-full">
          <FormTextarea
            form={form}
            label="Caption:"
            name="caption"
            rows={24}
            cols={50}
          />
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Add Photos:</FormLabel>
                <FormControl>
                  <FileUploader 
                    fieldChange={field.onChange}
                    mediaUrl={post?.imageUrl}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormInput 
            form={form}
            name="location"
            label="Location:"
            placeholder="Joinville, Santa Catarina, Brazil."
          />
          <FormInput 
            form={form}
            name="tags"
            label="Tags (separated by comma):"
            placeholder="Art, music, coding, games"
          />
          <Button
            type="submit"
            className="w-full rounded-full font-semibold text-base bg-red-600 text-white p-6 hover:bg-red-800"
          >
            CREATE
          </Button>
        </div>
      </Form>
    </Screen>
  );
};

export default Page;
