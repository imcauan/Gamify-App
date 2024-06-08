import { Send } from "lucide-react"
import Logo from "../Logo"
import UserDropdown from "../UserDropdown/UserDropdown";
import useAuthContext from "@/hooks/useAuthContext";

const Topbar = () => {
  const { user } = useAuthContext();
  return (
    <div className="w-full top-0 sticky p-4 flex justify-between items-center lg:hidden">
      <UserDropdown avatarUrl={ user?.avatarUrl ?? "" } />
      <Logo />
      <Send className="text-white" />
    </div>
  )
}

export default Topbar