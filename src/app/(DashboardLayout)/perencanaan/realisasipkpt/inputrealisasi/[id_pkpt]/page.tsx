import { CardComponents } from '@/app/components/Global/Card';
import CollapseComponents from '@/app/components/Global/Collapse';
import TablePKPT from '@/app/components/perencanaan/table/TablePKPT';
import Collapsedatapkpt from '@/app/components/realisasi/collapsedatapkpt';
import React from 'react';

interface PageProps {
  params: {
    id_pkpt: number;
  };
}

const RealisasiPKPTPage = ({ params }: PageProps) => {
  console.log('id_pkpt:', params.id_pkpt);
  const id_pkpt = params.id_pkpt;
  return (
    <div className="space-y-3">
      <h3>Input Realisasi ({id_pkpt})</h3>
      {/* cek data pkpt */}
      <Collapsedatapkpt id={1} />
    </div>
  );
};

export default RealisasiPKPTPage;
