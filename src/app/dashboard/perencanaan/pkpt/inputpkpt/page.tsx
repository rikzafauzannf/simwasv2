'use client';
import { IconComponents } from '@/app/components/Global/Icon';
import InputNonPKPT from '@/app/components/perencanaan/form/InputNonPKPT';
import InputPKPT from '@/app/components/perencanaan/form/InputPKPT';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import React from 'react';

const InputPKPTPage = () => {
  return (
    <AuthRoleWrapper allowedRoles={['Perencana', 'Developer']}>
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">
          <IconComponents iconField="text-field-focus-line-duotone" />
          Input PKPT
        </h1>
        {/* form tabs */}
        <TabGroup className="space-y-4">
          <TabList className="grid grid-cols-2 w-full gap-3">
            <Tab className="data-[selected]:bg-primary data-[selected]:font-bold data-[selected]:text-white data-[selected]:font-bold data-[hover]:font-semibold px-4 py-2 rounded-md shadow-md">
              Data PKPT
            </Tab>
            <Tab className="data-[selected]:bg-primary data-[selected]:font-bold data-[selected]:text-white data-[selected]:font-bold data-[hover]:font-semibold px-4 py-2 rounded-md shadow-md">
              Data Non-PKPT
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <InputPKPT />
            </TabPanel>
            <TabPanel>
              <InputNonPKPT />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </AuthRoleWrapper>
  );
};

export default InputPKPTPage;
