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
// import SalesProfit from '../components/dashboard/RevenueForecast';
// import NewCustomers from '../components/dashboard/NewCustomers';
// import TotalIncome from '../components/dashboard/TotalIncome';
// import ProductRevenue from '../components/dashboard/ProductRevenue';
// import DailyActivity from '../components/dashboard/DailyActivity';
// import BlogCards from '../components/dashboard/BlogCards';
// import Link from 'next/link';

const page = () => {
  return (
    <div className="space-y-3">
      {/* top */}
      <section className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <CardAkumulasiDataALL />
        </div>
        <CardComponents>
          <ChartTingkatRisiko />
        </CardComponents>
      </section>
      {/* data chart */}
      <CardComponents>
        <ChartPengawasan />
      </CardComponents>
      <section className="grid grid-cols-3 gap-3">
        <CardComponents>
          <ChartRuangLingkup />
        </CardComponents>
        <div className="col-span-2">
          <CardComponents>
            <ChartJenisPengawasan />
          </CardComponents>
        </div>
        <div className="col-span-2">
          <CardComponents>
            <ChartAnggaran />
          </CardComponents>
        </div>
        <CardComponents>
          <Chartlaporan />
        </CardComponents>
      </section>
      <RevenueForecast/>
    </div>
  );
};

export default page;
