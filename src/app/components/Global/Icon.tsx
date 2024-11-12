'use client';

import { Icon } from '@iconify/react';
import React from 'react';

interface Props {
  iconField: string;
}

export const IconComponents: React.FC<Props> = ({ iconField }) => {
  return (
    <Icon
      icon={`solar:${iconField}`}
      className="text-ld dark:text-opacity-60 hide-icon"
      height={18}
    />
  );
};
