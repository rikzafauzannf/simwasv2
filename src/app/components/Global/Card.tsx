'use client';

import Link from 'next/link';
import React from 'react';

interface Props {
  Header: string;
  Count: number;
  imgurl?: string;
}
interface PropsComponent {
  children: React.ReactNode;
}
interface PropsHeading {
  Header: string;
  children: React.ReactNode;
}

export const CardComponents: React.FC<PropsComponent> = ({ children }) => {
  return (
    <div className="w-full rounded-md shadow-md p-6 bg-white space-y-2 overflow-hidden">
      {children}
    </div>
  );
};

export const CardHeaderContent: React.FC<PropsHeading> = ({
  Header,
  children,
}) => {
  return (
    <>
      <div className="w-full rounded-md shadow-md p-6 bg-white space-y-2">
        <p>{Header}</p>
        <hr />
        {children}
      </div>
    </>
  );
};

export const CardAccumulate: React.FC<Props> = ({ Header, Count, imgurl }) => {
  return (
    <>
      <div className="w-full rounded-md shadow-md p-6 bg-white space-y-2">
        <div className="flex gap-3">
          <img src={imgurl} className="w-[100px]" />
          <div className="p-4">
            <h2 className="text-left text-4xl font-black text-teal-500">
              {Count}
            </h2>
            <h3 className="text-neutral-500">{Header}</h3>
          </div>
        </div>
      </div>
    </>
  );
};
