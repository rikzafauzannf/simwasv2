'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ChartPengawasan = () => {
  const options: ApexOptions = {
    chart: {
      type: 'area',
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
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    tooltip: {
      x: {
        format: 'MM',
      },
    },
    legend: {
      position: 'bottom',
    },
  };

  const series = [
    {
      name: 'Pengawasan',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 150, 160, 180], // Sample data - replace with actual data
    },
    {
      name: 'Pengawasan',
      data: [20, 42, 30, 40, 40, 50, 80, 91, 125, 140, 165, 185], // Sample data - replace with actual data
    },
    {
      name: 'Pengawasan',
      data: [36, 46, 37, 56, 46, 66, 76, 96, 126, 156, 166, 186], // Sample data - replace with actual data
    },
  ];

  return (
    <div className="w-full">
      <div className="flex gap-2 items-center">
        <img src="/images/products/total_pengawasan_bg.svg" alt="" />
        <h3 className="font-bold text-xl text-neutral-700">
          Total Pengawasan per Bulan
        </h3>
      </div>
      <Chart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default ChartPengawasan;
