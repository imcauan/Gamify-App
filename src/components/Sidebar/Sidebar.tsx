import Logo from "../common/Logo"
import { Button } from "../ui/button"
import Navlink from "./Navlink"
import { links } from "./links"

const Sidebar = () => {
  return (
    <aside className="max-w-96 h-full bg-zinc-950 flex flex-col items-center gap-5 px-4 py-5">
        <Logo />
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
        <Button 
          className="w-full rounded-3xl font-semibold text-lg bg-red-600 text-white p-6"
        >
          NEW POST
        </Button>
    </aside>
  )
}

export default Sidebar