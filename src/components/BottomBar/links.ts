import { BadgePlus, BellRing, Home, LucideIcon, Radio, Search, Users } from "lucide-react"
import { LinkProps } from "next/link"

interface BottomLinkProps extends LinkProps {
    icon: LucideIcon
    href: string
}

export const bottomLinks: BottomLinkProps[] = [
    {
        icon: Home,
        href: "/home"
    },
    // {
    //     icon: BellRing,
    //     href: "/notifications",
    // },
    {
        icon: Search,
        href: "/search/"
    },
    {
        icon: BadgePlus,
        href: "/create_post"
    },
    {
        icon: Radio,
        href: "/live_games"
    },
    {
        icon: Users,
        href: "/communities",
    },
]