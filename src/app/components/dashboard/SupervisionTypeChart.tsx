"use client";

import { useFetchAll } from "@/hooks/useFetchAll";
import { DataChartJenisPengawasan } from "@/interface/interfaceChartData";
import { BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Bar, Cell } from "recharts";

export default function SupervisionTypeChart() {
  // Fetch data menggunakan custom hook
  const { data: DataJenisPengawasan = [] } = useFetchAll<DataChartJenisPengawasan>(
    'dashboardpkptjenispengawasan'
  );

  // Daftar warna yang akan digunakan secara berurutan
  const colors = ["#03045e", "#023e8a", "#0077b6", "#0096c7", "#00b4d8", "#48cae4", "#ade8f4"];

  // Transform API data ke format chart dengan proper return statement
  const data = DataJenisPengawasan.length > 0 
    ? DataJenisPengawasan.map((item, index) => {
        return {
          name: item.jenis_pengawasan,
          value: item.jumlah_data,
          color: colors[index % colors.length] // Menggunakan modulo untuk mengulang warna jika data lebih banyak
        };
      })
    : [
        // Fallback data jika API belum tersedia
        { name: "Audit Kinerja", value: 8, color: "#7DD3FC" },
        { name: "Audit Ketaatan", value: 11, color: "#BEF264" },
        { name: "Audit Tujuan Tertentu", value: 16, color: "#86EFAC" },
        { name: "Reviu", value: 18, color: "#A78BFA" },
        { name: "Evaluasi", value: 15, color: "#FDA4AF" },
        { name: "Monitoring", value: 19, color: "#86EFAC" },
        { name: "Pengawasan Lainnya", value: 20, color: "#7DD3FC" },
      ];

  // Mencari nilai maksimum untuk domain X-axis
  const maxValue = Math.max(...data.map(item => item.value), 20); // Minimal 20 atau nilai maksimum data

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
      >
        <XAxis type="number" domain={[0, maxValue]} />
        <YAxis type="category" dataKey="name" width={100} />
        <Tooltip />
        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}