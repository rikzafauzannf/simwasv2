import React from 'react';
import { CardComponents } from '../components/Global/Card';
// import SalesProfit from '../components/dashboard/RevenueForecast';
// import NewCustomers from '../components/dashboard/NewCustomers';
// import TotalIncome from '../components/dashboard/TotalIncome';
// import ProductRevenue from '../components/dashboard/ProductRevenue';
// import DailyActivity from '../components/dashboard/DailyActivity';
// import BlogCards from '../components/dashboard/BlogCards';
// import Link from 'next/link';

const page = () => {
  return (
    <div className='space-y-3'>
      {/* top */}
      <section className='grid grid-cols-3 gap-3'>
        <div className='col-span-2'>
          <CardComponents>card data</CardComponents>
        </div>
        <CardComponents>Card indikator resiko</CardComponents>
      </section>
      {/* data chart */}
      <CardComponents>
        Chart Total Pengawasan
      </CardComponents>
      <section className='grid grid-cols-3 gap-3'>
        <CardComponents>
          chart pie total ruang lingkup
        </CardComponents>
        <div className='col-span-2'>
          <CardComponents>
            jenis pengawasan chart
          </CardComponents>
        </div>
        <div className='col-span-2'>
          <CardComponents>
            Chart Anggaran Per Bulan
          </CardComponents>
        </div>
        <CardComponents>
          Jumlah Laporan Chart
        </CardComponents>
      </section>
    </div>
  );
};

export default page;
