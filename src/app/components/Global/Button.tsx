// 'use client';

import { Button } from 'flowbite-react';
import Link from 'next/link';
import React from 'react';

interface Props {
  Text: string;
  type: 'button' | 'submit' | 'reset';
}

interface PropsLink {
  Text: string;
  linkTo: string;
}

export const ButtonComponent: React.FC<Props> = ({ Text, ...props }) => {
  return (
    <Button
      className="px-6 py-2 text-white bg-primary hover:bg-lightprimary rounded-md shadow-md transition-all ease-in-out"
      {...props}
    >
      {Text}
    </Button>
  );
};

export const ButtonLinkComponent: React.FC<PropsLink> = ({ linkTo, Text }) => {
  return (
    <>
      <Link
        className="px-6 py-2 text-white bg-primary hover:bg-lightprimary rounded-md shadow-md transition-all ease-in-out w-full"
        href={linkTo}
      >
        {Text}
      </Link>
    </>
  );
};

// button type
export const ButtonType: React.FC<Props> = ({ type, Text }) => {
  return (
    <Button
      type={type}
      className={`w-full shadow-md ${type === 'submit' ? 'bg-[#14ae5c] hover:bg-[#267a59]' : 'bg-red-800 hover:bg-red-600'} font-semibold hover:font-bold`}
    >
      {Text}
    </Button>
  );
};
