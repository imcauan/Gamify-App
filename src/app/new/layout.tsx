import Sidebar from "@/components/common/Sidebar/Sidebar"
import Screen from "@/components/common/Screen"
import React from "react"

const PostLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Screen>
      <Sidebar />
      { children }
    </Screen>
  )
}

export default PostLayout