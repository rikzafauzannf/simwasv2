'use client';

import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  ClientSideRowModelModule,
  ColDef,
  ColGroupDef,
  ModuleRegistry,
  ValidationModule,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

// Register the required AG-Grid modules
ModuleRegistry.registerModules([ClientSideRowModelModule, ValidationModule]);

// Interface untuk data
interface IPKPTData {
  no: number;
  area_pengawasan: string;
  jenis_pengawasan: string;
  tujuan_sasaran: string;
  ruang_lingkup: string;
  rencana_mulai: string;
  rencana_penerbitan: string;
  penanggung_jawab: string;
  wakil_penanggung_jawab: string;
  dalnis_supervisor: string;
  ketua_tim: string;
  anggota_tim: string;
  jumlah_hari: number;
  tim: string;
  anggaran: string;
  jumlah_laporan: number;
  sarana_prasarana: string;
  tingkat_resiko: string;
  keterangan: string;
}

const TablePKPT = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%',border:'none' }), []);
  const gridStyle = useMemo(() => ({ height: '500px', width: '100%' }), []);

  // Data Dummy
  const [rowData] = useState<IPKPTData[]>([
    {
      no: 1,
      area_pengawasan: 'Keuangan',
      jenis_pengawasan: 'Internal',
      tujuan_sasaran: 'Efisiensi Anggaran',
      ruang_lingkup: 'Evaluasi Proyek',
      rencana_mulai: '2024-01-10',
      rencana_penerbitan: '2024-02-15',
      penanggung_jawab: 'John Doe',
      wakil_penanggung_jawab: 'Jane Smith',
      dalnis_supervisor: 'Robert Wilson',
      ketua_tim: 'Anna Taylor',
      anggota_tim: 'Team A',
      jumlah_hari: 30,
      tim: 'Tim Keuangan',
      anggaran: 'Rp 50,000,000',
      jumlah_laporan: 1,
      sarana_prasarana: 'Laptop, Printer',
      tingkat_resiko: 'Tinggi',
      keterangan: 'Urgensi Tinggi',
    },
    {
      no: 2,
      area_pengawasan: 'SDM',
      jenis_pengawasan: 'Eksternal',
      tujuan_sasaran: 'Peningkatan Kinerja',
      ruang_lingkup: 'Audit Pelatihan',
      rencana_mulai: '2024-03-01',
      rencana_penerbitan: '2024-04-01',
      penanggung_jawab: 'Emily Johnson',
      wakil_penanggung_jawab: 'Mark Lee',
      dalnis_supervisor: 'Susan Brown',
      ketua_tim: 'David Green',
      anggota_tim: 'Team B',
      jumlah_hari: 20,
      tim: 'Tim SDM',
      anggaran: 'Rp 30,000,000',
      jumlah_laporan: 1,
      sarana_prasarana: 'Proyektor, Modul',
      tingkat_resiko: 'Sedang',
      keterangan: 'Prioritas Menengah',
    },
  ]);

  // Definisi kolom
  const [columnDefs] = useState<(ColDef | ColGroupDef)[]>([
    { field: 'no', headerName: 'No', sortable: true, filter: 'agNumberColumnFilter', width: 70 },
    { field: 'area_pengawasan', headerName: 'Area Pengawasan', sortable: true, filter: 'agTextColumnFilter', autoHeight:true,},
    { field: 'jenis_pengawasan', headerName: 'Jenis Pengawasan', sortable: true, filter: 'agTextColumnFilter', autoHeight:true,},
    { field: 'tujuan_sasaran', headerName: 'Tujuan Sasaran', sortable: true, filter: 'agTextColumnFilter', autoHeight:true,},
    { field: 'ruang_lingkup', headerName: 'Ruang Lingkup', sortable: true, filter: 'agTextColumnFilter', autoHeight:true,},
    {
      headerName: 'Jadwal',
      children: [
        { field: 'rencana_mulai', headerName: 'Rencana Mulai', sortable: true, filter: 'agDateColumnFilter', autoHeight:true,},
        { field: 'rencana_penerbitan', headerName: 'Rencana Penerbitan', sortable: true, filter: 'agDateColumnFilter', autoHeight:true,},
      ],
    },
    {
      headerName: 'Hari Penugasan',
      children: [
        { field: 'penanggung_jawab', headerName: 'Penanggung Jawab', sortable: true, filter: 'agTextColumnFilter', autoHeight:true,},
        { field: 'wakil_penanggung_jawab', headerName: 'Wakil Penanggung Jawab', sortable: true, filter: 'agTextColumnFilter', autoHeight:true,},
        { field: 'dalnis_supervisor', headerName: 'Dalnis/Supervisor', sortable: true, filter: 'agTextColumnFilter', autoHeight:true,},
        { field: 'ketua_tim', headerName: 'Ketua TIM', sortable: true, filter: 'agTextColumnFilter', autoHeight:true,},
        { field: 'anggota_tim', headerName: 'Anggota TIM', sortable: true, filter: 'agTextColumnFilter', autoHeight:true,},
        { field: 'jumlah_hari', headerName: 'Jumlah Hari', sortable: true, filter: 'agNumberColumnFilter', autoHeight:true,},
      ],
    },
    { field: 'tim', headerName: 'TIM', sortable: true, filter: 'agTextColumnFilter', autoHeight:true,},
    { field: 'anggaran', headerName: 'Anggaran', sortable: true, filter: 'agTextColumnFilter', autoHeight:true,},
    { field: 'jumlah_laporan', headerName: 'Jumlah Laporan', sortable: true, filter: 'agNumberColumnFilter', autoHeight:true,},
    { field: 'sarana_prasarana', headerName: 'Sarana dan Prasarana', sortable: true, filter: 'agTextColumnFilter', autoHeight:true,},
    { field: 'tingkat_resiko', headerName: 'Tingkat Resiko', sortable: true, filter: 'agTextColumnFilter', autoHeight:true,},
    { field: 'keterangan', headerName: 'Keterangan', sortable: true, filter: 'agTextColumnFilter', autoHeight:true,},
  ]);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(rowData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data PKPT');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: '.xlsx' });
    saveAs(data, 'data_pkpt.xlsx');
  };

  return (
    <div style={containerStyle}>
      <button onClick={exportToExcel} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
        Export to Excel
      </button>
      <div className="ag-theme-alpine border-none" >
        <AgGridReact<IPKPTData>
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true, filter: true, resizable: true }}
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
};

export default TablePKPT;
