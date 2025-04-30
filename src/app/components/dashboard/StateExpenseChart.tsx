"use client";

import React, { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useFetchAll } from "@/hooks/useFetchAll";
import { formatCurrency } from "@/data/formatData";
import { RekomendasiData } from "@/interface/interfaceTemuanHasil";
import { TindakLanjutDB } from "@/interface/interfaceTindakLanjut";

export default function StateExpenseChart() {
  // Fetch data
  const { data: DataTL } = useFetchAll<TindakLanjutDB>("tindak_lanjut");
  const { data: DataRekomendasi } = useFetchAll<RekomendasiData>("rekomendasi");
  
  // Get available years from the data
  const availableYears = useMemo(() => {
    const years = new Set<number>();
    
    DataTL.forEach(tl => {
      if (tl.tanggal_pengiriman) {
        const year = new Date(tl.tanggal_pengiriman).getFullYear();
        years.add(year);
      }
    });
    
    return Array.from(years).sort((a, b) => b - a); // Sort in descending order
  }, [DataTL]);
  
  // Default to the most recent year, or current year if no data
  const [selectedYear, setSelectedYear] = useState<number>(
    availableYears.length > 0 ? availableYears[0] : new Date().getFullYear()
  );

  // Calculate total values for the selected year only
  const totalKN = useMemo(() => {
    // First, find all tindak lanjut for the selected year
    const tlInSelectedYear = DataTL.filter(tl => {
      if (!tl.tanggal_pengiriman) return false;
      const year = new Date(tl.tanggal_pengiriman).getFullYear();
      return year === selectedYear;
    });
    
    // Get unique id_lhp values from the filtered tindak lanjut
    const lhpIdsInYear = new Set(tlInSelectedYear.map(tl => tl.id_lhp));
    
    // Sum up rekomendasi_nilai for recommendations that match these ids
    return DataRekomendasi
      .filter(item => lhpIdsInYear.has(item.id_rekomendasi))
      .reduce((sum, item) => sum + (Number(item.rekomendasi_nilai) || 0), 0);
  }, [DataRekomendasi, DataTL, selectedYear]);
  
  const knTindakLanjut = useMemo(() => 
    DataTL
      .filter(tl => {
        if (!tl.tanggal_pengiriman) return false;
        const year = new Date(tl.tanggal_pengiriman).getFullYear();
        return year === selectedYear;
      })
      .reduce((sum, item) => sum + (Number(item.nilai_setor) || 0), 0),
    [DataTL, selectedYear]
  );
  
  const knSisa = useMemo(() => 
    DataTL
      .filter(tl => {
        if (!tl.tanggal_pengiriman) return false;
        const year = new Date(tl.tanggal_pengiriman).getFullYear();
        return year === selectedYear;
      })
      .reduce((sum, item) => sum + (Number(item.sisa_nominal) || 0), 0),
    [DataTL, selectedYear]
  );

  // Group data by quarters for the selected year
  const quarterlyData = useMemo(() => {
    // Helper function to get quarter from date string
    const getQuarterFromDate = (dateString: string) => {
      if (!dateString) return null;
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth();
      const quarter = Math.floor(month / 3) + 1;
      return { year, quarter };
    };
    
    // Create map for quarters
    const quarters: {[key: string]: {
      dataAwal: number,
      tindakLanjut: number,
      sisa: number,
      count: number
    }} = {};

    // Initialize all quarters for the selected year
    for (let q = 1; q <= 4; q++) {
      quarters[`${selectedYear} Q${q}`] = {
        dataAwal: 0,
        tindakLanjut: 0,
        sisa: 0,
        count: 0
      };
    }

    // Process tindak lanjut data for the selected year
    DataTL.forEach(tl => {
      const dateInfo = getQuarterFromDate(tl.tanggal_pengiriman);
      if (!dateInfo || dateInfo.year !== selectedYear) return;
      
      const quarterKey = `${dateInfo.year} Q${dateInfo.quarter}`;
      
      // Find corresponding rekomendasi to get the initial value
      const relatedRekomendasi = DataRekomendasi.find(rek => rek.id_rekomendasi === tl.id_lhp);
      
      if (relatedRekomendasi) {
        quarters[quarterKey].dataAwal += Number(relatedRekomendasi.rekomendasi_nilai) || 0;
      }
      
      quarters[quarterKey].tindakLanjut += Number(tl.nilai_setor) || 0;
      quarters[quarterKey].sisa += Number(tl.sisa_nominal) || 0;
      quarters[quarterKey].count += 1;
    });
    
    // Convert to array and sort by quarter
    return Object.entries(quarters)
      .map(([quarter, values]) => ({
        quarter,
        dataAwal: values.dataAwal / 1000000, // Convert to millions for better chart visibility
        tindakLanjut: values.tindakLanjut / 1000000,
        sisa: values.sisa / 1000000
      }))
      .sort((a, b) => {
        const qA = a.quarter.split(' ')[1];
        const qB = b.quarter.split(' ')[1];
        return qA.localeCompare(qB);
      });
  }, [DataTL, DataRekomendasi, selectedYear]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded border">
          <p className="font-medium mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value * 1000000)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
      <div className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">

          <h3 className="text-lg font-semibold">Anggaran per Triwulan</h3>

          
          {/* Year filter dropdown */}
          <div className="flex items-center">
            <label htmlFor="yearFilter" className="mr-2 text-sm font-medium">Tahun:</label>
            <select
              id="yearFilter"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm bg-white"
            >
              {availableYears.length > 0 ? (
                availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))
              ) : (
                <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
              )}
            </select>
          </div>
        </div>
        
        <div className="flex justify-center mb-4">
          <div className="flex items-center mx-2">
            <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: "#86EFAC" }}></div>
            <span className="text-sm">Data Awal</span>
          </div>
          <div className="flex items-center mx-2">
            <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: "#A78BFA" }}></div>
            <span className="text-sm">Tindak Lanjut</span>
          </div>
          <div className="flex items-center mx-2">
            <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: "#F472B6" }}></div>
            <span className="text-sm">Sisa</span>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={quarterlyData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="quarter" axisLine={false} tickLine={false} />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tickFormatter={(value) => `${value}M`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="dataAwal" name="Data Awal" fill="#86EFAC" radius={[4, 4, 0, 0]} />
            <Bar dataKey="tindakLanjut" name="Tindak Lanjut" fill="#A78BFA" radius={[4, 4, 0, 0]} />
            <Bar dataKey="sisa" name="Sisa" fill="#F472B6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        
        {/* Stats for selected year */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="bg-blue-100 rounded-lg p-2">
            <h4 className="text-center text-gray-500 text-xs">Total KN {selectedYear}</h4>
            <p className="text-center font-bold text-green-500 text-sm">{formatCurrency(totalKN)}</p>
          </div>
          <div className="bg-blue-100 rounded-lg p-2">
            <h4 className="text-center text-gray-500 text-xs">KN Tindak Lanjut {selectedYear}</h4>
            <p className="text-center font-bold text-purple-500 text-sm">{formatCurrency(knTindakLanjut)}</p>
          </div>
          <div className="bg-blue-100 rounded-lg p-2">
            <h4 className="text-center text-gray-500 text-xs">KN Sisa {selectedYear}</h4>
            <p className="text-center font-bold text-pink-500 text-sm">{formatCurrency(knSisa)}</p>
          </div>
        </div>
      </div>
  );
}