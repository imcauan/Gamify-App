import FormInput  from "../common/FormInput/FormInput";
import React from "react";
import FormTextarea from "../common/FormInput/FormTextarea";
import { Button } from "../ui/button";
import { PostEntity } from "@/entities/PostEntity";
import { Form } from "../ui/form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostContext } from "@/hooks/usePostContext";
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
  caption: z.string().max(600, { message: "Character limit reached." }),

  location: z.string().max(100, { message: "Character limit reached." }),

  tags: z.string().max(100, { message: "Character limit reached." }),

  image: z.custom<File>(),
});

const CreatePostForm = () => {
  const [image, setImage] = React.useState<File | null>(null);
  const { createPost } = usePostContext();
  const router = useRouter();

  const { mutateAsync: createPostFn } = useMutation({
    mutationKey: ['posts'],
    mutationFn: createPost
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caption: "",
      location: "",
      tags: "",
    },
  });

  const onSubmit = async ({ caption, location, tags }: PostEntity) => {
    console.log(caption, location, tags, image);

    const newPost = await createPostFn({ caption, location, tags, image });

    console.log("Post criado");

    router.push("/home");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type } = e.target
    
    if(type === "file") {
      const file = e.target.files?.[0];

      if(file) {
        setImage(file);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="p-4 flex flex-col gap-3 h-full w-full overflow-hidden">
          <FormTextarea
            form={form}
            label="Caption:"
            name="caption"
            rows={24}
            cols={50}
          />
          <FormInput
            form={form}
            name="location"
            label="Location:"
            placeholder="Joinville, Santa Catarina, Brazil."
          />
          <FormInput 
            form={form} 
            name="image" 
            label="Add Photo:" 
            type="file" 
            onChange={handleImageChange}
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
      </form>
    </Form>
  );
};

export default CreatePostForm;
