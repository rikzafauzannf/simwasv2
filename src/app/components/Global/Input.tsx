'use client';

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import React, { useState } from 'react';
import {
  useForm,
  SubmitHandler,
  FieldError,
  UseFormRegister,
} from 'react-hook-form';

// interface Props {
//   label: string;
//   identiti: string;
//   name: string;
//   type: string;
//   placeholder: string;
// }

// interface PropSelect {
//   data: DataProps[];
// }

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
      <input
        id={identiti}
        type={type}
        placeholder={placeholder}
        {...register}
        disabled={disabled}
        className={`border border-b-2 border-t-0 border-l-0 border-r-0 shadow-md border-slate-600  
          ${disabled ? 'bg-gray-100 text-[#b3b3b3]' : 'bg-white/50 text-black'} 
          ${error ? 'border-red-500' : ''}`}
      />
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
};

// select type
// export const SelectField: React.FC<PropSelect> = ({ data }) => {
//   const [selecteddata, setSelecteddata] = useState<DataProps | null>(data[0]);
//   const [query, setQuery] = useState('');

//   const filteredData =
//     query === ''
//       ? data
//       : data.filter((item) => {
//           return item.name.toLowerCase().includes(query.toLowerCase());
//         });
//   return (
//     <Combobox
//       value={selecteddata}
//       onChange={setSelecteddata}
//       onClose={() => setQuery('')}
//     >
//       <ComboboxInput
//         aria-label="Assignee"
//         displayValue={(selected: DataProps | null) => selected?.name || ''}
//         onChange={(event) => setQuery(event.target.value)}
//       />
//       <ComboboxOptions anchor="bottom" className="border empty:invisible">
//         {filteredData.map((items) => (
//           <ComboboxOption
//             key={items.id}
//             value={items}
//             className="data-[focus]:bg-blue-100"
//           >
//             {items.name}
//           </ComboboxOption>
//         ))}
//       </ComboboxOptions>
//     </Combobox>
//   );
// };

export const SelectInputField: React.FC<SelectFieldProps> = ({
  label,
  identiti,
  options,
  register,
  error,
  placeholder,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={identiti} className="text-slate-800">
        {label}
      </label>
      <select
        id={identiti}
        {...register}
        className="border border-b-2 border-t-0 border-l-0 border-r-0 shadow-md border-slate-600 text-black bg-white/50 flex-1 "
      >
        <option value="" disabled selected>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
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
