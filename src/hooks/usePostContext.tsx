import { PostContext } from "@/contexts/PostContext"
import React from "react"

export function usePostContext() {
    const context = React.useContext(PostContext)

    return context
}