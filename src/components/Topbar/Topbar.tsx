import { Send } from "lucide-react"
import NavProfile from "../NavProfile/NavProfile"
import Logo from "../common/Logo"
import useAuthContext from "@/hooks/useAuthContext";

const Topbar = () => {
  const { user } = useAuthContext();
  return (
    <div className="w-full p-4 flex justify-between items-center lg:hidden">
      <NavProfile imageUrl={user?.avatarUrl} />
      <Logo />
      <Send className="text-white"/>
    </div>
  )
}

export default Topbar