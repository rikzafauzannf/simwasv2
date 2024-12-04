'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const Chartlaporan = () => {
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: ['LHP', 'LHA', 'LHR', 'LHE'],
    },
    tooltip: {
      x: {
        format: 'MM',
      },
    },
    legend: {
      position: 'bottom',
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: 'end',
        horizontal: false,
      },
    },
  };

  const series = [
    {
      name: 'Jenis Laporan',
      data: [10, 20, 11, 8],
    },
  ];

  return (
    <div className="w-full">
      <div className="flex gap-2 items-center">
        <img src="/images/products/laporan_bg.svg" alt="" />
        <h3 className="font-bold text-xl text-neutral-700">Jenis Pengawasan</h3>
      </div>
      <Chart options={options} series={series} type="bar" height={280} />
    </div>
  );
};

export default Chartlaporan;
