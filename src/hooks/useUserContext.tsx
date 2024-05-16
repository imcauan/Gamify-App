import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";

const useUserContext = () => {
  const context = useContext(UserContext);
  
  return context
}

export default useUserContext