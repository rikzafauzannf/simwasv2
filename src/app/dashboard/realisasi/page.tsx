'use client';
import { CardComponents } from '@/app/components/Global/Card';
import { formatToLocalDate } from '@/data/formatData';
import { useFetchAll } from '@/hooks/useFetchAll';
import {
  useGetNameJenisLaporan,
  useGetNameJenisPengawasan,
  useGetNameRuangLingkup,
  useGetNameUser,
} from '@/hooks/useGetName';
import { LHPData } from '@/interface/interfaceHasilPengawasan';
import { PKPTDataBase } from '@/interface/interfacePKPT';
import { SuratTugasData } from '@/interface/interfaceSuratTugas';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import { Table, Button } from 'flowbite-react';
import React from 'react';
import * as XLSX from 'xlsx';

const TableHeader = () => {
  return (    
    <thead className="bg-gray-200">
      <tr className="text-center align-middle">
        <td
          className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase"
          rowSpan={2}
        >
          No.
        </td>
        <td
          className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase"
          rowSpan={2}
        >
          Area Pengawasan
        </td>
        <td
          className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase"
          rowSpan={2}
        >
          Jenis Pengawasan
        </td>
        <td
          className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase"
          rowSpan={2}
        >
          Tujuan/Sasaran
        </td>
        <td
          className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase"
          rowSpan={2}
          // colSpan={3}
        >
          Ruang Lingkup
        </td>
        <td
          className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase"
          colSpan={2}
        >
          Jadwal
        </td>
        <td
          className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase"
          rowSpan={2}
        >
          Tim
        </td>
        <td
          className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase"
          rowSpan={2}
          colSpan={2}
        >
          Jumlah Laporan
        </td>
        <td
          className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase"
          rowSpan={2}
        >
          Keterangan
        </td>
        <td
          className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase"
          rowSpan={2}
        >
          Jumlah Surat Tugas
        </td>
        <td
          className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase"
          rowSpan={2}
        >
          Bulan
        </td>
        <td
          className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase"
          rowSpan={2}
        >
          Program Audit/Kegiatan
        </td>
        <td
          className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase"
          rowSpan={2}
        >
          No./TGL SP
        </td>
        <td
          className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase"
          rowSpan={2}
        >
          Waktu Penugasan
        </td>
        <td
          className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase"
          rowSpan={2}
        >
          Tim Pemeriksa/Pelaksana Kegiatan
        </td>
        <td
          className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase"
          rowSpan={2}
        >
          Pengendali Teknis/Supervisor
        </td>
        <td
          className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase"
          rowSpan={2}
        >
          Ketua Tim
        </td>
        <td
          className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase"
          rowSpan={2}
        >
          Anggota Tim
        </td>
        <td
          className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase"
          rowSpan={2}
        >
          Jumlah Objek Pengawasan
        </td>
        <td
          className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase"
          rowSpan={2}
        >
          Jumlah Laporan
        </td>
        <td
          className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase"
          rowSpan={2}
        >
          No./TGL LHP/LHE/LHR
        </td>
      </tr>
      <tr className="text-center align-middle">
        <td className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase">
          Rencana Mulai
        </td>
        <td className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase">
          Rencana Penerbitan
        </td>
      </tr>
    </thead>
  );
};

