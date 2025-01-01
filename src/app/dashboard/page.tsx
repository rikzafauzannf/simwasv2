import React from "react";
import { CardComponents } from "../components/Global/Card";
import CardAkumulasiDataALL from "../components/dashboard/CardAkumulasiDataALL";
import ChartTingkatRisiko from "../components/dashboard/ChartTingkatRisiko";
import ChartPengawasan from "../components/dashboard/ChartPengawasan";
import ChartRuangLingkup from "../components/dashboard/ChartRuangLingkup";
import ChartJenisPengawasan from "../components/dashboard/ChartJenisPengawasan";
import ChartAnggaran from "../components/dashboard/ChartAnggaran";
import Chartlaporan from "../components/dashboard/ChartLaporan";
import RevenueForecast from "../components/dashboard/RevenueForecast";


const DashboardPage = () => {
  return (
    <div className="space-y-8">
      {/* Top Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-full">
        <div className="lg:col-span-2">
          <CardAkumulasiDataALL />
        </div>
        <CardComponents>
          <ChartTingkatRisiko />
        </CardComponents>
      </section>
      {/* Data Chart */}
      <CardComponents>
        <ChartPengawasan />
      </CardComponents>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-full">
        <CardComponents>
          <ChartRuangLingkup />
        </CardComponents>
        <div className="lg:col-span-2">
          <CardComponents>
            <ChartJenisPengawasan />
          </CardComponents>
        </div>
        <div className="lg:col-span-2">
          <CardComponents>
            <ChartAnggaran />
          </CardComponents>
        </div>
        <CardComponents>
          <Chartlaporan />
        </CardComponents>
      </section>
      <RevenueForecast />
    </div>
  );
};

export default DashboardPage;
