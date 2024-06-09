import { AuthContext } from "@/contexts/AuthContext";
import React from "react";

const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  
  return context
}

export default useAuthContext