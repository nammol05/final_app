import React from 'react';

const CreateAccount = () => {
  return (
    <div className="bg-[#1c1c24] min-h-screen flex items-center justify-center px-6 py-14 font-sans">
      <div className="w-full max-w-screen-xl bg-[#13131a] rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left Section */}
        <div className="relative w-full lg:w-1/2 h-96 lg:h-auto flex-shrink-0">
          <a href="#" className="absolute top-6 left-6 text-white text-2xl font-bold z-10">NOP</a>
          <a
            href="#"
            className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm hover:bg-white/20 transition-colors z-10"
          >
            Back to website →
          </a>

          <div className="relative h-full">
            <div className="absolute inset-0 bg-gray-700" />
            <div className="absolute inset-0 bg-purple-900/30" />
            <div className="absolute bottom-10 left-8 right-8 text-white">
              <h2 className="text-3xl lg:text-5xl font-semibold leading-tight">Capturing Moments,</h2>
              <h2 className="text-3xl lg:text-5xl font-semibold leading-tight">Creating Memories</h2>
              <div className="flex gap-2 mt-6">
                <div className="w-5 h-1 bg-white/30 rounded"></div>
                <div className="w-5 h-1 bg-white/30 rounded"></div>
                <div className="w-5 h-1 bg-white rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16">
          <div className="max-w-md mx-auto">
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Create an account</h1>
            <p className="text-gray-400 mb-8 text-base lg:text-lg">
              Already have an account? <a href="http://localhost:3001/login" className="text-white hover:underline">Log in</a>
            </p>

            <form className="space-y-5">
              {/* Username */}
              <input
                type="text"
                placeholder="Username"
                className="w-full bg-[#1c1c24] text-white text-base lg:text-lg rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />

              {/* Password */}
              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-[#1c1c24] text-white text-base lg:text-lg rounded-lg p-4 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7s-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>

              {/* Email */}
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-[#1c1c24] text-white text-base lg:text-lg rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />

              {/* Checkbox */}
              <label className="flex items-start gap-2 cursor-pointer text-base lg:text-lg">
                <input
                  type="checkbox"
                  className="mt-1 rounded bg-[#1c1c24] border-gray-600 text-purple-600 focus:ring-purple-600"
                />
                <span className="text-gray-400">
                  I agree to the <a href="#" className="text-white hover:underline">Terms & Conditions</a>
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-purple-600 text-white text-lg font-medium rounded-lg p-4 hover:bg-purple-700 transition-colors"
              >
                Create account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
