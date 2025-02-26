'use client';

import { Card } from 'flowbite-react';
import Image from 'next/image';
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
    <Card className="w-full shadow-md bg-white space-y-2 overflow-hidden">
      {children}
    </Card>
  );
};

export const CardHeaderContent: React.FC<PropsHeading> = ({
  Header,
  children,
}) => {
  return (
    <>
      <Card className="w-full shadow-md bg-white space-y-2">
        <p>{Header}</p>
        <hr />
        {children}
      </Card>
    </>
  );
};

export const CardAccumulate: React.FC<Props> = ({ Header, Count, imgurl }) => {
  return (
    <>
      <Card className="w-full  shadow-md  bg-white space-y-2">
        <div className="flex items-center">
          {imgurl && (
            <Image
              src={imgurl}
              alt="img-icons"
              width={40}
              height={40}
              className="w-14 md:w-20 h-14 md:h-20"
            />
          )}

          <div className="p-4">
            <h2 className="text-left md:text-4xl text-2xl font-black text-teal-500">
              {Count}
            </h2>
            <h3 className="text-neutral-500 text-sm md:text-base">{Header}</h3>
          </div>
        </div>
      </Card>
    </>
  );
};
