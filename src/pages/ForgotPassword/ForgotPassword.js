import React, { useState } from "react";
import { Link } from "react-router-dom";
import api, { apiErrorMessage } from "../../api/axios";
import smallLogo from "../../img/sm-logo.png";

// Asks the server to e-mail a reset link. The server answers the same whether
// or not the e-mail has an account, so this page can't reveal that either.
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sentMessage, setSentMessage] = useState("");
  const [err, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return;

    setIsSending(true);
    setError("");
    try {
      const res = await api.post("/auth/forgotPassword", { email });
      setSentMessage(
        res.data?.message ||
          "If an account exists for this e-mail, we've sent it a link to choose a new password."
      );
    } catch (error) {
      setError(
        apiErrorMessage(error, "Something went wrong. Please try again later.")
      );
    } finally {
      setIsSending(false);
    }
  };

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
              Forgot your password?
            </h1>
            <p className="text-eco-muted mt-2 md:mt-3 font-medium text-sm md:text-base">
              Enter your e-mail and we'll send you a link to choose a new one.
            </p>
          </div>

          {sentMessage ? (
            <div className="space-y-6">
              <div className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl text-sm font-bold text-center border border-emerald-100">
                {sentMessage}
              </div>
              <p className="text-eco-muted text-sm text-center">
                No e-mail? Check your spam folder, or{" "}
                <button
                  type="button"
                  onClick={() => setSentMessage("")}
                  className="text-eco-primary font-bold hover:text-eco-secondary transition-colors"
                >
                  try again
                </button>
                .
              </p>
            </div>
          ) : (
            <form className="space-y-5 md:space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-eco-text ml-1" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 bg-white/50 rounded-2xl border border-gray-200 focus:border-eco-primary focus:ring-4 focus:ring-eco-primary/10 outline-none transition-all duration-300 font-medium placeholder:text-gray-400 min-h-[48px]"
                  placeholder="name@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              {err && (
                <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold text-center border border-red-100">
                  {err}
                </div>
              )}

              <button
                type="submit"
                disabled={isSending}
                className="w-full btn-primary !py-4 shadow-xl shadow-eco-primary/20 active:scale-[0.98] min-h-[52px] disabled:opacity-60"
              >
                <span className="text-lg">
                  {isSending ? "Sending..." : "Send reset link"}
                </span>
              </button>
            </form>
          )}

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <Link
              to="/login"
              className="text-eco-primary font-black hover:text-eco-secondary transition-colors"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
