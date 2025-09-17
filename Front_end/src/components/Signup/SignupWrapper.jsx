import React, { useState } from 'react';
import Step1BasicInfo from './Step1BasicInfo';
import Step2Otp from './Step2Otp';
import Step3AddressPhone from './Step3AddressPhone';
import Step4ReviewMFA from './Step4ReviewMFA';
import StepSetPassword from './StepSetPassword';
import ProgressBar from './ProgressBar';

const steps = [
  'Basic Details',
  'OTP Verification',
  'Set Password',
  'Address & KYC',
  'Review & MFA',
];

export default function SignupWrapper() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    otp: '',
    address: '',
    city: '',
    country: '',
    state: '',
    pan: '',
  mfa: false,
  mfaCode: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ...handlers and validation logic will go here...

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Step1BasicInfo form={form} errors={errors} onChange={handleChange} icon={icon} inputClass={inputClass} goToSignIn={() => {}} />;
      case 1:
        return <Step2Otp form={form} errors={errors} onChange={handleChange} inputClass={inputClass} otpTimer={0} setOtpTimer={() => {}} setForm={setForm} />;
      case 2:
        return <StepSetPassword form={form} errors={errors} onChange={handleChange} inputClass={inputClass} />;
      case 3:
        return <Step3AddressPhone form={form} errors={errors} onChange={handleChange} icon={icon} inputClass={inputClass} />;
      case 4:
        return (
          <Step4ReviewMFA
            form={form}
            errors={errors}
            onChange={handleChange}
            onSubmit={handleSubmit}
            inputClass={inputClass}
            onSkip={handleSkipMFA}
          />
        );
  // Handler for skipping MFA
  const handleSkipMFA = () => {
    setForm((prev) => ({ ...prev, mfa: false, mfaCode: '' }));
    handleSubmit();
  };
      default:
        return null;
    }
  };

  // Input class for error highlighting
  const inputClass = (field) =>
    `border rounded px-3 py-2 w-full focus:outline-none ${errors[field] ? 'border-red-500' : 'border-gray-300'}`;

  // Icon placeholder (can be replaced with actual icons)
  const icon = (field) => null;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };
  // Step validation logic
  const validateStep = () => {
    const newErrors = {};
    if (step === 0) {
      if (!form.username) newErrors.username = 'Username required';
      if (!form.email) newErrors.email = 'Email required';
      // Basic email regex
      if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = 'Invalid email';
    } else if (step === 1) {
      if (!form.otp || form.otp.length !== 4) newErrors.otp = 'Enter 4-digit OTP';
    } else if (step === 2) {
      if (!form.password) newErrors.password = 'Password required';
      if (!form.confirmPassword) newErrors.confirmPassword = 'Confirm your password';
      if (form.password && form.confirmPassword && form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    } else if (step === 3) {
      if (!form.address) newErrors.address = 'Address required';
      if (!form.city) newErrors.city = 'City required';
      if (!form.country) newErrors.country = 'Country required';
      if (!form.state) newErrors.state = 'State required';
      if (!form.pan) newErrors.pan = 'PAN required';
      if (!form.phone) newErrors.phone = 'Phone required';
      if (form.phone && !/^\d{10}$/.test(form.phone)) newErrors.phone = 'Invalid phone';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation handlers
  const handleNext = () => {
    if (validateStep()) setStep((s) => s + 1);
  };

  const handleSubmit = () => {
    if (validateStep()) {
      setLoading(true);
      // Simulate submit
      setTimeout(() => {
        setLoading(false);
        alert('Signup successful!');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-3xl overflow-hidden">
        {/* Stepper */}
        <div className="md:w-1/3 w-full bg-gradient-to-b from-blue-50 to-blue-200 p-8 flex flex-col items-center md:items-start">
          <ProgressBar steps={steps} step={step} />
        </div>
        {/* Form Content */}
        <div className="md:w-2/3 w-full p-8 flex flex-col justify-center">
          {renderStep()}
          <div className="flex justify-between mt-8">
            {step > 0 && (
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => setStep((s) => s - 1)}
                disabled={loading}
              >
                Back
              </button>
            )}
            {step < steps.length - 1 && (
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded ml-auto"
                onClick={handleNext}
                disabled={loading}
              >
                Next
              </button>
            )}
            {step === steps.length - 1 && (
              <button
                className="bg-green-600 text-white px-4 py-2 rounded ml-auto"
                onClick={handleSubmit}
                disabled={loading}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Step validation logic and navigation handlers moved above return

// (No code below this line)
