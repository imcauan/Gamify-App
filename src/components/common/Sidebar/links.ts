import { 
    BadgePlus,
    BellRing, 
    Bookmark, 
    Calendar, 
    LogOut, 
    LucideIcon, 
    Radio, 
    Settings, 
    Users 
} from "lucide-react"

interface ILinks {
    href: string,
    title: string,
    icon?: LucideIcon
}

export const links: ILinks[] = [
    {
        href: "/notifications",
        title: "NOTIFICATIONS",
        icon: BellRing,
    },
    {
        href: "/communities",
        title: "YOUR COMMUNITIES",
        icon: Users
    },
    {
        href: "/saved_posts",
        title: "SAVED POSTS",
        icon: Bookmark
    },
    {
        href: "/live_games",
        title: "LIVE GAMES",
        icon: Radio
    },
    {
        href: "/new/post",
        title: "NEW POST",
        icon: BadgePlus
    },
    {
        href: "/preferences",
        title: "PREFERENCES",
        icon: Settings
    },
    {
        href: "/logout",
        title: "LOGOUT",
        icon: LogOut
    },
        ]
