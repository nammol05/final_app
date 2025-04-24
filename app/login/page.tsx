'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; 

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false); // New state for tracking login success
  const [showPassword, setShowPassword] = useState(false); // For password visibility

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      router.push('/customerinventory');
    }
  }, [router, loginSuccess]); // Re-run effect when loginSuccess changes

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('The email format is incorrect.');
      return;
    }

    if (!email || !password) {
      setErrorMessage('Email and Password are required!');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Login failed');
      }

      const data = await res.json();
      sessionStorage.setItem('authToken', data.access_token);
      setLoginSuccess(true); // Set loginSuccess to true upon successful login
      // router.push('/customerinventory'); // The useEffect will handle the redirection now
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

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
              <h2 className="text-3xl lg:text-5xl font-semibold leading-tight">Welcome Back,</h2>
              <h2 className="text-3xl lg:text-5xl font-semibold leading-tight">Let’s Sign You In</h2>
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
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Login to your account</h1>
            <p className="text-gray-400 mb-8 text-base lg:text-lg">
              Don’t have an account? <a href="/register" className="text-white hover:underline">Sign up</a>
            </p>

            {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1c1c24] text-white text-base lg:text-lg rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1c1c24] text-white text-base lg:text-lg rounded-lg p-4 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-white focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white text-lg font-medium rounded-lg p-4 hover:bg-purple-700 transition-colors"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

              <p className="text-center text-gray-500 text-sm mt-4">
                Forgot your password? <a href="#" className="text-white hover:underline">Reset it</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;