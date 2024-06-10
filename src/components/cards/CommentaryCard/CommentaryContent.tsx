interface CommentaryContentProps {
    content: string;
    username: string
}

export function CommentaryContent({ content, username }: CommentaryContentProps) {
    return (
        <div className="flex flex-col gap-1 text-white">
          <p className="font-semibold text-sm">{username}</p>
          <p className="font-normal text-xs">{content}</p>
        </div>
    )
}