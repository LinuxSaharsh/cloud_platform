import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-xl w-full flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-4">Welcome to Cloud Platform</h1>
        <p className="text-gray-700 text-lg mb-8 text-center">A modern cloud platform offering secure, scalable <b>Compute</b> and <b>Storage</b> services for your business. Sign up to get started or sign in to your account.</p>
        <div className="flex gap-6 w-full justify-center">
          <button className="px-8 py-3 rounded-lg bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition w-40" onClick={() => navigate('/signup')}>Sign Up</button>
          <button className="px-8 py-3 rounded-lg bg-white border border-blue-600 text-blue-700 font-bold shadow hover:bg-blue-50 transition w-40" onClick={() => navigate('/signin')}>Sign In</button>
        </div>
      </div>
    </div>
  );
}
