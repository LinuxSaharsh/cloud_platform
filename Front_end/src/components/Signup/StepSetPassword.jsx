import React from 'react';

export default function StepSetPassword({ form, errors, onChange, inputClass }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Set Password</h2>
      <div className="flex items-center">
        <input type="password" name="password" value={form.password || ''} onChange={onChange} onBlur={onChange} placeholder="Password" className={inputClass('password')} />
      </div>
      {errors.password && <div className="text-red-500 text-xs">{errors.password}</div>}
      <div className="flex items-center">
        <input type="password" name="confirmPassword" value={form.confirmPassword || ''} onChange={onChange} onBlur={onChange} placeholder="Confirm Password" className={inputClass('confirmPassword')} />
      </div>
      {errors.confirmPassword && <div className="text-red-500 text-xs">{errors.confirmPassword}</div>}
    </div>
  );
}
