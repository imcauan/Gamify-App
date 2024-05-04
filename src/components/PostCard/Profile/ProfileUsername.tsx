import { ComponentPropsWithRef } from "react"

interface ProfileUsernameProps extends ComponentPropsWithRef<"p"> {
    username: string
}

const ProfileUsername = (props: ProfileUsernameProps) => {
  return (
    <>
      <p {...props} className="text-base font-bold text-white">
        { props.username }
      </p>
    </>
  )
}

export default ProfileUsername