const RealisasiPKPTPage = () => {
  const { data: DataPKPT } = useFetchAll<PKPTDataBase>('pkpt');
  const { data: DataSuratTugas } = useFetchAll<SuratTugasData>('surat_tugas');
  const { data: DataLHP } = useFetchAll<LHPData>('lhp');

  const { getNameJenisLaporan } = useGetNameJenisLaporan();
  const { getNameRuangLingkup } = useGetNameRuangLingkup();
  const { getNameJenisPengawasan } = useGetNameJenisPengawasan();
  const { getNameUser } = useGetNameUser();

  const structuredData = React.useMemo(() => {
    return DataPKPT.map((pkpt) => {
      // Get all Surat Tugas for this PKPT
      const relatedST = DataSuratTugas.filter(
        (st) => st.id_pkpt === pkpt.id_pkpt
      );

      // For each ST, get related LHP
      const stWithLHP = relatedST.map((st) => ({
        ...st,
        lhpList: DataLHP.filter((lhp) => lhp.id_st === st.id_st),
      }));

      return {
        ...pkpt,
        suratTugas: stWithLHP,
      };
    });
  }, [DataPKPT, DataSuratTugas, DataLHP]);

  const exportToExcel = () => {
    const HEADER_STYLE = {
      font: { bold: true, size: 11 },
      alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
      border: {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' },
      },
    };

    // Create title rows
    const title = [
      [
        {
          v: 'REALISASI PROGRAM KERJA PENGAWASAN TAHUNAN',
          s: {
            font: { bold: true, size: 14 },
            alignment: { horizontal: 'center' },
          },
        },
      ],
      [
        {
          v: 'PENYELENGGARAAN PEMERINTAHAN DAERAH',
          s: {
            font: { bold: true, size: 14 },
            alignment: { horizontal: 'center' },
          },
        },
      ],
      [
        {
          v: `S/D BULAN AGUSTUS ${new Date().getFullYear()}`,
          s: {
            font: { bold: true, size: 14 },
            alignment: { horizontal: 'center' },
          },
        },
      ],
      [''], // Empty row for spacing
    ];

    // Create header rows
    const headers = [
      [
        { v: 'No.', s: HEADER_STYLE },
        { v: 'Area Pengawasan', s: HEADER_STYLE },
        { v: 'Jenis Pengawasan', s: HEADER_STYLE },
        { v: 'Tujuan/Sasaran', s: HEADER_STYLE },
        { v: 'Ruang Lingkup', s: HEADER_STYLE },
        { v: 'Jadwal', s: HEADER_STYLE },
        { v: 'Jadwal', s: HEADER_STYLE },
        { v: 'Tim', s: HEADER_STYLE },
        { v: 'Jumlah Laporan', s: HEADER_STYLE },
        { v: 'Keterangan', s: HEADER_STYLE },
        { v: 'Jumlah Surat Tugas', s: HEADER_STYLE },
        { v: 'Bulan', s: HEADER_STYLE },
        { v: 'Program Audit/Kegiatan', s: HEADER_STYLE },
        { v: 'No./TGL SP', s: HEADER_STYLE },
        { v: 'Waktu Penugasan', s: HEADER_STYLE },
        { v: 'Tim Pemeriksa/Pelaksana Kegiatan', s: HEADER_STYLE },
        { v: 'Pengendali Teknis/Supervisor', s: HEADER_STYLE },
        { v: 'Ketua Tim', s: HEADER_STYLE },
        { v: 'Anggota Tim', s: HEADER_STYLE },
        { v: 'Jumlah Objek Pengawasan', s: HEADER_STYLE },
        { v: 'Jumlah Laporan', s: HEADER_STYLE },
        { v: 'No./TGL LHP/LHE/LHR', s: HEADER_STYLE },
      ],
      [
        { v: '', s: HEADER_STYLE },
        { v: '', s: HEADER_STYLE },
        { v: '', s: HEADER_STYLE },
        { v: '', s: HEADER_STYLE },
        { v: '', s: HEADER_STYLE },
        { v: 'Rencana Mulai', s: HEADER_STYLE },
        { v: 'Rencana Penerbitan', s: HEADER_STYLE },
        { v: '', s: HEADER_STYLE },
        { v: '', s: HEADER_STYLE },
        { v: '', s: HEADER_STYLE },
        { v: '', s: HEADER_STYLE },
        { v: '', s: HEADER_STYLE },
        { v: '', s: HEADER_STYLE },
        { v: '', s: HEADER_STYLE },
        { v: '', s: HEADER_STYLE },
        { v: '', s: HEADER_STYLE },
        { v: '', s: HEADER_STYLE },
        { v: '', s: HEADER_STYLE },
        { v: '', s: HEADER_STYLE },
        { v: '', s: HEADER_STYLE },
        { v: '', s: HEADER_STYLE },
      ],
    ];

    const wsData = [...title, ...headers];

    // Add data rows with styling
    structuredData.forEach((pkpt, pkptIndex) => {
      pkpt.suratTugas.forEach((st, stIndex) => {
        const lhpItems = st.lhpList.length > 0 ? st.lhpList : [null];

        lhpItems.forEach((lhp, lhpIndex) => {
          const rowData = [
            {
              v: pkptIndex + 1,
              s: { font: { size: 11 }, alignment: { horizontal: 'center' } },
            },
            {
              v: pkpt.area_pengawasan,
              s: { font: { size: 11 }, alignment: { horizontal: 'left' } },
            },
            {
              v: getNameJenisPengawasan(pkpt.id_jenis_pengawasan),
              s: { font: { size: 11 }, alignment: { horizontal: 'left' } },
            },
            {
              v: pkpt.tujuan_sasaran,
              s: { font: { size: 11 }, alignment: { horizontal: 'left' } },
            },
            {
              v: getNameRuangLingkup(pkpt.id_ruang_lingkup),
              s: { font: { size: 11 }, alignment: { horizontal: 'left' } },
            },
            {
              v: formatToLocalDate(pkpt.rmp_pkpt),
              s: { font: { size: 11 }, alignment: { horizontal: 'center' } },
            },
            {
              v: formatToLocalDate(pkpt.rpl_pkpt),
              s: { font: { size: 11 }, alignment: { horizontal: 'center' } },
            },
            {
              v: pkpt.tim,
              s: { font: { size: 11 }, alignment: { horizontal: 'left' } },
            },
            {
              v: pkpt.jumlah_laporan,
              s: { font: { size: 11 }, alignment: { horizontal: 'center' } },
            },
            {
              v: getNameJenisLaporan(pkpt.id_jenis_laporan),
              s: { font: { size: 11 }, alignment: { horizontal: 'left' } },
            },
            {
              v: pkpt.keterangan,
              s: { font: { size: 11 }, alignment: { horizontal: 'left' } },
            },
            {
              v: pkpt.suratTugas.length,
              s: { font: { size: 11 }, alignment: { horizontal: 'center' } },
            },
            {
              v: st.bulan,
              s: { font: { size: 11 }, alignment: { horizontal: 'center' } },
            },
            {
              v: st.program_audit,
              s: { font: { size: 11 }, alignment: { horizontal: 'left' } },
            },
            {
              v: st.no_tglsp,
              s: { font: { size: 11 }, alignment: { horizontal: 'center' } },
            },
            {
              v: st.waktu_penugasan,
              s: { font: { size: 11 }, alignment: { horizontal: 'center' } },
            },
            {
              v: getNameUser(Number(st.tim_pemeriksa)),
              s: { font: { size: 11 }, alignment: { horizontal: 'left' } },
            },
            {
              v: getNameUser(Number(st.pengendali_teknis)),
              s: { font: { size: 11 }, alignment: { horizontal: 'left' } },
            },
            {
              v: getNameUser(Number(st.ketua_tim)),
              s: { font: { size: 11 }, alignment: { horizontal: 'left' } },
            },
            {
              v: st.anggota_tim
                .split(',')
                .map((id) => getNameUser(Number(id)))
                .join(', '),
              s: { font: { size: 11 }, alignment: { horizontal: 'left' } },
            },
            {
              v: st.jumlah_objek,
              s: { font: { size: 11 }, alignment: { horizontal: 'center' } },
            },
            {
              v: st.jumlah_laporan,
              s: { font: { size: 11 }, alignment: { horizontal: 'center' } },
            },
            {
              v: lhp?.no_lhp || '',
              s: { font: { size: 11 }, alignment: { horizontal: 'center' } },
            },
          ];
          wsData.push(
            rowData as {
              v: string;
              s: {
                font: { bold: boolean; size: number };
                alignment: { horizontal: string };
              };
            }[]
          );
        });
      });
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Define merged cells
    ws['!merges'] = [
      // Title merges
      { s: { r: 0, c: 0 }, e: { r: 0, c: 21 } }, // REALISASI PROGRAM KERJA
      { s: { r: 1, c: 0 }, e: { r: 1, c: 21 } }, // PENYELENGGARAAN PEMERINTAHAN
      { s: { r: 2, c: 0 }, e: { r: 2, c: 21 } }, // S/D BULAN

      // Header merges - matches table structure
      { s: { r: 4, c: 0 }, e: { r: 5, c: 0 } }, // No. (rowSpan={2})
      { s: { r: 4, c: 1 }, e: { r: 5, c: 1 } }, // Area Pengawasan (rowSpan={2})
      { s: { r: 4, c: 2 }, e: { r: 5, c: 2 } }, // Jenis Pengawasan (rowSpan={2})
      { s: { r: 4, c: 3 }, e: { r: 5, c: 3 } }, // Tujuan/Sasaran (rowSpan={2})
      { s: { r: 4, c: 4 }, e: { r: 5, c: 4 } }, // Ruang Lingkup (rowSpan={2})
      { s: { r: 4, c: 5 }, e: { r: 4, c: 6 } }, // Jadwal (colSpan={2})
      { s: { r: 4, c: 7 }, e: { r: 5, c: 7 } }, // Tim (rowSpan={2})
      { s: { r: 4, c: 8 }, e: { r: 5, c: 9 } }, // Jumlah Laporan (rowSpan={2}, colSpan={2})
      { s: { r: 4, c: 10 }, e: { r: 5, c: 10 } }, // Keterangan (rowSpan={2})
      { s: { r: 4, c: 11 }, e: { r: 5, c: 11 } }, // Jumlah Surat Tugas (rowSpan={2})
      { s: { r: 4, c: 12 }, e: { r: 5, c: 12 } }, // Bulan (rowSpan={2})
      { s: { r: 4, c: 13 }, e: { r: 5, c: 13 } }, // Program Audit/Kegiatan (rowSpan={2})
      { s: { r: 4, c: 14 }, e: { r: 5, c: 14 } }, // No./TGL SP (rowSpan={2})
      { s: { r: 4, c: 15 }, e: { r: 5, c: 15 } }, // Waktu Penugasan (rowSpan={2})
      { s: { r: 4, c: 16 }, e: { r: 5, c: 16 } }, // Tim Pemeriksa/Pelaksana Kegiatan (rowSpan={2})
      { s: { r: 4, c: 17 }, e: { r: 5, c: 17 } }, // Pengendali Teknis/Supervisor (rowSpan={2})
      { s: { r: 4, c: 18 }, e: { r: 5, c: 18 } }, // Ketua Tim (rowSpan={2})
      { s: { r: 4, c: 19 }, e: { r: 5, c: 19 } }, // Anggota Tim (rowSpan={2})
      { s: { r: 4, c: 20 }, e: { r: 5, c: 20 } }, // Jumlah Objek Pengawasan (rowSpan={2})
      { s: { r: 4, c: 21 }, e: { r: 5, c: 21 } }, // No./TGL LHP/LHE/LHR (rowSpan={2})
    ];

    // Define column widths
    ws['!cols'] = [
      { width: 5 }, // No.
      { width: 20 }, // Area Pengawasan
      { width: 20 }, // Jenis Pengawasan
      { width: 25 }, // Tujuan/Sasaran
      { width: 20 }, // Ruang Lingkup
      { width: 15 }, // Jadwal - Rencana Mulai
      { width: 15 }, // Jadwal - Rencana Penerbitan
      { width: 20 }, // Tim
      { width: 15 }, // Jumlah Laporan
      { width: 20 }, // Keterangan
      { width: 15 }, // Jumlah Surat Tugas
      { width: 15 }, // Bulan
      { width: 25 }, // Program Audit/Kegiatan
      { width: 20 }, // No./TGL SP
      { width: 20 }, // Waktu Penugasan
      { width: 25 }, // Tim Pemeriksa
      { width: 25 }, // Pengendali Teknis
      { width: 20 }, // Ketua Tim
      { width: 30 }, // Anggota Tim
      { width: 15 }, // Jumlah Objek
      { width: 15 }, // Jumlah Laporan
      { width: 25 }, // No./TGL LHP
    ];

    // Define row heights
    ws['!rows'] = [
      { hpt: 30 }, // Title rows
      { hpt: 30 },
      { hpt: 30 },
      { hpt: 20 }, // Spacing
      { hpt: 40 }, // Header rows
      { hpt: 40 },
      { hpt: 40 }, // Data rows
      { hpt: 40 },
      { hpt: 40 },
      { hpt: 40 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Realisasi PKPT');
    XLSX.writeFile(wb, 'Realisasi_PKPT.xlsx');
  };

  return (
    <AuthRoleWrapper
      allowedRoles={['Admin', 'Pimpinan', 'Pelaksana', 'Auditor', 'Developer']}
    >
    <div className="space-y-4">
      <CardComponents>
        <div className="flex justify-between items-center">
          <h1>Data Realisasi</h1>
          <Button className="bg-blue-500 text-white" onClick={exportToExcel}>
            Export to Excel
          </Button>
        </div>
      </CardComponents>
      <CardComponents>
        <div className="grid gap-3">
          <div className="w-full text-center">
            <h1>REALISASI PROGRAM KERJA PENGAWASAN TAHUNAN</h1>
            <h2>PENYELENGGARAAN PEMERINTAHAN DAERAH</h2>
            <p>S/D BULAN AGUSTUS 2024</p>
          </div>
          <div className="w-full overflow-auto">
            <Table className="w-full">
              <TableHeader />
              <tbody>
                {structuredData.map((pkpt, pkptIndex) => {
                  return pkpt.suratTugas.map((st, stIndex) => {
                    const isFirstST = stIndex === 0;
                    const lhpItems =
                      st.lhpList.length > 0 ? st.lhpList : [null];

                    return lhpItems.map((lhp, lhpIndex) => (
                      <tr
                        key={`${pkpt.id_pkpt}-${st.id_st}-${lhpIndex}`}
                        className="hover:bg-gray-100"
                      >
                        {isFirstST && lhpIndex === 0 && (
                          <>
                            <td
                              className="border border-gray-300 p-2 text-center"
                              rowSpan={pkpt.suratTugas.reduce(
                                (acc, st) =>
                                  acc + Math.max(st.lhpList.length, 1),
                                0
                              )}
                            >
                              {pkptIndex + 1}
                            </td>
                            <td
                              className="border border-gray-300 p-2"
                              rowSpan={pkpt.suratTugas.reduce(
                                (acc, st) =>
                                  acc + Math.max(st.lhpList.length, 1),
                                0
                              )}
                            >
                              {pkpt.area_pengawasan}
                            </td>
                            <td
                              className="border border-gray-300 p-2"
                              rowSpan={pkpt.suratTugas.reduce(
                                (acc, st) =>
                                  acc + Math.max(st.lhpList.length, 1),
                                0
                              )}
                            >
                              {getNameJenisPengawasan(pkpt.id_jenis_pengawasan)}
                            </td>
                            <td
                              className="border border-gray-300 p-2"
                              rowSpan={pkpt.suratTugas.reduce(
                                (acc, st) =>
                                  acc + Math.max(st.lhpList.length, 1),
                                0
                              )}
                            >
                              {pkpt.tujuan_sasaran}
                            </td>
                            <td
                              className="border border-gray-300 p-2"
                              rowSpan={pkpt.suratTugas.reduce(
                                (acc, st) =>
                                  acc + Math.max(st.lhpList.length, 1),
                                0
                              )}
                            >
                              {getNameRuangLingkup(pkpt.id_ruang_lingkup)}
                            </td>
                            <td
                              className="border border-gray-300 p-2 text-center"
                              rowSpan={pkpt.suratTugas.reduce(
                                (acc, st) =>
                                  acc + Math.max(st.lhpList.length, 1),
                                0
                              )}
                            >
                              {formatToLocalDate(pkpt.rmp_pkpt)}
                            </td>
                            <td
                              className="border border-gray-300 p-2 text-center"
                              rowSpan={pkpt.suratTugas.reduce(
                                (acc, st) =>
                                  acc + Math.max(st.lhpList.length, 1),
                                0
                              )}
                            >
                              {formatToLocalDate(pkpt.rpl_pkpt)}
                            </td>
                            <td
                              className="border border-gray-300 p-2"
                              rowSpan={pkpt.suratTugas.reduce(
                                (acc, st) =>
                                  acc + Math.max(st.lhpList.length, 1),
                                0
                              )}
                            >
                              {pkpt.tim.split('|').map((items, index) => (
                                <p key={index}>{items}</p>
                              ))}
                            </td>
                            <td
                              className="border border-gray-300 p-2 text-center"
                              rowSpan={pkpt.suratTugas.reduce(
                                (acc, st) =>
                                  acc + Math.max(st.lhpList.length, 1),
                                0
                              )}
                            >
                              {pkpt.jumlah_laporan}
                            </td>
                            <td
                              className="border border-gray-300 p-2 text-center"
                              rowSpan={pkpt.suratTugas.reduce(
                                (acc, st) =>
                                  acc + Math.max(st.lhpList.length, 1),
                                0
                              )}
                            >
                              {getNameJenisLaporan(pkpt.id_jenis_laporan)}
                            </td>
                            <td
                              className="border border-gray-300 p-2"
                              rowSpan={pkpt.suratTugas.reduce(
                                (acc, st) =>
                                  acc + Math.max(st.lhpList.length, 1),
                                0
                              )}
                            >
                              {pkpt.keterangan}
                            </td>
                            <td
                              className="border border-gray-300 p-2 text-center"
                              rowSpan={pkpt.suratTugas.reduce(
                                (acc, st) =>
                                  acc + Math.max(st.lhpList.length, 1),
                                0
                              )}
                            >
                              {pkpt.suratTugas.length}
                            </td>
                          </>
                        )}
                        <td className="border border-gray-300 p-2">
                          {st.bulan}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {st.program_audit}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {st.no_tglsp}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {st.waktu_penugasan}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {getNameUser(Number(st.tim_pemeriksa))}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {getNameUser(Number(st.pengendali_teknis))}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {getNameUser(Number(st.ketua_tim))}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {st.anggota_tim
                            .split(',')
                            .map((items) => getNameUser(Number(items)))
                            .join(', ')}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {st.jumlah_objek}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {st.jumlah_laporan}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {lhp?.no_lhp || ''}
                        </td>
                      </tr>
                    ));
                  });
                })}
              </tbody>
            </Table>
          </div>
          </div>
        </CardComponents>
      </div>
    </AuthRoleWrapper>
  );
};

export default RealisasiPKPTPage;
