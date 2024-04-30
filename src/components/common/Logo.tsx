import { ComponentPropsWithRef } from "react"

interface LogoProps extends ComponentPropsWithRef<"h1"> {}

const Logo = ({ ...props }: LogoProps) => {
  return (
    <div>
       <h1 
       {...props }
       className="font-bold text-3xl text-white mt-6"
       >
        GAMIFY
        </h1>
    </div>
  )
}

export default Logo