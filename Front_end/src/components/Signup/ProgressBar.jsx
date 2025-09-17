import React from 'react';

// ProgressBar component displays the signup steps visually.
// The size of each step is controlled by Tailwind classes w-2 h-2 (0.5rem = 8px).
// To change the size, adjust w-2 and h-2 to desired values (e.g., w-4 h-4 for 1rem).
export default function ProgressBar({ steps, step }) {
  return (
    <ol className="space-y-8 w-full">
      {steps.map((label, idx) => (
        <li key={label} className="flex items-center gap-4">
          <span className={`w-2 h-2 flex items-center justify-center rounded-full border-2 text-base font-bold transition-all duration-300
            ${idx < step ? 'bg-blue-500 border-blue-700 text-white' : idx === step ? 'bg-blue-500 border-blue-700 text-white' : 'bg-black border-black text-white'}`}
          >
            {idx < step || idx === step ? (
              <svg className="w-2 h-2" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 20 20">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : idx + 1}
          </span>
          <span className={`text-lg ${idx === step ? 'font-bold text-blue-700' : idx < step ? 'text-blue-500' : 'text-gray-700'}`}>{label}</span>
        </li>
      ))}
    </ol>
  );
}

// steps: array of step labels
// step: current step index (0-based)

