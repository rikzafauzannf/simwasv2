'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ChartJenisPengawasan = () => {
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
      categories: [
        'Audit Kinerja',
        'Audit Ketaatan',
        'Audit Tujuan tertentu',
        'Reviu',
        'Evaluasi',
        'Monitoring',
        'Pengawasan Lainya',
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
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: 'end',
        horizontal: true,
      },
    },
  };

  const series = [
    {
      name: 'Jenis Pengawasan',
      data: [10, 15, 5, 20, 11, 18, 4],
    },
  ];

  return (
    <div className="w-full items-center">
      <div className="flex gap-2 items-center">
        <img src="/images/products/jenis_pengawasn_bg.svg" alt="" />
        <h3 className="font-bold text-xl text-neutral-700">Jenis Pengawasan</h3>
      </div>
      <Chart options={options} series={series} type="bar" height={250} />
    </div>
  );
};

export default ChartJenisPengawasan;
