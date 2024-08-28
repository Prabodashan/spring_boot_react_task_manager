// Inbuilt components and modules
import { useLocation, Navigate, Outlet } from "react-router-dom";

// Custom components and modules
import UseAuth from "../../../hooks/UseAuth";

const RequireAuth = () => {
  //Auth context
  const { auth } = UseAuth();

  //Location hook
  const location = useLocation();

  return auth.userId ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
