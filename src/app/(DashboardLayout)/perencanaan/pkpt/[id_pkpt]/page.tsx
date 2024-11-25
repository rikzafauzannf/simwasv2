// 'use client';

import DailyActivity from '@/app/components/dashboard/DailyActivity';
import { CardComponents } from '@/app/components/Global/Card';
import DetailPengawasan from '@/app/components/perencanaan/view/detailPengawasan';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

interface PageProps {
  params: {
    id_pkpt: number;
  };
}

const ViewPkptPage = ({ params }: PageProps) => {
  const id_pkpt = params.id_pkpt;

  const tabs_list = [
    {
      label: 'Detail PKPT',
      component: <DetailPengawasan />,
    },
    {
      label: 'Surat Tugas',
      component: <DailyActivity />,
    },
    {
      label: 'Kendali Mutu',
      component: <DailyActivity />,
    },
    {
      label: 'NHP',
      component: <DailyActivity />,
    },
    {
      label: 'LHP',
      component: <DailyActivity />,
    },
  ];

  return (
    <section className="md:grid grid-cols-4 w-full gap-3">
      <div className="col-span-3">
        <TabGroup>
          <TabList className={'flex gap-3 mb-4'}>
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
      <div>
        <DailyActivity />
      </div>
    </section>
  );
};

export default ViewPkptPage;
