
import React, { useRef, useEffect, useState } from 'react';

export default function Step2Otp({ form, errors, onChange, inputClass, otpTimer, setOtpTimer, setForm, onVerified }) {
  const otpInputRef = useRef(null);
  const [otpError, setOtpError] = useState('');

  useEffect(() => {
    if (otpInputRef.current) otpInputRef.current.focus();
  }, []);

  const handleVerifyOtp = async () => {
    setOtpError('');
    try {
      const res = await fetch('http://localhost:8000/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, otp: form.otp })
      });
      const data = await res.json();
      if (data.verified) {
        setOtpError('');
        if (onVerified) onVerified();
      } else {
        setOtpError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setOtpError('Server error. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Verify OTP</h2>
      <div className="flex items-center">
        <input ref={otpInputRef} name="otp" value={form.otp} onChange={onChange} onBlur={onChange} maxLength={4} placeholder="Enter 4-digit OTP" className={inputClass('otp')} />
      </div>
      {(errors.otp || otpError) && <div className="text-red-500 text-xs">{errors.otp || otpError}</div>}
      <div className="text-sm text-gray-500">OTP sent to your email.</div>
      <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded mt-2" onClick={handleVerifyOtp}>Verify OTP</button>
      <button type="button" className="text-blue-600 text-xs mt-2" disabled={otpTimer > 0} onClick={() => { setOtpTimer(30); setForm(f => ({ ...f, otp: '' })); if (otpInputRef.current) otpInputRef.current.focus(); }}>Resend OTP {otpTimer > 0 ? `(${otpTimer}s)` : ''}</button>
    </div>
  );
}
