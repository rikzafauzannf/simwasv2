"use client";
// File: src/app/page.tsx

import { useState } from "react";
import SummaryCard from "../components/dashboard/SummaryCard";
import ReportBarChart from "../components/dashboard/ReportBarChart";
import FollowUpDonutChart from "../components/dashboard/FollowUpDonutChart";
import FindingsCard from "../components/dashboard/FindingCard";
import StateExpenseChart from "../components/dashboard/StateExpenseChart";
import { useFetchOne } from "@/hooks/useFetchOne";21
import { DataSumaryPkpt } from "@/interface/interfaceChartData";
import ChartTingkatRisiko from "../components/dashboard/ChartTingkatRisiko";
import Image from 'next/image';
import iconsTingkatResiko from '/public/images/products/tingkat_resiko_bg.svg';
import IconsJumlahLaporan from '/public/images/products/laporan_bg.svg';
import IconsKN from '/public/images/products/anggaran_bg.svg';
import ChartJenisPengawasan from "../components/dashboard/ChartJenisPengawasan";

export default function Dashboard() {
  const [tab, setTab] = useState("overview");

  const { data: dataSummary, isLoading } =
    useFetchOne<DataSumaryPkpt>('dashboartotalpkpt');
  
    const totalPKPT = dataSummary?.total_pkpt ?? 0;
    const totalStPkpt = dataSummary?.total_st_pkpt ?? 0;
    const totalLHP = dataSummary?.total_lhp_pkpt ?? 0;
    const totalNonPKPT = dataSummary?.total_non_pkpt ?? 0;
    const totalStNonPkpt = dataSummary?.total_st_non_pkpt ?? 0;
  const totalNonLHP = dataSummary?.total_lhp_non_pkpt ?? 0;

  return (
    <div>
      <div className="container mx-auto px-4 py-6">
        {/* Tab navigation */}
        <div className="mb-8 flex justify-center">
          <div className=" bg-opacity-80 rounded-lg p-2 bg-blue-500">
            <button 
              className={`px-2 py-2 rounded-lg ${tab === 'overview' ? 'bg-white text-blue-600' : 'text-white'}`}
              onClick={() => setTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-2 py-2 rounded-lg ${tab === 'details' ? 'bg-white text-blue-600' : 'text-white'}`}
              onClick={() => setTab('details')}
            >
              Details
            </button>
            <button 
              className={`px-2 py-2 rounded-lg ${tab === 'reports' ? 'bg-white text-blue-600' : 'text-white'}`}
              onClick={() => setTab('reports')}
            >
              Reports
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 bg-blue-500 rounded-lg">
          {/* PKPT Section */}
          <div className="bg-white bg-opacity-20 p-4 m-4 rounded-lg">
            <h2 className="text-white text-center text-xl font-semibold mb-4">PKPT</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SummaryCard title="Jumlah PKPT" value={String(totalPKPT)} />
              <SummaryCard title="Jumlah ST" value={String(totalStPkpt)} />
              <SummaryCard title="Jumlah LHP" value={String(totalLHP)} />
            </div>
          </div>
          
          {/* Non PKPT Section */}
          <div className="bg-white bg-opacity-20 p-4 m-4 rounded-lg">
            <h2 className="text-white text-center text-xl font-semibold mb-4">Non PKPT</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SummaryCard title="Jumlah Non PKPT" value={String(totalNonPKPT)} />
              <SummaryCard title="Jumlah ST" value={String(totalStPkpt)} />
              <SummaryCard title="Jumlah LHP" value={String(totalNonLHP)} />
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Supervision Type Bar Chart */}
          <div className="bg-white rounded-lg p-4 shadow-md flex flex-col lg:col-span-4">
            <div className="flex justify-between items-center mb-4">
                {/* <div className="flex gap-2 items-center">
                  <Image
                    src={IconsJenisPengawasan}
                    alt="icons-jenis-pengawasan"
                    className="w-8 md:w-10"
                  />
                  <h3 className="font-bold text-sm md:text-lg text-neutral-700">
                    Jenis Pengawasan
                  </h3>
                </div> */}
              <button className="text-blue-500">
              </button>
            </div>
            <div className="flex-grow">
              <ChartJenisPengawasan />
            </div>
          </div>

          {/* Risk Donut Chart */}
          <div className="bg-white rounded-lg p-4 shadow-md flex flex-col lg:col-span-1">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2 items-center">
                <Image
                  src={iconsTingkatResiko}
                  alt="icon-tingkat-resiko"
                  className="w-8 md:w-10"
                />
                <h3 className="font-bold text-sm md:text-lg text-neutral-700">
                  Tingkat Risiko
                </h3>
              </div>
              <button className="text-blue-500">
              </button>
            </div>
            <div className="flex-grow">
              <ChartTingkatRisiko />
            </div>
          </div>

          {/* Report Bar Chart */}
          <div className="bg-white rounded-lg p-4 shadow-md flex flex-col lg:col-span-3">
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2 items-center">
                  <Image
                    src={IconsJumlahLaporan}
                    alt="icons-jumlah-laporan"
                    className="w-8 md:w-10"
                  />
                  <h3 className="font-bold text-sm md:text-lg text-neutral-700">
                    Jumlah Laporan
                  </h3>
                </div>
              <button className="text-blue-500">
              </button>
            </div>
            <div className="flex-grow">
              <ReportBarChart />
            </div>
          </div>

          {/* Follow Up Donut Chart */}
          <div className="bg-white rounded-lg p-4 shadow-md flex flex-col lg:col-span-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2 items-center">
                <Image
                  src={iconsTingkatResiko}
                  alt="icon-tingkat-resiko"
                  className="w-8 md:w-10"
                />
                <h3 className="font-bold text-sm md:text-lg text-neutral-700">
                  Tindak Lanjut
                </h3>
              </div>
              <button className="text-blue-500">
              </button>
            </div>
            <div className="flex-grow flex flex-row">
              <div className="flex-1"><FollowUpDonutChart /></div>
              <div className="flex-1"><FindingsCard /></div>
            </div>
          </div>

          {/* State Expense Chart */}
          <div className="bg-white rounded-lg p-4 shadow-md flex flex-col lg:col-span-4">
            <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-2 items-center">
                  <Image
                    src={IconsKN}
                    alt="icons-Kerugian-Negara"
                    className="w-8 md:w-10"
                  />
                  <h3 className="font-bold text-sm md:text-lg text-neutral-700">
                    Kerugian Negara
                  </h3>
                </div>
              <button className="text-blue-500">
              </button>
            </div>
            <div className="flex-grow">
              <StateExpenseChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}