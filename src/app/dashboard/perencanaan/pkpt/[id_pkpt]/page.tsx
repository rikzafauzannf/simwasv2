// 'use client';

import DailyActivity from '@/app/components/dashboard/DailyActivity';
import { CardComponents } from '@/app/components/Global/Card';
import InputKendaliMutu from '@/app/components/pelaksanaan/form/inputKendaliMutu';
import LembarHasilPengawasan from '@/app/components/pelaksanaan/form/lembarHasilPengawasan';
import NotaHasilPengawasan from '@/app/components/pelaksanaan/form/notaHasilPengawasan';
import LaporanMingguanComponent from '@/app/dashboard/perencanaan/surattugas/[id_st]/laporanMingguan';
import KendaliMutu from '@/app/components/pelaksanaan/view/KendaliMutu';
import InputSuratTugas from '@/app/components/perencanaan/form/inputSuratTugas';
import TableSuratTugas from '@/app/components/perencanaan/table/TableSuratTugas';
import DetailPengawasan from '@/app/components/perencanaan/view/detailPengawasan';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

interface PageProps {
  params: {
    id_pkpt: number;
  };
}

const ViewPkptPage = ({ params }: PageProps) => {
  const id_pkpt = params.id_pkpt;
  console.log('id_pkpt params: ', id_pkpt);

  const tabs_list = [
    {
      label: 'Detail PKPT',
      component: <DetailPengawasan id_pkpt={id_pkpt} />,
    },
    {
      label: 'Rekap Surat Tugas',
      component: (
        <div className="grid w-full gap-3">
          <h3 className="text-xl">Data Rekap Surat Tugas</h3>
          <CardComponents>
            <TableSuratTugas id_pkpt={id_pkpt} filterID="true" />
          </CardComponents>
        </div>
      ),
    },
    // {
    //   label: 'Laporan Mingguan',
    //   component: <LaporanMingguanComponent id_pkpt={id_pkpt} />,
    // },
    // {
    //   label: 'Kendali Mutu',
    //   component: <KendaliMutu />,
    // },
    // {
    //   label: 'NHP',
    //   // component: <NotaHasilPengawasan />,
    //   component: 'NHP',
    // },
    // {
    //   label: 'LHP',
    //   // component: <LembarHasilPengawasan />,
    //   component: 'LHP',
    // },
  ];

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
      <section className="grid md:grid-cols-4 w-full gap-3">
        <div className="md:col-span-3">
          <TabGroup>
            <TabList className={'flex gap-3 mb-4 w-full overflow-x-auto'}>
              {tabs_list.map((item, index) => (
                <Tab
                  className={
                    'data-[selected]:bg-primary data-[selected]:font-bold data-[selected]:text-white data-[selected]:font-bold data-[hover]:font-semibold px-4 py-2 rounded-md shadow-md'
                  }
                  key={index}
                >
                  {item.label}
                </Tab>
              ))}

              {/* <Tab className={"data-[selected]:bg-primary data-[selected]:font-bold data-[selected]:text-white data-[selected]:font-bold data-[hover]:font-semibold px-4 py-2 rounded-md shadow-md"}>Tab 2</Tab>
            <Tab className={"data-[selected]:bg-primary data-[selected]:font-bold data-[selected]:text-white data-[selected]:font-bold data-[hover]:font-semibold px-4 py-2 rounded-md shadow-md"}>Tab 3</Tab> */}
            </TabList>
            <TabPanels>
              {tabs_list.map((item, index) => (
                <TabPanel key={index}>{item.component}</TabPanel>
              ))}

              {/* <TabPanel>Content 2</TabPanel>
            <TabPanel>Content 3</TabPanel> */}
            </TabPanels>
          </TabGroup>
          {/* <CardComponents>
          <h1>test</h1>
        </CardComponents> */}
        </div>
        <div className="w-full">
          <DailyActivity id_pkpt={id_pkpt} />
        </div>
      </section>
    </AuthRoleWrapper>
  );
};

export default ViewPkptPage;
