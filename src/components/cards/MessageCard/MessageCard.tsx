import NavProfile from "@/components/common/NavProfile/NavProfile";
import { MessageEntity } from "@/entities/MessageEntity";
import React from "react";

interface MessageProps extends React.ComponentPropsWithRef<"div"> {
    content: string
}

export default function MessageCard({ content, ...props }: MessageProps) {
    return (
        <>
            <div className={props.className} {...props}>
              { content }
            </div>
        </>
    )
}