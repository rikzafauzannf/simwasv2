'use client';
import React from 'react';
import Link from 'next/link';
import { useFetchAll } from '@/hooks/useFetchAll';
import { NotifikasiDB } from '@/interface/interfaceNotifikasi';
import { useGetNamePKPT, useGetNameUser } from '@/hooks/useGetName';

interface PropsComponent {
  id_pkpt: number;
}

const DailyActivity: React.FC<PropsComponent> = ({ id_pkpt }) => {
  console.log('conf id_pkpt: ', id_pkpt);
  const { data: DataNotifikasi } = useFetchAll<NotifikasiDB>('notifikasi');
  const { getNameUser, getUserPhone } = useGetNameUser();
  const { getNameStatusPKPT } = useGetNamePKPT();
  console.log('data Notifikasi all: ', DataNotifikasi);
  const dataFilter = DataNotifikasi
    ? DataNotifikasi.filter((item) => item.id_pkpt === Number(id_pkpt))
    : [];
  console.log('Data Notifikasi hasil filter: ', dataFilter);

  const ActivitySteps = dataFilter.map((item) => ({
    Time: new Date(item.created_at).toLocaleString(),
    action: `${item.notifikasi} @${getNameStatusPKPT(item.id_pkpt)}`,
    id: getNameUser(item.id_user),
    no_wa: getUserPhone(item.id_user),
    color: 'bg-primary',
    line: 'h-full w-px bg-border',
  }));
  console.log('ActivitySteps: ', ActivitySteps);

  // const ActivitySteps = [
  //   {
  //     Time: '09:46',
  //     action: 'Payment received from John Doe of $385.90',
  //     color: 'bg-primary',
  //     line: 'h-full w-px bg-border',
  //   },
  //   {
  //     Time: '09:46',
  //     action: 'New sale recorded',
  //     id: '#ML-3467',
  //     color: 'bg-warning',
  //     line: 'h-full w-px bg-border',
  //   },
  //   {
  //     Time: '09:46',
  //     action: 'Payment was made of $64.95 to Michael',
  //     color: 'bg-warning',
  //     line: 'h-full w-px bg-border',
  //   },
  //   {
  //     Time: '09:46',
  //     action: 'New sale recorded',
  //     id: '#ML-3467',
  //     color: 'bg-secondary',
  //     line: 'h-full w-px bg-border',
  //   },
  //   {
  //     Time: '09:46',
  //     action: 'Project meeting',
  //     color: 'bg-error',
  //     line: 'h-full w-px bg-border',
  //   },
  //   {
  //     Time: '09:46',
  //     action: 'Payment received from John Doe of $385.90',
  //     color: 'bg-primary',
  //   },
  // ];
  return (
    <>
      <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
        <h5 className="card-title mb-6">Notifikasi</h5>

        <div className="maxh-dvh overflow-auto">
          <div className="flex flex-col mt-2">
            <ul>
              {ActivitySteps.map((item, index) => (
                <li key={index}>
                  <div className="flex gap-4 min-h-16">
                    <div className="">
                      <p>{item.Time}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div
                        className={`rounded-full ${item.color} p-1.5 w-fit`}
                      ></div>
                      <div className={`${item.line}`}></div>
                    </div>
                    <div className="">
                      <p className="text-dark text-start">{item.action}</p>
                      <Link
                        href={`https://wa.me/${item.no_wa.replace(/^0/, '62')}`}
                        target="blank"
                        className="text-blue-700"
                      >
                        {item.id} 
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyActivity;
