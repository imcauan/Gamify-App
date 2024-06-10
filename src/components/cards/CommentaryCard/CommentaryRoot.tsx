import React from "react";

interface CommentaryRootProps {
    children: React.ReactNode
}

export function CommentaryRoot({ children }: CommentaryRootProps) {
    return (
        <div className="w-full flex p-2 gap-2">
          { children }
        </div>
    )
}