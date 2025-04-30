"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface RiskDonutChartProps {
  title?: string;
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export default function RiskDonutChart({ 
  title = "Total Risiko",
  data
}: RiskDonutChartProps) {
  // Calculate total
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex items-center justify-center w-full h-64">
      <div className="relative w-64 h-64">
        {/* The chart */}
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Total in center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <div className="text-sm text-gray-500">{title}</div>
          <div className="text-3xl font-bold">{total}</div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex flex-col ml-4 space-y-2">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div className="w-3 h-3 mr-2" style={{ backgroundColor: entry.color }}></div>
            <span className="text-sm">{entry.name}: {entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};