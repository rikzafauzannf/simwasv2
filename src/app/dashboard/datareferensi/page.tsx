import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import React from 'react';

const DataReferensiPage = () => {
  const ReferensiComponents = [
    {
      title:"Jenis Pengawasan",
      component:"iii"
    },
    {
      title:"Area Pengawasan",
      component:"iii"
    },
    {
      title:"Ruang Lingkup",
      component:"iii"
    },
    {
      title:"Tingkat Resiko",
      component:"iii"
    },
    {
      title:"Kode Temuan",
      component:"iii"
    },
  ]
  return (
    <div className='space-y-3'>
      <h3 className='text-xl'>Persiapkan Data Referensi</h3>
      <hr />
      <TabGroup className="flex flex-row gap-10">
        <TabList className="grid gap-3">
          {ReferensiComponents.map((item,index)=>(
          <Tab key={index} className="py-2 px-10 data-[selected]:bg-primary data-[selected]:font-bold data-[selected]:text-white data-[selected]:font-bold data-[hover]:font-semibold rounded-md shadow-md">
            {item.title}
          </Tab>
          ))}
        </TabList>
        <TabPanels>
          {ReferensiComponents.map((item,index)=>(
            <TabPanel key={index}>{item.component}</TabPanel>
          ))}          
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default DataReferensiPage;
