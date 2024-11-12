'use client';

import React from 'react';

interface Props {
  Header: string;
  Count: number;
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

export const CardAccumulate: React.FC<Props> = ({ Header, Count }) => {
  return (
    <div className="w-full rounded-md shadow-md p-6 bg-white space-y-2">
      <h3>{Header}</h3>
      <hr />
      <h2 className="text-center text-3xl">{Count}</h2>
    </div>
  );
};
