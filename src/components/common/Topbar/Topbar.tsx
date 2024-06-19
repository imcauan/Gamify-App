import { Send } from "lucide-react"
import Logo from "../Logo"
import UserDropdown from "../UserDropdown/UserDropdown";
import useAuthContext from "@/hooks/useAuthContext";
import Link from "next/link";

const Topbar = () => {
  const { user } = useAuthContext();
  return (
    <div className="w-full top-0 sticky p-4 flex justify-between items-center lg:hidden">
      <UserDropdown avatarUrl={ user?.avatarUrl ?? "" } />
      <Logo />
      <Link href={"/user/directs"}>
        <Send className="text-white cursor-pointer hover:text-red-600" />
      </Link>
    </div>
  )
}

export default Topbar