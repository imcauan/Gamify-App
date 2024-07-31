import Navlink from "../Sidebar/Navlink"
import { bottomLinks } from "./links"

const BottomBar = () => {
  return (
    <footer className="bg-black w-full bottom-0 sticky flex gap-2 lg:hidden justify-center items-end space-y-4 mb-4">
      {bottomLinks.map( link => (
        <Navlink 
          key={link.href}
          href={link.href}
          Icon={link.icon}
        />
      ))}
    </footer>
  )
}

export default BottomBar