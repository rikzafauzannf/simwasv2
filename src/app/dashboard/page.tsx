'use client';
import React from 'react';
import { CardComponents } from '../components/Global/Card';
import CardAkumulasiDataALL from '../components/dashboard/CardAkumulasiDataALL';
import ChartTingkatRisiko from '../components/dashboard/ChartTingkatRisiko';
import ChartPengawasan from '../components/dashboard/ChartPengawasan';
import ChartRuangLingkup from '../components/dashboard/ChartRuangLingkup';
import ChartJenisPengawasan from '../components/dashboard/ChartJenisPengawasan';
import ChartAnggaran from '../components/dashboard/ChartAnggaran';
import Chartlaporan from '../components/dashboard/ChartLaporan';
import RevenueForecast from '../components/dashboard/RevenueForecast';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import { useAuthStore } from '@/middleware/Store/useAuthStore';

import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
  Card,
} from 'flowbite-react';
import Breadcrumbs from '../components/Breadcumb';
// import SalesProfit from '../components/dashboard/RevenueForecast';
// import NewCustomers from '../components/dashboard/NewCustomers';
// import TotalIncome from '../components/dashboard/TotalIncome';
// import ProductRevenue from '../components/dashboard/ProductRevenue';
// import DailyActivity from '../components/dashboard/DailyActivity';
// import BlogCards from '../components/dashboard/BlogCards';
// import Link from 'next/link';

const page = () => {
  return (
    <AuthRoleWrapper
      allowedRoles={['Admin', 'Pimpinan', 'Perencana', 'Pelaksana', 'Auditor']}
    >
      <div className="space-y-8">
        {/* top */}
        {/* <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-full">
          <div className="lg:col-span-2"> */}
        <CardAkumulasiDataALL />
        {/* </div> */}
        {/* <CardComponents>
            <ChartTingkatRisiko />
          </CardComponents> */}
        {/* </section> */}

        {/* data chart */}
        <CardComponents>
          <ChartJenisPengawasan />
        </CardComponents>
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-full">
          <CardComponents>
            {/* <ChartRuangLingkup /> */}
            <ChartTingkatRisiko />
          </CardComponents>
          <div className="lg:col-span-2">
            <CardComponents>
              {/* <ChartPengawasan />     */}
              <Chartlaporan />
            </CardComponents>
          </div>
          <div className="lg:col-span-3">
            <CardComponents>
              <ChartAnggaran />
            </CardComponents>
          </div>
          {/* <CardComponents>
            <Chartlaporan />
          </CardComponents> */}
        </section>
        {/* <RevenueForecast /> */}
      </div>
    </AuthRoleWrapper>
  );
};

export default page;
