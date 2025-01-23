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
    <section className="bg-white dark:bg-gray-800">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Got a technical issue? Want to send feedback about a beta feature?
          Need details about our Business plan? Let us know.
        </p>
        <form
          ref={form}
          onSubmit={handleSendEmail}
          action="#"
          className="space-y-8"
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="name@domain.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Let us know how we can help you"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Your message
            </label>
            <textarea
              id="message"
              name="message"
              cols="30"
              rows="10"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Leave a comment..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSending}
            className="text-sm font-medium leading-6 text-gray-900 rounded-lg shadow-md focus:outline-none w-full h-12 transition-colors duration-150 ease-in-out bg-gray-700  dark:text-white hover:bg-gray-600 hover:text-primary-500"
          >
            {isSending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
