// Inbuilt components and modules
import { useNavigate } from "react-router-dom";

// Custom components and modules
import UseAuth from "../../../hooks/UseAuth";

// Styles
import "./navbar.scss";

function Navbar() {
  //Auth context
  const { auth, setAuth } = UseAuth();

  //Navigate hook
  const navigate = useNavigate();

  // Logout function
  const logout = () => {
    setAuth({});
    navigate("/login", { replace: true });
  };

  return (
    <nav>
      <div className="left">
        <div className="logo">
          <span>Task Manager</span>
        </div>
      </div>
      <div className="right">
        {auth.userId ? (
          <div className="user">
            <span className="logoutButton" onClick={logout}>
              Logout
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
