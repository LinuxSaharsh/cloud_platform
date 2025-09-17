import { useState, useRef } from 'react';
import Step1BasicInfo from './components/Signup/Step1BasicInfo';
import Step2Otp from './components/Signup/Step2Otp';
import Step3AddressPhone from './components/Signup/Step3AddressPhone';
import Step4ReviewMFA from './components/Signup/Step4ReviewMFA';

const steps = [
  'User Info',
  'OTP Verification',
  'Address & Phone',
  'Review & MFA',
];

function App() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    username: '',
    email: '',
    otp: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pan: '',
    phone: '',
    mfa: false,
  });
  const [touched, setTouched] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const otpInputRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [helloMsg, setHelloMsg] = useState("");

  // Fetch backend hello message on mount
  React.useEffect(() => {
    fetch("http://localhost:8000/hello")
      .then(res => res.json())
      .then(data => setHelloMsg(data.message))
      .catch(() => setHelloMsg("(Backend not reachable)"));
  }, []);

  // Handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validateStep = () => {
    let errs = {};
    if (step === 0) {
      if (!form.username) errs.username = 'Required';
      if (!form.email) errs.email = 'Required';
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = 'Invalid email';
    }
    if (step === 1) {
      if (!form.otp) errs.otp = 'Enter OTP';
      else if (!/^\d{4}$/.test(form.otp)) errs.otp = 'OTP must be 4 digits';
    }
    if (step === 2) {
      if (!form.address) errs.address = 'Required';
      if (!form.city) errs.city = 'Required';
      if (!form.state) errs.state = 'Required';
      if (!form.country) errs.country = 'Required';
      if (!form.pan) errs.pan = 'Required';
      if (!form.phone) errs.phone = 'Required';
      else if (!/^\d{10}$/.test(form.phone)) errs.phone = 'Invalid phone';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep((s) => s + 1);
    }, 700);
  };
  const inputClass = (name) =>
    `input ${touched[name] && (errors[name] ? 'border-red-400' : 'border-green-400')}`;
  const icon = (name) =>
    touched[name]
      ? errors[name]
        ? <span className="ml-2 text-red-500">❌</span>
        : <span className="ml-2 text-green-00">✅</span>
      : null;
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Step1BasicInfo
            form={form}
            errors={errors}
            onChange={handleChange}
            icon={icon}
            inputClass={inputClass}
            goToSignIn={() => alert('Go to Sign In')}
          />
        );
      case 1:
        return (
          <Step2Otp
            form={form}
            errors={errors}
            onChange={handleChange}
            icon={icon}
            inputClass={inputClass}
            otpTimer={otpTimer}
            setOtpTimer={setOtpTimer}
            setForm={setForm}
          />
        );
      case 2:
        return (
          <Step3AddressPhone
            form={form}
            errors={errors}
            onChange={handleChange}
            icon={icon}
            inputClass={inputClass}
          />
        );
      case 3:
        return (
          <Step4ReviewMFA
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            inputClass={inputClass}
          />
        );
      default:
        return null;
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="mb-4 text-center text-blue-700 font-bold text-lg">{helloMsg}</div>
      <div className="flex flex-col md:flex-row bg-transparent w-full max-w-3xl mx-auto">
        {/* Stepper Left Side */}
        <div className="md:w-1/3 w-full flex flex-col items-center md:items-start md:justify-center py-8">
          <ol className="space-y-8 w-full">
            {steps.map((label, idx) => (
              <li key={label} className="flex items-center gap-4">
                <span className={`w-7 h-7 flex items-center justify-center rounded-full border-2 text-base font-bold transition-all duration-300
                  ${idx < step ? 'bg-green-500 border-green-500 text-white' : idx === step ? 'bg-blue-500 border-blue-700 text-white' : 'bg-black border-black text-white'}`}
                >
                  {idx < step ? (
                    <span className="w-3 h-3 rounded-full bg-green-300 border border-white block"></span>
                  ) : idx + 1}
                </span>
                <span className={`text-lg ${idx === step ? 'font-bold text-blue-700' : idx < step ? 'text-green-700' : 'text-gray-700'}`}>{label}</span>
              </li>
            ))}
          </ol>
        </div>
        {/* Form Right Side */}
        <div className="md:w-2/3 w-full flex justify-center items-center">
          <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md space-y-8 border-2 border-red-500">
            {renderStep()}
            <div className="flex justify-between mt-8 gap-4">
              {step > 0 && (
                <button type="button" className="px-6 py-2 rounded-lg bg-white border border-blue-400 text-blue-700 font-semibold shadow hover:bg-blue-50 transition" onClick={handlePrev} disabled={loading}>
                  Back
                </button>
              )}
              {step < steps.length - 1 ? (
                <button type="button" className="px-6 py-2 rounded-lg bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition" onClick={handleNext} disabled={loading}>
                  {loading ? 'Loading...' : 'Next'}
                </button>
              ) : (
                <button type="submit" className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold shadow hover:from-blue-700 hover:to-blue-500 transition" disabled={loading}>
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
