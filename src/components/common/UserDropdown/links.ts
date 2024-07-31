interface DropLinkProps {
    name: string
    href: string
}

export const dropLinks: DropLinkProps[] = [
    {
        name: "Notifications",
        href: "/notifications",
    },
    {
        name: "Saved posts",
        href: "/saved_posts",
    },
    {
        name: "Preferences",
        href: "/user/preferences",
    },
    {
        name: "Logout",
        href: "/auth/signin",
    }
]