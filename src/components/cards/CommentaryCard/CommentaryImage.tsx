import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User } from "lucide-react"

interface CommentaryImageProps {
    avatarUrl?: string
}

export function CommentaryImage({ avatarUrl }: CommentaryImageProps) {
    return (
        <>
        <Avatar>
            { avatarUrl }
            <AvatarFallback>
                <User />
            </AvatarFallback>
        </Avatar>
       </>
    )
}