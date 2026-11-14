import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/authContext";
import { getStoredUser, setUnauthorizedHandler } from "../../api/axios";

// When any API call answers 401, end the local session, say why, and go to the
// login page (which brings the user back here afterwards). Render once, inside
// the router.
export default function SessionExpiry() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setUnauthorizedHandler((error) => {
      let message = "Please log in to continue.";
      if (error.response?.data === "Account is inactive") {
        message = "Your account is inactive. Please contact support.";
      } else if (getStoredUser()) {
        message = "Your session has expired. Please log in again.";
      }

      logout();
      // One toast, however many calls failed at once
      toast.error(message, { id: "session-expired" });
      navigate("/login", {
        replace: true,
        state: { from: window.location.pathname + window.location.search },
      });
    });
    return () => setUnauthorizedHandler(null);
  }, [logout, navigate]);

  return null;
}
