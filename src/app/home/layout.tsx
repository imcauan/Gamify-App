import Screen from "@/components/common/Screen"
import { AuthProvider } from "@/contexts/AuthContext"
import { UserProvider } from "@/contexts/UserContext"
import React from "react"

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
        <Screen>
          { children }
        </Screen>
  )
}

export default HomeLayout