
import React from 'react';

export default function Step4ReviewMFA({ form, onChange, onSubmit, inputClass, onSkip }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Review & MFA</h2>
      <div className="bg-gray-100 rounded p-4 text-sm">
        <div><b>Username:</b> {form.username}</div>
        <div><b>Email:</b> {form.email}</div>
        <div><b>Address:</b> {form.address}</div>
        <div><b>City:</b> {form.city}</div>
        <div><b>State:</b> {form.state}</div>
        <div><b>Country:</b> {form.country}</div>
        <div><b>PAN:</b> {form.pan}</div>
        <div><b>Phone:</b> {form.phone}</div>
      </div>
      <label className="flex items-center space-x-2">
        <input type="checkbox" name="mfa" checked={form.mfa} onChange={onChange} className={typeof inputClass === 'function' ? inputClass('mfa') : inputClass} />
        <span>Enable Multi-Factor Authentication (MFA)</span>
      </label>
      {form.mfa && (
        <div>
          <label>
            Enter MFA Code:
            <input
              type="text"
              name="mfaCode"
              value={form.mfaCode || ""}
              onChange={onChange}
              className={typeof inputClass === 'function' ? inputClass('mfaCode') : inputClass}
            />
          </label>
        </div>
      )}
      <div className="flex space-x-2">
        <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded" onClick={onSubmit}>Submit</button>
        <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onSkip}>Skip Now</button>
      </div>
    </div>
  );
}
