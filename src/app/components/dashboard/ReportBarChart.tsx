"use client";

import { useFetchAll } from "@/hooks/useFetchAll";
import { DataChartTingkatPengawasan } from "@/interface/interfaceChartData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function ReportBarChart() {
  const { data: DataTingkatResiko = [] } = useFetchAll<DataChartTingkatPengawasan>(
    'dashboardpkptbytingkatresiko'
  );

  // Fixed the data transformation logic
  const data = DataTingkatResiko.length > 0
    ? DataTingkatResiko.map((item, index) => {
        // Define colors based on index to ensure every bar gets a color
        const colors = ["#A78BFA", "#86EFAC", "#FDA4AF", "#60A5FA", "#FCD34D"];
        return {
          name: item.tingkat_resiko,
          value: item.jumlah_data,
          color: colors[index % colors.length]
        };
      })
    : [];

  // Fallback to sample data if no data is available
  const sampleData = [
    { name: "LHR", value: 320, color: "#A78BFA" },
    { name: "LHA", value: 220, color: "#86EFAC" },
    { name: "LHP", value: 160, color: "#FDA4AF" },
  ];

  const displayData = data.length > 0 ? data : sampleData;

  return (
    <div className="h-full">
      <div className="flex justify-center mb-4">
        {displayData.map((item, index) => (
          <div key={index} className="flex items-center mx-2">
            <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: item.color }}></div>
            <span className="text-sm">{item.name}</span>
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={displayData}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis 
            domain={[0, 'auto']} 
            axisLine={false} 
            tickLine={false} 
          />
          <Tooltip />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {displayData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}