import { cn } from "@/lib/utils"
import { ComponentPropsWithRef } from "react"

interface ScreenProps extends ComponentPropsWithRef<"div"> {}

const Screen = (props: ScreenProps) => {
  return (
    <div { ...props } 
      className={cn("bg-black w-full h-screen flex overflow-auto", props.className)}
    >
       { props.children }
    </div>
  )
}

export default Screen