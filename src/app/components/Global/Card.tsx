'use client';
import { Card } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

interface Props {
  Header: string;
  Count: number;
  imgurl?: string;
  color?: string;
}

interface PropsComponent {
  children: React.ReactNode;
  className?: string;
}

interface PropsHeading {
  Header: string;
  children: React.ReactNode;
  className?: string;
}

export const CardComponents: React.FC<PropsComponent> = ({
  children,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={`shadow-lg bg-white overflow-auto grid max-w-full transition-all duration-300
        ${isHovered ? 'shadow-xl translate-y-px' : 'shadow-md'}
        border-t-4 border-teal-500 rounded-lg ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Card>
  );
};

export const CardHeaderContent: React.FC<PropsHeading> = ({
  Header,
  children,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={`w-full shadow-md bg-white space-y-3 transition-all duration-300
        ${isHovered ? 'shadow-xl translate-y-px' : 'shadow-md'}
        border-l-4 border-teal-500 rounded-lg ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between p-1">
        <h2 className="font-bold text-lg text-gray-700">{Header}</h2>
        <div className="h-1 w-12 bg-teal-500 rounded-full"></div>
      </div>
      <hr className="border-gray-200" />
      <div className="p-2">{children}</div>
    </Card>
  );
};

export const CardAccumulate: React.FC<Props> = ({
  Header,
  Count,
  imgurl,
  color = 'teal',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    teal: 'text-teal-500 bg-teal-50',
    blue: 'text-blue-500 bg-blue-50',
    purple: 'text-purple-500 bg-purple-50',
    red: 'text-red-500 bg-red-50',
    green: 'text-green-500 bg-green-50',
    orange: 'text-orange-500 bg-orange-50',
  };

  const selectedColor =
    colorClasses[color as keyof typeof colorClasses] || colorClasses.teal;
  const borderColor = `border-${color}-500`;

  return (
    <Card
      className={`w-full shadow-md bg-white transition-all duration-300
        ${isHovered ? 'shadow-xl translate-y-px' : 'shadow-md'}
        border-b-4 ${borderColor} rounded-lg overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center p-2">
        {imgurl && (
          <div
            className={`p-3 rounded-full ${selectedColor} mr-4 flex items-center justify-center`}
          >
            <Image
              src={imgurl}
              alt="img-icons"
              width={40}
              height={40}
              className="w-10 md:w-14 h-10 md:h-14 transition-transform duration-300 transform-gpu group-hover:scale-110"
            />
          </div>
        )}
        <div className="flex flex-col">
          <h2
            className={`text-left md:text-4xl text-2xl font-black ${selectedColor.split(' ')[0]}`}
          >
            {Count.toLocaleString()}
          </h2>
          <h3 className="text-neutral-600 text-sm md:text-base font-medium">
            {Header}
          </h3>
        </div>
      </div>
    </Card>
  );
};

// New component: Card with icon and action
export const ActionCard: React.FC<{
  title: string;
  description: string;
  icon: string;
  actionText: string;
  actionUrl: string;
  color?: string;
}> = ({ title, description, icon, actionText, actionUrl, color = 'teal' }) => {
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    teal: 'text-teal-500 border-teal-500 hover:bg-teal-500',
    blue: 'text-blue-500 border-blue-500 hover:bg-blue-500',
    purple: 'text-purple-500 border-purple-500 hover:bg-purple-500',
    red: 'text-red-500 border-red-500 hover:bg-red-500',
    green: 'text-green-500 border-green-500 hover:bg-green-500',
  };

  const selectedColor =
    colorClasses[color as keyof typeof colorClasses] || colorClasses.teal;

  return (
    <Card
      className={`w-full shadow-md bg-white transition-all duration-300
        ${isHovered ? 'shadow-xl translate-y-px' : ''} rounded-lg overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-5">
        <div className="flex items-center mb-4">
          {icon && (
            <div className={`p-3 rounded-full bg-gray-100 mr-3`}>
              <Image
                src={icon}
                alt="icon"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
          )}
          <h3 className="font-bold text-lg text-gray-800">{title}</h3>
        </div>

        <p className="text-gray-600 mb-4">{description}</p>

        <Link href={actionUrl}>
          <button
            className={`px-4 py-2 border rounded-md ${selectedColor} transition-colors duration-300 hover:text-white`}
          >
            {actionText}
          </button>
        </Link>
      </div>
    </Card>
  );
};

// New component: Stats Card Grid
export const StatsCardGrid: React.FC<{
  items: Array<{
    Header: string;
    Count: number;
    imgurl?: string;
    color?: string;
  }>;
}> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, index) => (
        <CardAccumulate
          key={index}
          Header={item.Header}
          Count={item.Count}
          imgurl={item.imgurl}
          color={item.color}
        />
      ))}
    </div>
  );
};
