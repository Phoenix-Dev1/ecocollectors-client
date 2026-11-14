import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import api, { apiErrorMessage } from "../../api/axios";
import validatePassword from "../Users/ManageAccount/validatePassword";
import smallLogo from "../../img/sm-logo.png";

// Opened from the e-mailed link: /reset-password?token=...
// The token works once, for 30 minutes; the server checks it.
const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Read the token once, then take it out of the address bar and the history
  const [token] = useState(
    () => new URLSearchParams(location.search).get("token") || ""
  );
  useEffect(() => {
    if (location.search) navigate(location.pathname, { replace: true });
  }, [location.search, location.pathname, navigate]);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [err, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSaving) return;

    const problems = validatePassword(password);
    if (problems.length > 0) {
      setError(problems.join("\n"));
      return;
    }
    if (password !== confirm) {
      setError("The passwords don't match");
      return;
    }

    setIsSaving(true);
    setError("");
    try {
      const res = await api.post("/auth/resetPassword", { token, password });
      toast.success(
        typeof res.data === "string" ? res.data : "Your password has been changed."
      );
      navigate("/login", { replace: true });
    } catch (error) {
      setError(
        apiErrorMessage(error, "Something went wrong. Please try again later.")
      );
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass =
    "w-full px-5 py-4 bg-white/50 rounded-2xl border border-gray-200 focus:border-eco-primary focus:ring-4 focus:ring-eco-primary/10 outline-none transition-all duration-300 font-medium pr-14 min-h-[48px]";

  return (
    <section className="min-h-screen bg-eco-background flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-eco-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-eco-secondary/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md animate-fade-in relative z-10 px-4 md:px-0">
        <div className="flex flex-col items-center mb-8 md:mb-10">
          <Link to="/" className="group transition-transform hover:scale-105">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-eco-primary rounded-2xl flex items-center justify-center shadow-lg shadow-eco-primary/20">
                <img className="w-6 h-6 md:w-8 md:h-8" src={smallLogo} alt="logo" />
              </div>
              <span className="text-2xl md:text-3xl font-black tracking-tight text-eco-text">
                Eco<span className="text-eco-primary">Collectors</span>
              </span>
            </div>
          </Link>
        </div>

        <div className="glass !rounded-[2rem] md:!rounded-[2.5rem] p-6 md:p-10 shadow-2xl shadow-eco-primary/5 border border-white/40">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-black text-eco-text tracking-tight">
              Choose a new password
            </h1>
            <p className="text-eco-muted mt-2 md:mt-3 font-medium text-sm md:text-base">
              8 to 30 characters, with at least one letter and one number.
            </p>
          </div>

          {!token ? (
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold text-center border border-red-100">
              This link is incomplete. Please ask for a new one.
            </div>
          ) : (
            <form className="space-y-5 md:space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-eco-text ml-1" htmlFor="password">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-eco-primary transition-colors duration-300"
                    onClick={() => setShowPassword((shown) => !shown)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-eco-text ml-1" htmlFor="confirm">
                  Confirm New Password
                </label>
                <input
                  id="confirm"
                  name="confirm"
                  type={showPassword ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className={inputClass}
                  autoComplete="new-password"
                  required
                />
              </div>

              {err && (
                <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold text-center border border-red-100 whitespace-pre-line">
                  {err}
                </div>
              )}

              <button
                type="submit"
                disabled={isSaving}
                className="w-full btn-primary !py-4 shadow-xl shadow-eco-primary/20 active:scale-[0.98] min-h-[52px] disabled:opacity-60"
              >
                <span className="text-lg">
                  {isSaving ? "Saving..." : "Save new password"}
                </span>
              </button>
            </form>
          )}

          <div className="mt-8 pt-8 border-t border-gray-100 text-center space-y-3">
            <Link
              to="/password-recovery"
              className="block text-eco-primary font-bold hover:text-eco-secondary transition-colors"
            >
              Ask for a new link
            </Link>
            <Link
              to="/login"
              className="block text-eco-muted font-medium hover:text-eco-text transition-colors text-sm"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
