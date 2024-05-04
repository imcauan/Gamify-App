import { ComponentPropsWithRef } from "react"

interface LogoProps extends ComponentPropsWithRef<"h1"> {}

const Logo = ({ ...props }: LogoProps) => {
  return (
    <div>
       <h1 
       {...props }
       className="font-bold text-xl text-white"
       >
        GAMIFY
        </h1>
    </div>
  )
}

export default Logo