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
        title: "Notifications",
        icon: BellRing,
    },
    {
        href: "/communities",
        title: "Communities",
        icon: Users
    },
    {
        href: "/saved_posts",
        title: "Saved posts",
        icon: Bookmark
    },
    {
        href: "/preferences",
        title: "Preferences",
        icon: Settings
    },
    {
        href: "/logout",
        title: "Logout",
        icon: LogOut
    },
        ]
