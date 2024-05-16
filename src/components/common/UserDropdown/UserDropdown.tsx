import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { dropLinks } from "./links";
import Link from "next/link";
import NavProfile from "../../NavProfile/NavProfile";

interface UserDropdownProps {
  avatarUrl: string;
}

const UserDropdown = ({ avatarUrl }: UserDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <NavProfile avatarUrl={ avatarUrl } />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-neutral-950 text-white">
        {dropLinks.map((link) => (
          <DropdownMenuLabel key={link.href} className="hover:text-red-600">
            <Link href={link.href}>
                {link.name}
            </Link>
          </DropdownMenuLabel>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
