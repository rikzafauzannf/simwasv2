'use client';

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import React from 'react';

interface Props {
  children: React.ReactNode;
  title: string;
}

const CollapseComponents: React.FC<Props> = ({ children, title }) => {
  return (
    <Disclosure>
      <DisclosureButton className="py-2">{title}</DisclosureButton>
      <DisclosurePanel className="text-gray-500">{children}</DisclosurePanel>
    </Disclosure>
  );
};

export default CollapseComponents;
