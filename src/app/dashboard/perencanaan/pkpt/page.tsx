'use client';
import { ButtonLinkComponent } from '@/app/components/Global/Button';
import { CardComponents } from '@/app/components/Global/Card';
import AkumulasiDataPKPT from '@/app/components/perencanaan/AkumulasiDataPKPT';
import TablePKPT from '@/app/components/perencanaan/table/TablePKPT';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import { useAuthStore } from '@/middleware/Store/useAuthStore';
import React from 'react';

const PkptPage = () => {
  const { user } = useAuthStore();
  return (
    <AuthRoleWrapper
      allowedRoles={[
        'Admin',
        'Perencana',
        'Pimpinan',
        'Pelaksana',
        'Auditor',
        'Developer',
      ]}
    >
      <div className="space-y-4">
        <AkumulasiDataPKPT />
        {user?.role === 'Perencana' && (
          <div>
            <ButtonLinkComponent
              Text="Input PKPT"
              linkTo="/dashboard/perencanaan/pkpt/inputpkpt"
            />
          </div>
        )}
        {/* <AkumulasiDataPKPT /> */}
        {/* <div>
          <ButtonLinkComponent
            Text="Input PKPT"
            linkTo="/dashboard/perencanaan/pkpt/inputpkpt"
          />
        </div> */}
        <div className="grid w-full gap-3">
          <CardComponents>
            <TablePKPT />
          </CardComponents>
        </div>
      </div>
    </AuthRoleWrapper>
  );
};

export default PkptPage;
