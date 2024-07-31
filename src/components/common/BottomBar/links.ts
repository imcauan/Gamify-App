import { BadgePlus, BellRing, Home, LucideIcon, Radio, Search, Users } from "lucide-react"

interface BottomLinkProps {
    icon: LucideIcon
    href: string
}

export const bottomLinks: BottomLinkProps[] = [
    {
        icon: Home,
        href: "/home"
    },
    {
        icon: BadgePlus,
        href: "/new/post"
    },
]