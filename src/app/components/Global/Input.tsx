'use client';

import { Select, TextInput } from 'flowbite-react';
import React from 'react';
import { FieldError } from 'react-hook-form';

// global type
interface InputFieldProps {
  label: string;
  identiti: string;
  type: string;
  name: string;
  placeholder: string;
  register: any;
  error?: FieldError;
  disabled?: boolean;
}

interface DataProps {
  value: string;
  title: string;
}

interface SelectFieldProps extends InputFieldProps {
  options: DataProps[];
  disabled?: boolean;
}

interface TextAreaFieldProps extends InputFieldProps {
  rows?: number;
}

export const InputFieldComponent: React.FC<InputFieldProps> = ({
  label,
  identiti,
  type,
  name,
  placeholder,
  register,
  error,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={identiti} className="text-slate-800">
        {label}
      </label>
      <TextInput
        id={identiti}
        type={type}
        placeholder={placeholder}
        {...register}
        disabled={disabled}
        // className={`border border-b-2 border-t-0 border-l-0 border-r-0 shadow-md border-slate-600  
        //   ${disabled ? 'bg-gray-100 text-[#b3b3b3]' : 'bg-white/50 text-black'} 
        //   ${error ? 'border-red-500' : ''}`}
        className="form-control form-rounded-xl flex-1"
      />
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
};

export const SelectInputField: React.FC<SelectFieldProps> = ({
  label,
  identiti,
  options,
  register,
  error,
  placeholder,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={identiti} className="text-slate-800">
        {label}
      </label>
      <Select
        id={identiti}
        {...register}
        disabled={disabled}
        // className={`border border-b-2 border-t-0 border-l-0 border-r-0 shadow-md border-slate-600 flex-1
        //   ${disabled ? 'bg-gray-100 text-[#b3b3b3]' : 'bg-white/50 text-black'}`}
        className="select-rounded"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </Select>
      {error && (
        <span className="text-red-500 font-semibold">{error.message}</span>
      )}
    </div>
  );
};

export const TextAreaFieldComponent: React.FC<TextAreaFieldProps> = ({
  label,
  identiti,
  placeholder,
  register,
  error,
  disabled = false,
  rows = 4,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={identiti} className="text-slate-800">
        {label}
      </label>
      <textarea
        id={identiti}
        placeholder={placeholder}
        {...register}
        disabled={disabled}
        rows={rows}
        className={`border border-b-2 rounded-[8px] shadow-md border-slate-600  
          ${disabled ? 'bg-gray-100 text-[#b3b3b3]' : 'bg-white/50 text-black'} 
          ${error ? 'border-red-500' : ''}`}
      />
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
};
