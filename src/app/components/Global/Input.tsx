'use client';

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import React, { useState } from 'react';

interface DataProps {
  id: number;
  name: string;
}

interface Props {
  label: string;
  identiti: string;
  name: string;
  type: string;
  placeholder: string;
}

interface PropSelect {
  data: DataProps[];
}

// global type
export const InputFiledComponent: React.FC<Props> = ({
  label,
  identiti,
  name,
  type,
  placeholder,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={identiti} className="text-slate-800">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={identiti}
        placeholder={placeholder}
        className="border border-b-2 border-t-0 border-l-0 border-r-0 shadow-md border-slate-600 text-black bg-slate-200/25"
      />
    </div>
  );
};

// select type
export const SelectField: React.FC<PropSelect> = ({ data }) => {
  const [selecteddata, setSelecteddata] = useState<DataProps | null>(data[0]);
  const [query, setQuery] = useState('');

  const filteredData =
    query === ''
      ? data
      : data.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });
  return (
    <Combobox
      value={selecteddata}
      onChange={setSelecteddata}
      onClose={() => setQuery('')}
    >
      <ComboboxInput
        aria-label="Assignee"
        displayValue={(selected: DataProps | null) => selected?.name || ''}
        onChange={(event) => setQuery(event.target.value)}
      />
      <ComboboxOptions anchor="bottom" className="border empty:invisible">
        {filteredData.map((items) => (
          <ComboboxOption
            key={items.id}
            value={items}
            className="data-[focus]:bg-blue-100"
          >
            {items.name}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
};
