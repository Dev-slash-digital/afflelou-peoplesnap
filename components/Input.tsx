import React from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'date' | 'number';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  label?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  className = '',
  label,
}) => {
  const baseStyles = 'input-text w-full px-4 py-3 bg-white text-black border-none outline-none transition-all duration-200 focus:ring-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed';
  const dateStyles = type === 'date' ? 'text-sm' : '';

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium text-white">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`${baseStyles} ${dateStyles} ${className}`}
      />
    </div>
  );
};
