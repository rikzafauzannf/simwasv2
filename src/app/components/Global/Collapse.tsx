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
      <DisclosureButton className="py-2 px-4 text-white bg-primary hover:bg-lightprimary rounded-md shadow-md font-semibold">
        {title}
      </DisclosureButton>
      <DisclosurePanel className="text-gray-500">{children}</DisclosurePanel>
    </Disclosure>
  );
};

export default CollapseComponents;
