import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

const useAuthContext = () => {
  const context = useContext(AuthContext);
  
  return context
}

export default useAuthContext