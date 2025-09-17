import React, { useMemo } from 'react';

export default function Step3AddressPhone({ form, errors, onChange, icon, inputClass }) {
  // List of Indian states and UTs
  const indianStatesAndUTs = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands (Port Blair)', 'Chandigarh (Chandigarh)', 'Dadra and Nagar Haveli and Daman and Diu (Daman)', 'Delhi (New Delhi)', 'Jammu and Kashmir (Srinagar - Summer, Jammu - Winter)', 'Ladakh (Leh)', 'Lakshadweep (Kavaratti)', 'Puducherry (Puducherry)'
  ];
  // Memoized state options based on country
  const stateOptions = useMemo(() => {
    if (form.country === 'India') return indianStatesAndUTs;
    if (form.country === 'USA') return ['California', 'Texas', 'New York', 'Florida', 'Other'];
    if (form.country === 'UK') return ['England', 'Scotland', 'Wales', 'Northern Ireland', 'Other'];
    if (form.country === 'Other') return ['Other'];
    return [];
  }, [form.country]);
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Address & Phone</h2>
      <input name="address" value={form.address} onChange={onChange} onBlur={onChange} placeholder="Address" className={inputClass('address')} />
      {icon('address')}
      {errors.address && <div className="text-red-500 text-xs">{errors.address}</div>}
      <input name="city" value={form.city} onChange={onChange} onBlur={onChange} placeholder="City" className={inputClass('city')} />
      {icon('city')}
      {errors.city && <div className="text-red-500 text-xs">{errors.city}</div>}
      <select name="country" value={form.country} onChange={onChange} onBlur={onChange} className={inputClass('country')}>
        <option value="">Select Country</option>
        <option value="India">India</option>
        <option value="USA">USA</option>
        <option value="UK">UK</option>
        <option value="Other">Other</option>
      </select>
      {icon('country')}
      {errors.country && <div className="text-red-500 text-xs">{errors.country}</div>}
      <select name="state" value={form.state} onChange={onChange} onBlur={onChange} className={inputClass('state')}>
        <option value="">Select State/UT</option>
        {stateOptions.map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
      {icon('state')}
      {errors.state && <div className="text-red-500 text-xs">{errors.state}</div>}
      <input name="pan" value={form.pan} onChange={onChange} onBlur={onChange} placeholder="PAN Card" className={inputClass('pan')} />
      {icon('pan')}
      {errors.pan && <div className="text-red-500 text-xs">{errors.pan}</div>}
      <input name="phone" value={form.phone} onChange={onChange} onBlur={onChange} placeholder="Phone Number" className={inputClass('phone')} />
      {icon('phone')}
      {errors.phone && <div className="text-red-500 text-xs">{errors.phone}</div>}
    </div>
  );
}
