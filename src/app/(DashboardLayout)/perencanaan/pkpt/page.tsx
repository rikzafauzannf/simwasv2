import { ButtonLinkComponent } from '@/app/components/Global/Button';
import { CardComponents } from '@/app/components/Global/Card';
import AkumulasiDataPKPT from '@/app/components/perencanaan/AkumulasiDataPKPT';
import InputNonPKPT from '@/app/components/perencanaan/form/InputNonPKPT';
import TablePKPT from '@/app/components/perencanaan/table/TablePKPT';
import React from 'react';

const PkptPage = () => {
  return (
    <div className="space-y-4">
      <AkumulasiDataPKPT />
      <div>
        <ButtonLinkComponent
          Text="Input PKPT"
          linkTo="/perencanaan/pkpt/inputpkpt"
        />
      </div>
      <div className="grid w-full gap-3">
        <CardComponents>
          <TablePKPT />
        </CardComponents>
      </div>
    </div>
  );
};

export default PkptPage;
