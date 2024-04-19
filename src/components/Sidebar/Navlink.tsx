import { LucideIcon } from "lucide-react"
import Link, { LinkProps } from "next/link"
import { usePathname } from "next/navigation"

interface NavLinkProps extends LinkProps {
    title: string,
    Icon?: LucideIcon,
}

const Navlink = ({ title, Icon, href }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className="flex gap-4 text-white w-full font-medium text-xl hover:text-red-600"
    >
        {Icon !== undefined && <Icon />}
        {title}
    </Link>
  )
}

export default Navlink