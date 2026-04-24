import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const ContactUs = () => {
  const form = useRef();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false); // State to track email sending

  useEffect(() => {
    if (currentUser) {
      form.current.email.value = currentUser.email;
    }
  }, [currentUser]);

  const handleSendEmail = async (e) => {
    e.preventDefault();

    if (isSending) {
      return;
    }

    try {
      setIsSending(true);

      const emailResponse = await axios.post(
        `${process.env.REACT_APP_URL}/user/sendEmail`,
        {
          email: form.current.email.value,
          subject: form.current.subject.value,
          message: form.current.message.value,
        }
      );

      setMessage(emailResponse.data.message);
      console.log(message);

      setTimeout(() => {
        window.alert("Message sent successfully!"); // Display confirmation alert
        if (form.current) {
          form.current.reset();
        }
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-eco-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-eco-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-eco-secondary/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-4xl animate-fade-in relative z-10">
        <div className="glass !rounded-[2.5rem] shadow-2xl shadow-eco-primary/5 border border-white/40 overflow-hidden flex flex-col md:flex-row">
          
          {/* Contact Info Sidebar */}
          <div className="md:w-1/3 bg-eco-primary/5 p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-100">
            <div>
              <h2 className="text-3xl font-black text-eco-text tracking-tight mb-4">Let's Talk</h2>
              <p className="text-eco-muted font-medium leading-relaxed">
                Have a question or feedback? We'd love to hear from you. Our team usually responds within 24 hours.
              </p>
            </div>

            <div className="mt-10 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-eco-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <span className="text-eco-text font-bold text-sm">support@ecocollectors.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-eco-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <span className="text-eco-text font-bold text-sm">Haifa, Israel</span>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="md:w-2/3 p-10 bg-white/40">
            <h1 className="text-2xl font-black text-eco-text mb-8">Send us a message</h1>
            
            <form ref={form} onSubmit={handleSendEmail} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-bold text-eco-text ml-1">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="name@domain.com"
                  className="w-full px-5 py-3.5 bg-white/50 rounded-2xl border border-gray-200 focus:border-eco-primary focus:ring-4 focus:ring-eco-primary/10 outline-none transition-all duration-300 font-medium placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-bold text-eco-text ml-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="How can we help you?"
                  className="w-full px-5 py-3.5 bg-white/50 rounded-2xl border border-gray-200 focus:border-eco-primary focus:ring-4 focus:ring-eco-primary/10 outline-none transition-all duration-300 font-medium placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-bold text-eco-text ml-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  required
                  placeholder="Tell us more about your request..."
                  className="w-full px-5 py-3.5 bg-white/50 rounded-2xl border border-gray-200 focus:border-eco-primary focus:ring-4 focus:ring-eco-primary/10 outline-none transition-all duration-300 font-medium placeholder:text-gray-400 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full btn-primary !py-4 shadow-xl shadow-eco-primary/20 flex items-center justify-center space-x-2 group active:scale-[0.98]"
              >
                <span className="text-lg">{isSending ? "Sending Message..." : "Send Message"}</span>
                {!isSending && (
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
