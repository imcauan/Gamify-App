import { ComponentPropsWithRef } from "react"

interface PostSubtitleProps extends ComponentPropsWithRef<"p"> {
    subtitle: string
}

const PostSubtitle = (props: PostSubtitleProps) => {
  return (
    <>
      <p { ...props} className="text-white w-full text-wrap">
        { props.subtitle }
      </p>
    </>
  )
}

export default PostSubtitle