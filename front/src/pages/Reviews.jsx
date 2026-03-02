import React, { useState } from "react";
import { Send, User, Mail, MessageSquare, CheckCircle2 } from "lucide-react";
import Navbar from "../components/Navbar";
import API from "../api/api";
const Reviews = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.post("/feedback", form);

      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setForm({
          name: "",
          email: "",
          message: ""
        });
      }, 3000);

    } catch {

      alert("Error sending feedback");

    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-[#FDF9F0] flex items-center justify-center ">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl w-full items-center">

        {/* LEFT SIDE TEXT */}

        <div className="space-y-8">

          <h1 className="text-5xl font-semibold text-gray-900 leading-tight">
            Review Us
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            Help us improve the platform by sharing your valuable feedback.
            Your suggestions help us build a better experience for developers
            preparing for coding interviews and daily DSA practice.
          </p>

          <p className="text-gray-500">
            Whether it's a feature request, improvement idea, or something you
            loved about the platform — we'd love to hear it.
          </p>

        </div>


        {/* RIGHT SIDE CARD */}

        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">

          {submitted ? (

            <div className="flex flex-col items-center justify-center py-12 animate-in fade-in duration-500">

              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-in zoom-in duration-300">
                <CheckCircle2 size={40} className="text-green-500" />
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Thank You!
              </h3>

              <p className="text-gray-500">
                Your feedback has been sent successfully
              </p>

            </div>

          ) : (

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* NAME */}

              <div className="group">

                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Your Name
                </label>

                <div className="relative">

                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-400"
                    size={18}
                  />

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                  />

                </div>

              </div>


              {/* EMAIL */}

              <div className="group">

                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Your Email
                </label>

                <div className="relative">

                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-400"
                    size={18}
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                  />

                </div>

              </div>


              {/* MESSAGE */}

              <div className="group">

                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Your Feedback
                </label>

                <div className="relative">

                  <MessageSquare
                    className="absolute left-4 top-4 text-gray-400 group-focus-within:text-yellow-400"
                    size={18}
                  />

                  <textarea
                    name="message"
                    placeholder="Share your thoughts with us..."
                    value={form.message}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl h-32 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                  />

                </div>

              </div>


              {/* BUTTON */}

              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-yellow-400 hover:text-gray-900 transition-all"
              >
                <span>Send Feedback</span>
                <Send size={18} />
              </button>

            </form>

          )}

        </div>

      </div>

    </div>
</>
  );

};

export default Reviews;
