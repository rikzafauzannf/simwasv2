'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ChartRuangLingkup = () => {
  const options: ApexOptions = {
    chart: {
      type: 'pie',
    },
    labels: [
      'Tinggi',
      'Sedang',
      'Rendah',
      'Non-PBR',
      'Tinggi',
      'Sedang',
      'Rendah',
      'Non-PBR',
      'Tinggi',
      'Sedang',
      'Rendah',
      'Non-PBR',
      'Tinggi',
      'Sedang',
      'Rendah',
      'Non-PBR',
      'Tinggi',
      'Sedang',
      'Rendah',
      'Non-PBR',
      'Tinggi',
      'Sedang',
      'Rendah',
      'Non-PBR',
      'Tinggi',
      'Sedang',
      'Rendah',
      'Non-PBR',
      'Tinggi',
      'Sedang',
      'Rendah',
      'Non-PBR',
      'Tinggi',
      'Sedang',
      'Rendah',
      'Non-PBR',
      'Tinggi',
      'Sedang',
      'Rendah',
      'Non-PBR',
      'Tinggi',
      'Sedang',
      'Rendah',
      'Non-PBR',
      'Tinggi',
      'Sedang',
      'Rendah',
      'Non-PBR',
    ],
    // colors: ['#FF4560', '#FEB019', '#00E396'],
    legend: {
      show: false,
    },
    // plotOptions: {
    //   pie: {
    //     donut: {
    //       labels: {
    //         show: true,
    //         total: {
    //           show: true,
    //           label: 'Total',
    //           formatter: function (w) {
    //             return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0).toString();
    //           }
    //         }
    //       }
    //     }
    //   }
    // },
    dataLabels: {
      formatter: function (val: number, opts) {
        return opts.w.config.series[opts.seriesIndex];
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  const series = [
    44, 55, 13, 10, 44, 55, 13, 10, 44, 55, 13, 10, 44, 55, 13, 10, 44, 55, 13,
    10, 44, 55, 13, 10, 44, 55, 13, 10, 44, 55, 13, 10, 44, 55, 13, 10, 44, 55,
    13, 10, 44, 55, 13, 10, 44, 55, 13, 10,
  ]; // Sample data - replace with actual risk level data

  return (
    <div className="w-full">
      <div className="flex gap-2 items-center">
        <img
          src="/images/products/ruang_lingkup_bg.svg"
          className="w-8 md:w-10"
        />
        <h3 className="font-bold text-sm md:text-lg text-neutral-700">
          Ruang Lingkup
        </h3>
      </div>
      <div className="justify-items-center w-full">
        <Chart options={options} series={series} type="pie" height={250} />
      </div>
    </div>
  );
};

export default ChartRuangLingkup;
