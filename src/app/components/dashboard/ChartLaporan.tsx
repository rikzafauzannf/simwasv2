'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import Image from 'next/image';
import IconsJenisLaporan from '/public/images/products/laporan_bg.svg';
import { useFetchAll } from '@/hooks/useFetchAll';
import { DataChartJenisLaporan } from '@/interface/interfaceChartData';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const Chartlaporan = () => {
  const { data: DataJenisLaporan } = useFetchAll<DataChartJenisLaporan>(
    'dashboardstjenislaporan'
  );

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
      categories: DataJenisLaporan.map((item) => item.jenis_laporan),
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
      data: DataJenisLaporan.map((item) => item.jumlah_data),
    },
  ];

  return (
    <div className="w-full">
      <div className="flex gap-2 items-center">
        {/* <img src="/images/products/laporan_bg.svg" className="w-8 md:w-10" /> */}
        <Image
          src={IconsJenisLaporan}
          alt="Icons-Jenis-Pengawasan"
          className="w-8 md:w-10"
        />
        <h3 className="font-bold text-sm md:text-lg text-neutral-700">
          Jenis Laporan
        </h3>
      </div>
      <Chart options={options} series={series} type="bar" height={280} />
    </div>
  );
};

export default Chartlaporan;
