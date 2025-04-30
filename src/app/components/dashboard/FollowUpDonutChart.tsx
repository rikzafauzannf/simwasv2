"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useFetchAll } from "@/hooks/useFetchAll";
import { TindakLanjutDB } from "@/interface/interfaceTindakLanjut";
import { CardComponents } from "@/app/components/Global/Card";

export default function FollowUpDonutChart() {
  // Fetch tindak lanjut data
  const { data: DataTL } = useFetchAll<TindakLanjutDB>("tindak_lanjut");

  // Calculate totals for each status
  const totalSesuai = DataTL.filter(
    (tl) => tl.kondisi_temuan === "sesuai"
  ).length;

  const totalDalamProses = DataTL.filter(
    (tl) => tl.kondisi_temuan === "dalam proses"
  ).length;

  const totalBelumTL = DataTL.filter(
    (tl) => tl.kondisi_temuan === "belum ditindak lanjut"
  ).length;

  const totalTidakDapatTL = DataTL.filter(
    (tl) => tl.kondisi_temuan === "tidak dapat ditindak lanjut"
  ).length;

  // Prepare chart data
  const chartData = [
    { name: "Belum ditindaklanjuti", value: totalBelumTL, color: "#697A98" },
    { name: "Dalam Proses", value: totalDalamProses, color: "#8FC8EB" },
    { name: "Sesuai", value: totalSesuai, color: "#4675C0" },
    { name: "TATD", value: totalTidakDapatTL, color: "#19335A" },
  ];

  // Calculate total
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 shadow rounded border">
          <p className="font-medium">{`${data.name}: ${data.value}`}</p>
          <p className="text-sm text-gray-500">{`(${((data.value / total) * 100).toFixed(1)}%)`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom Legend
  const renderLegend = (props: any) => {
    const { payload } = props;
    
    return (
      <div className="flex flex-wrap justify-center mt-4 gap-4">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div 
              className="w-3 h-3 mr-1" 
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-xs">
              {entry.value} ({chartData[index].value})
            </span>
          </div>
        ))}
      </div>
    );
  };

   return (
    <div>
      <div className="text-center font-semibold text-lg mb-2">Status Tindak Lanjut</div>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          {/* Tampilkan total di tengah donat */}
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="24" fontWeight="bold">
            {total}
          </text>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      {/* Legend di bawah */}
      <div className="flex justify-center flex-wrap gap-2 mt-4 text-sm">
        {chartData.map((entry, index) => (
          <div key={index} className="flex items-center gap-1">
            <div style={{ width: 12, height: 12, backgroundColor: entry.color }} />
            <span>{entry.name} ({entry.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
}