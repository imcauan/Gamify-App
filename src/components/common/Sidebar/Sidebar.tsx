import NavProfile from "../../NavProfile/NavProfile"
import Logo from "../Logo"
import Navlink from "./Navlink"
import { links } from "./links"

const Sidebar = () => {
  return (
    <aside className="max-w-96 bg-zinc-950 hidden flex-col items-center gap-4 left-0 sticky px-4 py-5 lg:flex w-full">
        <div className="w-full flex gap-4 justify-between px-4 items-center">
          <Logo />
          <NavProfile 
           imageUrl="/vercel.svg"
           />
         </div>
        <div className="flex flex-col gap-8 w-full p-4">
          { links.map(link => (
              <Navlink 
                key={link.title}
                href={link.href}
                Icon={link.icon}
                title={link.title}
              /> 
          ))}
        </div>
    </aside>
  )
}

export default Sidebar