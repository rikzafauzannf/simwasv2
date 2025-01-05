'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { DataChartPEngawasan } from '@/interface/interfaceChartData';
import { useFetchAll } from '@/hooks/useFetchAll';
import { formatCurrency } from '@/hooks/formatCurrency';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ChartAnggaran = () => {
  const {data:DataPengawasan} = useFetchAll<DataChartPEngawasan>('dashboardpkpt')
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
      categories:DataPengawasan.map((item)=>item.mulai_perencanaan)
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
      data: DataPengawasan.map((item)=>item.total_anggaran),
    },
  ];

  return (
    <div className="w-full">
      <div className="flex gap-2 items-center">
        <img src="/images/products/anggaran_bg.svg" className="w-8 md:w-10" />
        <h3 className="font-bold text-neutral-700 text-sm md:text-lg">
          Anggaran Per bulan
        </h3>
      </div>
      <h4 className="text-slate-900">
        {' '}
        <span className="text-xl font-bold">{formatCurrency(DataPengawasan.reduce((acc, item) => acc + item.total_anggaran, 0))}</span>{' '}
        <small>Total Anggaran Pertahun</small>
      </h4>
      <Chart options={options} series={series} type="bar" height={250} />
    </div>
  );
};

export default ChartAnggaran;
