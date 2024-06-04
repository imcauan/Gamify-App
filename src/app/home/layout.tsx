import Screen from "@/components/common/Screen"
import React from "react"

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
        <Screen>
          { children }
        </Screen>
  )
}

export default HomeLayout