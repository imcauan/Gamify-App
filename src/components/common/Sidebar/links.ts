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
    onClick?: () => void;
}

export const links: ILinks[] = [
    {
        href: "/preferences",
        title: "Preferences",
        icon: Settings
    },
    {
        href: "/auth/signin",
        title: "Logout",
        icon: LogOut
    },
]
