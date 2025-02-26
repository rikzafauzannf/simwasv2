'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import Image from 'next/image';
import iconsTingkatResiko from '/public/images/products/tingkat_resiko_bg.svg';
import { useFetchAll } from '@/hooks/useFetchAll';
import { DataChartTingkatPengawasan } from '@/interface/interfaceChartData';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ChartTingkatRisiko = () => {
  const { data: DataChartTingkatResiko } =
    useFetchAll<DataChartTingkatPengawasan>('dashboardpkptbytingkatresiko');

  const options: ApexOptions = {
    chart: {
      type: 'donut',
    },
    labels: DataChartTingkatResiko.map((item) => item.tingkat_resiko),
    // colors: ['#FF4560', '#FEB019', '#00E396'],
    legend: {
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Resiko',
              formatter: function (w) {
                return w.globals.seriesTotals
                  .reduce((a: number, b: number) => a + b, 0)
                  .toString();
              },
            },
          },
        },
      },
    },
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

  const series = DataChartTingkatResiko.map((item) => item.jumlah_data);

  return (
    <div className="w-full">
      <div className="flex gap-2 items-center">
        {/* <img
          src="/images/products/tingkat_resiko_bg.svg"
          className="w-8 md:w-10"
        /> */}
        <Image
          src={iconsTingkatResiko}
          alt="icon-tingkat-resiko"
          className="w-8 md:w-10"
        />
        <h3 className="font-bold text-sm md:text-lg text-neutral-700">
          Tingkat Risiko
        </h3>
      </div>
      <div className=" justify-items-center w-ful">
        <Chart options={options} series={series} type="donut" height={250} />
      </div>
    </div>
  );
};

export default ChartTingkatRisiko;
