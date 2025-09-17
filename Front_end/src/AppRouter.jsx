import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Landing from './components/Landing';
import SignupWrapper from './components/Signup/SignupWrapper';
import SignIn from './components/SignIn';
import Console from './components/Console';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignupWrapper />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/console" element={<Console />} />
        <Route path="/computing" element={<div className='min-h-screen flex items-center justify-center text-2xl'>Computing Service (Coming Soon)</div>} />
        <Route path="/storage" element={<div className='min-h-screen flex items-center justify-center text-2xl'>Storage Service (Coming Soon)</div>} />
      </Routes>
    </BrowserRouter>
  );
}
