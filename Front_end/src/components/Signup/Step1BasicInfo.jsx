
import { useNavigate } from 'react-router-dom';

export default function Step1BasicInfo({ form, errors, onChange, icon, inputClass }) {
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Sign Up - User Info</h2>
      <div className="flex items-center">
        <input name="username" value={form.username} onChange={onChange} onBlur={onChange} placeholder="Username" className={inputClass('username')} />
        {icon('username')}
      </div>
      {errors.username && <div className="text-red-500 text-xs">{errors.username}</div>}
      <div className="flex items-center">
        <input name="email" value={form.email} onChange={onChange} onBlur={onChange} placeholder="Email" className={inputClass('email')} />
        {icon('email')}
      </div>
      {errors.email && <div className="text-red-500 text-xs">{errors.email}</div>}
      {/* Password fields removed for new step order */}
      <button type="button" className="text-blue-600 underline text-sm" onClick={() => navigate('/signin')}>I have account, SignIN</button>
    </div>
  );
}
