import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [mode, setMode] = useState('root'); // 'root' or 'alias'
  const [step, setStep] = useState(0); // for root: 0=email/captcha, 1=password, 2=mfa
  const [form, setForm] = useState({
    email: '',
    password: '',
    captcha: '',
    mfa: '',
    accountId: '',
    aliasUsername: '',
    aliasPassword: '',
    aliasCaptcha: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  }

  function handleModeChange(e) {
    setMode(e.target.value);
    setStep(0);
    setError('');
  }

  function handleNext(e) {
    e && e.preventDefault();
    // Validation for each step
    if (mode === 'root') {
      if (step === 0) {
        if (!form.email) return setError('Email required');
        if (!form.captcha) return setError('Captcha required');
        setStep(1);
      } else if (step === 1) {
        if (!form.password) return setError('Password required');
        setStep(2);
      } else if (step === 2) {
        // MFA is optional for now
        // Simulate sign in
        alert('Signed in as Root User! (simulate backend call)');
        navigate('/');
      }
    } else {
      // alias mode
      if (!form.accountId) return setError('Account ID or Alias required');
      if (!form.aliasUsername) return setError('Username required');
      if (!form.aliasPassword) return setError('Password required');
      if (!form.aliasCaptcha) return setError('Captcha required');
      // Simulate sign in
      alert('Signed in as IAM-like Account! (simulate backend call)');
      navigate('/');
    }
  }

  function handleForgot(type) {
    alert(type === 'username' ? 'Forgot Username flow' : 'Forgot Password flow');
  }

  // UI for root user steps
  function renderRootStep() {
    if (step === 0) {
      return (
        <>
          <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 border-gray-300" />
          <input name="captcha" placeholder="Enter Captcha" value={form.captcha} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 border-gray-300" />
          {/* TODO: Add real captcha here */}
          <button type="button" className="w-full px-6 py-2 rounded-lg bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition mt-2" onClick={handleNext}>Next</button>
        </>
      );
    } else if (step === 1) {
      return (
        <>
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 border-gray-300" />
          <button type="button" className="w-full px-6 py-2 rounded-lg bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition mt-2" onClick={handleNext}>Next</button>
        </>
      );
    } else if (step === 2) {
      return (
        <>
          <input name="mfa" placeholder="MFA Code (if enabled)" value={form.mfa} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 border-gray-300" />
          <button type="button" className="w-full px-6 py-2 rounded-lg bg-green-600 text-white font-bold shadow hover:bg-green-700 transition mt-2" onClick={handleNext}>Sign In</button>
        </>
      );
    }
  }

  // UI for alias/iam user
  function renderAliasStep() {
    return (
      <>
        <input name="accountId" placeholder="Account ID or Alias" value={form.accountId} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 border-gray-300" />
        <input name="aliasUsername" placeholder="Username" value={form.aliasUsername} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 border-gray-300" />
        <input name="aliasPassword" type="password" placeholder="Password" value={form.aliasPassword} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 border-gray-300" />
        <input name="aliasCaptcha" placeholder="Enter Captcha" value={form.aliasCaptcha} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 border-gray-300" />
        {/* TODO: Add real captcha here */}
        <button type="button" className="w-full px-6 py-2 rounded-lg bg-green-600 text-white font-bold shadow hover:bg-green-700 transition mt-2" onClick={handleNext}>Sign In</button>
      </>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <form className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">Sign In to Your Cloud Platform</h2>
        <div className="flex gap-4 mb-2">
          <label className="flex items-center gap-1">
            <input type="radio" value="root" checked={mode === 'root'} onChange={handleModeChange} />
            Root User
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" value="alias" checked={mode === 'alias'} onChange={handleModeChange} />
            Account ID or Alias
          </label>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {mode === 'root' ? renderRootStep() : renderAliasStep()}
        <div className="flex flex-col gap-2 mt-4 text-sm">
          {mode === 'root' && step === 0 && (
            <button type="button" className="text-blue-600 underline text-left" onClick={() => handleForgot('password')}>Forgot Password?</button>
          )}
          {mode === 'alias' && (
            <>
              <button type="button" className="text-blue-600 underline text-left" onClick={() => handleForgot('username')}>Forgot Username?</button>
              <button type="button" className="text-blue-600 underline text-left" onClick={() => handleForgot('password')}>Forgot Password?</button>
            </>
          )}
          {mode === 'root' && (
            <button type="button" className="text-blue-600 underline text-left" onClick={() => navigate('/signup')}>Create a New Account</button>
          )}
          <button type="button" className="text-blue-600 underline text-left" onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </form>
    </div>
  );
}
