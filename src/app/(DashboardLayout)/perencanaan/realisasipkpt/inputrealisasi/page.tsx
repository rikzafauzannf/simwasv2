import { CardComponents } from '@/app/components/Global/Card';
import CollapseComponents from '@/app/components/Global/Collapse';
import TablePKPT from '@/app/components/perencanaan/table/TablePKPT';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import React from 'react';

const RealisasiPKPTPage = () => {
  return (
    <>
      <CardComponents>
        <CollapseComponents title="Data PKPT">
          <TablePKPT />
        </CollapseComponents>
      </CardComponents>
    </>
  );
};

export default RealisasiPKPTPage;
