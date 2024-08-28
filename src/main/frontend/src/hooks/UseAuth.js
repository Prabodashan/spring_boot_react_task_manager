// Inbuilt components and modules
import { useContext } from "react";

// Custom components and modules
import AuthContext from "../contexts/AuthProvider";

//Auth context
const UseAuth = () => {
  return useContext(AuthContext);
};

export default UseAuth;
