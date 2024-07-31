import { LucideIcon } from "lucide-react"
import Link, { LinkProps } from "next/link"

interface NavLinkProps extends LinkProps {
    title?: string,
    Icon?: LucideIcon,
    onClick?: () => void;
}

const Navlink = ({ title, Icon, href, ...props}: NavLinkProps) => {
  return (
    <Link
      href={href}
      onClick={props.onClick}
      className="flex justify-center text-white w-full text-xl lg:gap-4 lg:justify-start"
    >
        {Icon !== undefined && <Icon className="text-white lg:text-red-600"/>}
        <p className="text-white font-xs font-medium hover:text-zinc-300">{title}</p>
    </Link>
  )
}

export default Navlink