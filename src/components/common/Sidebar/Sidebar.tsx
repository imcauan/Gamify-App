"use client";
import NavProfile from "../NavProfile/NavProfile"
import Logo from "../Logo"
import Navlink from "./Navlink"
import { links } from "./links"
import useAuthContext from "@/hooks/useAuthContext"
import { BadgePlus, Send } from "lucide-react"
import Link from "next/link"

const Sidebar = () => {
  const { user } = useAuthContext();
  return (
    <aside className="hidden flex-col min-w-80 left-0 sticky top-0 lg:flex justify-start gap-12 items-center overflow-hidden bg-zinc-950 rounded-r-xl rounded-br-xl">
      <div className="w-full flex px-4 justify-between items-center">
        <div className="flex gap-2 items-center mt-6">
          <NavProfile 
            avatarUrl={user?.avatarUrl!}
          />
          <h1 className="text-white">{user?.username}</h1>
        </div>
      </div>
        <div className="flex flex-col gap-8 w-full px-5 text-red-600">
          { links.map(link => (
              <Navlink 
                key={link.title}
                href={link.href}
                Icon={link.icon}
                title={link.title}
              /> 
          ))}
          <Link href={"/new/post"} className="flex gap-2 justify-center bg-red-600 rounded-full text-white text-center p-4 font-semibold hover:bg-red-800">
            <BadgePlus className="text-white text-base"/>
            NEW POST
          </Link>
        </div>
    </aside>
  )
}

export default Sidebar