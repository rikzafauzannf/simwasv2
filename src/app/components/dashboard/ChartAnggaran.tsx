'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ChartAnggaran = () => {
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
      name: 'Jenis Pengawasan',
      data: [10, 15, 5, 20, 11, 18, 4, 8, 10, 11, 15, 28],
    },
  ];

  return (
    <div className="w-full">
      <h3 className="font-semibold mb-4">Anggaran</h3>
      <h4 className="text-slate-900">
        {' '}
        <span className="text-xl font-bold">RP. 12.000.000.000</span>{' '}
        <small>Total Anggaran Pertahun</small>
      </h4>
      <Chart options={options} series={series} type="bar" height={250} />
    </div>
  );
};

export default ChartAnggaran;
