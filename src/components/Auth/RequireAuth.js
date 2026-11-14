import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { welcomePath } from "../../utils/roles";

// Route guard. Logged-out visitors go to /login (and come back here after
// logging in); users without one of `roles` go to their own welcome page.
// The server checks the role again on every call: this only keeps people off
// pages that can't work for them.
export default function RequireAuth({ roles, children }) {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  if (!currentUser) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }
  if (roles && !roles.includes(currentUser.role)) {
    return <Navigate to={welcomePath(currentUser.role)} replace />;
  }
  return children;
}
