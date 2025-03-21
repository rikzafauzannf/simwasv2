'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { useFetchAll } from '@/hooks/useFetchAll';
import { DataChartPEngawasan } from '@/interface/interfaceChartData';
import Image from 'next/image';
import iconsPengawasan from '/public/images/products/total_pengawasan_bg.svg';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ChartPengawasan = () => {
  const { data: DataPengawasan } =
    useFetchAll<DataChartPEngawasan>('dashboardpkpt');

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
      categories: DataPengawasan.map((item) => item.mulai_perencanaan),
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
      data: DataPengawasan.map((item) => item.jumlah_data),
    },
  ];

  return (
    <div className="w-full">
      <div className="flex gap-2 items-center">
        {/* <img
          src="/images/products/total_pengawasan_bg.svg"
          className="w-8 md:w-10"
        /> */}
        <Image
          src={iconsPengawasan}
          alt="Icons-total-pengawasan"
          className="w-8 md:w-10"
        />
        <h3 className="font-bold text-sm md:text-lg text-neutral-700">
          Total Pengawasan per Bulan
        </h3>
      </div>
      <Chart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default ChartPengawasan;
