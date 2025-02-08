'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import Image from 'next/image';
import IconsJenisPengawasan from '/public/images/products/jenis_pengawasn_bg.svg';
import { useFetchAll } from '@/hooks/useFetchAll';
import { DataChartJenisPengawasan } from '@/interface/interfaceChartData';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ChartJenisPengawasan = () => {
  const { data: DataJenisPengawasan } = useFetchAll<DataChartJenisPengawasan>(
    'dashboardpkptjenispengawasan'
  );

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 250,
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
      categories: DataJenisPengawasan.map((item) => item.jenis_pengawasan),
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
      data: DataJenisPengawasan.map((item) => item.jumlah_data),
    },
  ];

  return (
    <div className="w-full items-center">
      <div className="flex gap-2 items-center">
        {/* <img
          src="/images/products/jenis_pengawasn_bg.svg"
          className="w-8 md:w-10"
        /> */}
        <Image
          src={IconsJenisPengawasan}
          alt="icons-jenis-pengawasan"
          className="w-8 md:w-10"
        />
        <h3 className="font-bold text-sm md:text-lg text-neutral-700">
          Jenis Pengawasan
        </h3>
      </div>
      <Chart options={options} series={series} type="bar" height={400} />
    </div>
  );
};

export default ChartJenisPengawasan;
