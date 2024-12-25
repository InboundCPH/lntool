import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export const TextInput: React.FC<TextInputProps> = ({ value, onChange, label }) => {
  return (
    <div className="w-full">
      <label className="block text-gray-700 text-lg mb-2">{label}</label>
      <textarea
        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 min-h-[150px] font-sans"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type or paste your text here..."
      />
    </div>
  );
};