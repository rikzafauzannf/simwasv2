import { PKPTDataBase } from '@/interface/interfacePKPT';
import { JenisPengawasanDB } from '@/interface/interfaceReferensi';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { formatCurrency } from '@/data/formatData';
// Types
interface TableHooks {
  getNameUser: (id: number) => string;
  getNameTingkatResiko: (id: number) => string;
  getNameRuangLingkup: (id: number) => string;
  getNameJenisLaporan: (id: number) => string;
  getNameJenisPengawasan: (id: number) => string;
}

// Constants
const EXCEL_HEADER_STYLE = {
  alignment: { vertical: 'center', horizontal: 'center', wrapText: true },
  font: { bold: true },
  border: {
    top: { style: 'thin' },
    bottom: { style: 'thin' },
    left: { style: 'thin' },
    right: { style: 'thin' },
  },
};

const CELL_BORDER_STYLE = {
  border: {
    top: { style: 'medium', color: { rgb: '000000' } },
    bottom: { style: 'medium', color: { rgb: '000000' } },
    left: { style: 'medium', color: { rgb: '000000' } },
    right: { style: 'medium', color: { rgb: '000000' } },
  },
};

// Excel Export Functions
const createExcelWorksheet = (
  data: PKPTDataBase[],
  jenisPengawasanData: JenisPengawasanDB[],
  hooks: TableHooks,
  status: string
): XLSX.WorkSheet => {
  const HEADER_STYLE = {
    font: {
      bold: true,
      size: 12, // Increased size for better visibility
    },
    alignment: {
      horizontal: 'center',
      vertical: 'center',
      wrapText: true,
    },
    fill: {
      fgColor: { rgb: 'E0E0E0' }, // Light gray background for headers
      type: 'pattern',
      patternType: 'solid',
    },
    ...CELL_BORDER_STYLE,
  };

  const CELL_STYLE = {
    font: {
      size: 11,
      bold: false,
    },
    alignment: {
      horizontal: 'center',
      vertical: 'center',
      wrapText: true,
    },
    ...CELL_BORDER_STYLE,
  };

  const TITLE_STYLE = {
    font: {
      bold: true,
      size: 14,
    },
    alignment: {
      horizontal: 'center',
      vertical: 'center',
    },
  };

  const title = [
    [
      {
        v: `PROGRAM KERJA PENGAWASAN TAHUNAN (${status})`,
        s: TITLE_STYLE,
      },
    ],
    [
      {
        v: 'INSPEKTORAT DAERAH KOTA TASIKMALAYA',
        s: TITLE_STYLE,
      },
    ],
    [
      {
        v: `TAHUN ${new Date().getFullYear()}`,
        s: TITLE_STYLE,
      },
    ],
    [''],
  ];

  const headers = [
    [
      { v: 'NO', s: HEADER_STYLE },
      { v: 'Area\nPengawasan', s: HEADER_STYLE },
      { v: 'Jenis\nPengawasan', s: HEADER_STYLE },
      { v: 'Tujuan/\nSasaran', s: HEADER_STYLE },
      { v: 'Ruang\nLingkup', s: HEADER_STYLE },
      { v: 'Jadwal', s: HEADER_STYLE },
      { v: 'Jadwal', s: HEADER_STYLE },
      { v: 'Hari Penugasan', s: HEADER_STYLE },
      { v: 'Hari Penugasan', s: HEADER_STYLE },
      { v: 'Hari Penugasan', s: HEADER_STYLE },
      { v: 'Hari Penugasan', s: HEADER_STYLE },
      { v: 'Hari Penugasan', s: HEADER_STYLE },
      { v: 'Hari Penugasan', s: HEADER_STYLE },
      { v: 'TIM', s: HEADER_STYLE },
      { v: 'Anggaran', s: HEADER_STYLE },
      { v: 'Jumlah Laporan', s: HEADER_STYLE },
      { v: 'Sarana dan Prasarana', s: HEADER_STYLE },
      { v: 'Tingkat Resiko', s: HEADER_STYLE },
      { v: 'Keterangan', s: HEADER_STYLE },
    ],
    [
      { v: '', s: HEADER_STYLE },
      { v: '', s: HEADER_STYLE },
      { v: '', s: HEADER_STYLE },
      { v: '', s: HEADER_STYLE },
      { v: '', s: HEADER_STYLE },
      { v: 'Rencana Mulai Penugasan', s: HEADER_STYLE },
      { v: 'Rencana Penerbitan Laporan', s: HEADER_STYLE },
      { v: 'Penanggung Jawab', s: HEADER_STYLE },
      { v: 'Wakil Penanggung Jawab', s: HEADER_STYLE },
      { v: 'Dalnis/Supervisor', s: HEADER_STYLE },
      { v: 'Ketua Tim', s: HEADER_STYLE },
      { v: 'Anggota Tim', s: HEADER_STYLE },
      { v: 'Jumlah', s: HEADER_STYLE },
      { v: '', s: HEADER_STYLE },
      { v: '', s: HEADER_STYLE },
      { v: '', s: HEADER_STYLE },
      { v: '', s: HEADER_STYLE },
      { v: '', s: HEADER_STYLE },
      { v: '', s: HEADER_STYLE },
    ],
  ];

  const wsData = [...title, ...headers];

  jenisPengawasanData.forEach((jenisPengawasan, index) => {
    const filteredData = data.filter(
      (item) => item.id_jenis_pengawasan === jenisPengawasan.id_jenis_pengawasan
    );

    wsData.push([
      {
        v: `${String.fromCharCode(65 + index)}. ${jenisPengawasan.jenis_pengawasan}`,
        s: {
          ...HEADER_STYLE,
          font: {
            bold: true,
            size: 12,
          },
        },
      },
    ]);

    filteredData.forEach((item, idx) => {
      wsData.push([
        {
          v: String(idx + 1),
          s: {
            ...CELL_STYLE,
            alignment: { horizontal: 'center', vertical: 'center' },
          },
        },
        {
          v: item.area_pengawasan,
          s: {
            ...CELL_STYLE,
            font: { bold: true, size: 11 },
            alignment: { horizontal: 'left', vertical: 'center' },
          },
        },
        {
          v: hooks.getNameJenisPengawasan(item.id_jenis_pengawasan),
          s: {
            ...CELL_STYLE,
            font: { bold: true, size: 11 },
            alignment: { horizontal: 'left', vertical: 'center' },
          },
        },
        {
          v: item.tujuan_sasaran,
          s: CELL_STYLE,
        },
        {
          v: hooks.getNameRuangLingkup(item.id_ruang_lingkup),
          s: CELL_STYLE,
        },
        {
          v: item.rmp_pkpt,
          s: CELL_STYLE,
        },
        {
          v: item.rpl_pkpt,
          s: CELL_STYLE,
        },
        {
          v: item.penanggung_jawab
            ? hooks.getNameUser(Number(item.penanggung_jawab))
            : '',
          s: CELL_STYLE,
        },
        {
          v: item.wakil_penanggung_jawab
            ? hooks.getNameUser(Number(item.wakil_penanggung_jawab))
            : '',
          s: CELL_STYLE,
        },
        {
          v: item.pengendali_teknis
            ? hooks.getNameUser(Number(item.pengendali_teknis))
            : '',
          s: CELL_STYLE,
        },
        {
          v: item.ketua_tim ? hooks.getNameUser(Number(item.ketua_tim)) : '',
          s: CELL_STYLE,
        },
        {
          v: item.anggota_tim
            ? hooks.getNameUser(Number(item.anggota_tim))
            : '',
          s: CELL_STYLE,
        },
        {
          v: String(item.jumlah),
          s: CELL_STYLE,
        },
        {
          v: formatTeamData(item.tim, hooks.getNameUser),
          s: CELL_STYLE,
        },
        {
          v: item.anggaran,
          s: CELL_STYLE,
        },
        {
          v: `${item.jumlah_laporan} - ${hooks.getNameJenisLaporan(Number(item.id_jenis_laporan))}`,
          s: CELL_STYLE,
        },
        {
          v: item.sarana_prasarana,
          s: CELL_STYLE,
        },
        {
          v: hooks.getNameTingkatResiko(Number(item.id_tingkat_resiko)),
          s: CELL_STYLE,
        },
        {
          v: item.keterangan,
          s: CELL_STYLE,
        },
      ]);
    });
  });

  const ws = XLSX.utils.aoa_to_sheet(wsData);

  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 18 } }, // Merge untuk baris pertama header
    { s: { r: 1, c: 0 }, e: { r: 1, c: 18 } }, // Merge untuk baris kedua header
    { s: { r: 2, c: 0 }, e: { r: 2, c: 18 } }, // Merge untuk baris ketiga header
    { s: { r: 4, c: 0 }, e: { r: 5, c: 0 } }, // NO
    { s: { r: 4, c: 1 }, e: { r: 5, c: 1 } }, // Area Pengawasan
    { s: { r: 4, c: 2 }, e: { r: 5, c: 2 } }, // Jenis Pengawasan
    { s: { r: 4, c: 3 }, e: { r: 5, c: 3 } }, // Tujuan/Sasaran
    { s: { r: 4, c: 4 }, e: { r: 5, c: 4 } }, // Ruang Lingkup
    { s: { r: 4, c: 5 }, e: { r: 4, c: 6 } }, // Rencana Penugasan
    { s: { r: 4, c: 7 }, e: { r: 4, c: 12 } }, // Penanggung Jawab hingga jumlah
    { s: { r: 4, c: 13 }, e: { r: 5, c: 13 } }, // TIM
    { s: { r: 4, c: 14 }, e: { r: 5, c: 14 } }, // Anggaran
    { s: { r: 4, c: 15 }, e: { r: 5, c: 15 } }, // Jumlah Laporan
    { s: { r: 4, c: 16 }, e: { r: 5, c: 16 } }, // Sarana Prasarana
    { s: { r: 4, c: 17 }, e: { r: 5, c: 17 } }, // Tingkat Resiko
    { s: { r: 4, c: 18 }, e: { r: 5, c: 18 } }, // Keterangan
  ];

  ws['!cols'] = [
    { width: 5 },
    { width: 20 },
    { width: 20 },
    { width: 25 },
    { width: 20 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 20 },
    { width: 25 },
    { width: 25 },
    { width: 25 },
    { width: 25 },
    { width: 25 },
  ];

  ws['!rows'] = [
    { hpt: 30 },
    { hpt: 30 },
    { hpt: 30 },
    { hpt: 20 },
    { hpt: 40 },
    { hpt: 40 },
    { hpt: 40 },
    { hpt: 40 },
    { hpt: 40 },
    { hpt: 40 },
    { hpt: 40 },
    { hpt: 40 },
    { hpt: 40 },
  ];

  return ws;
};

// Tambahkan fungsi untuk memformat data tim
const formatTeamData = (
  teamString: string,
  getNameUser: (id: number) => string
) => {
  if (!teamString) return '';
  return teamString
    .split('|')
    .map((id) => getNameUser(Number(id)))
    .filter((name) => name) // Filter out any empty/null values
    .join(', ');
};

export const exportToExcel = (
  data: PKPTDataBase[],
  jenisPengawasanData: JenisPengawasanDB[],
  hooks: TableHooks,
  status: string
) => {
  const ws = createExcelWorksheet(data, jenisPengawasanData, hooks, status);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'PKPT Data');

  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  saveAs(blob, `PKPT_Report_${status}_${new Date().getFullYear()}.xlsx`);
};
