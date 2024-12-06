import { CardComponents } from '@/app/components/Global/Card';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import React from 'react';
import JenisPengawasan from './components/JenisPengawasan';
import AreaPengawasan from './components/AreaPengawasan';
import RuangLingkup from './components/RuangLingkup';
import TingkatResiko from './components/TingkatResiko';
import KodeTemuan from './components/KodeTemuan';
import JenisLaporan from './components/JenisLaporan';

const DataReferensiPage = () => {
  const ReferensiComponents = [
    {
      title: 'Jenis Pengawasan',
      component: <JenisPengawasan />,
    },
    {
      title: 'Jenis Laporan',
      component: <JenisLaporan />,
    },
    // {
    //   title: 'Area Pengawasan',
    //   component: <AreaPengawasan />,
    // },
    {
      title: 'Ruang Lingkup',
      component: <RuangLingkup />,
    },
    {
      title: 'Tingkat Resiko',
      component: <TingkatResiko />,
    },
    {
      title: 'Kode Temuan',
      component: <KodeTemuan />,
    },
  ];
  return (
    <div className="space-y-3">
      <h3 className="text-xl">Persiapkan Data Referensi</h3>
      <hr />
      <TabGroup className="flex flex-col md:flex-row gap-10">
        <div className="lg:w-1/4 w-full">
          <CardComponents>
            <TabList className="grid grid-flow-col md:grid-flow-row gap-3 overflow-auto lg:overflow-hidden">
              {ReferensiComponents.map((item, index) => (
                <Tab
                  key={index}
                  className="py-2 px-8 data-[selected]:bg-primary data-[selected]:font-bold data-[selected]:text-white data-[selected]:font-bold data-[hover]:font-semibold rounded-md shadow-md lg:w-full border-none"
                >
                  {item.title}
                </Tab>
              ))}
            </TabList>
          </CardComponents>
        </div>
        <TabPanels className="flex-1">
          {ReferensiComponents.map((item, index) => (
            <TabPanel key={index}>{item.component}</TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default DataReferensiPage;
