// import { ButtonLinkComponent } from '@/app/components/Global/Button';
import DailyActivity from '@/app/components/dashboard/DailyActivity';
import { CardComponents } from '@/app/components/Global/Card';
import AkumulasiData from '@/app/components/perencanaan/AkumulasiData';
import TablePKPT from '@/app/components/perencanaan/table/TablePKPT';
import React from 'react';

const PerencanaanPage = () => {
  return (
    <div className="space-y-4">
      <AkumulasiData />
      <section className="grid grid-cols-1 md:grid-cols-3 w-full gap-6">
        <div className="col-span-2 space-y-4 w-full">
          {/* <div className="flex flex-col md:flex-row md:justify-between items-center align-middle w-full gap-2"> */}
          <p className="text-lg">Perencanaan PKPT</p>
          {/* <ButtonLinkComponent
              Text="Input PKPT"
              linkTo="/perencanaan/pkpt/inputpkpt"
              type="button"
            /> */}
          {/* </div> */}
          <CardComponents>
            <TablePKPT />
          </CardComponents>
        </div>
        {/* <CardComponents>Notifikasi</CardComponents> */}
        {/* <DailyActivity /> */}
      </section>
    </div>
  );
};

export default PerencanaanPage;
