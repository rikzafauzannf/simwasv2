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
      <h4 className="font-semibold mb-4">Ruang Lingkup</h4>
      <Chart
        options={options}
        series={series}
        type="pie"
        // height={200}
      />
    </div>
  );
};

export default ChartRuangLingkup;