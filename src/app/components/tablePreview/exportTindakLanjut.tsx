import { utils, WorkBook, WorkSheet, write } from 'xlsx';
import { saveAs } from 'file-saver';
import { TemuanHasilData } from '@/interface/interfaceTemuanHasil';
import { KodeTemuanDB } from '@/interface/interfaceReferensi';
import { TindakLanjutDB } from '@/interface/interfaceTindakLanjut';

export const exportToExcel = (
  DataTemuanHasil: TemuanHasilData[],
  DataKodeTemuan: KodeTemuanDB[],
  DataTL: TindakLanjutDB[],
  getNameNoSP: (id: number) => string,
  getNameKodeTemuan: (id: number) => string,
  getNameKodeRekomendasi: (id: number) => string,
  formatCurrency: (value: number) => string,
  formatToLocalDate: (date: string) => string
) => {
  // Create workbook and worksheet
  const wb: WorkBook = utils.book_new();
  const ws: WorkSheet = utils.aoa_to_sheet([]);

  // Set column widths
  const colWidths = [
    { wch: 5 }, // NO
    { wch: 20 }, // NOMOR DAN TANGGAL SP
    { wch: 30 }, // URAIAN
    { wch: 5 }, // NO
    { wch: 25 }, // KONDISI/TEMUAN
    { wch: 15 }, // KODE TEMUAN
    { wch: 10 }, // KODE NUMBER
    { wch: 30 }, // REKOMENDASI/SARAN
    { wch: 10 }, // KODE REC
    { wch: 20 }, // NILAI REKOMENDASI
    { wch: 10 }, // KODE REC
    { wch: 15 }, // KODE REKOMENDASI
    { wch: 30 }, // Uraian Tindak Lanjut
    { wch: 20 }, // Nilai Setor
    { wch: 10 }, // Sesuai
    { wch: 10 }, // Dalam Proses
    { wch: 10 }, // Belum TL
    { wch: 10 }, // Tidak Dapat TL
    { wch: 20 }, // Sisa
    { wch: 15 }, // Tanggal Pengiriman
    { wch: 15 }, // Batas Akhir TL
    { wch: 20 }, // Keterangan
  ];
  ws['!cols'] = colWidths;

  // Add headers
  const headers = [
    ['STATUS TEMUAN HASIL PEMERIKSAAN/AUDIT DAN TINDAK LANJUTNYA'],
    ['INSPEKTORAT DAERAH KOTA TASIKMALAYA'],
    ['s/d BULAN NOVEMBER 2023'],
    [],
    [
      'NO',
      'NOMOR DAN TANGGAL SP',
      'URAIAN,AUDITAN, NOMOR DAN TGL LHP',
      'NO',
      'KONDISI/TEMUAN',
      'KODE TEMUAN',
      '',
      'REKOMENDASI/SARAN',
      '',
      'NILAI REKOMENDASI Rp.',
      '',
      'KODE Rekomendasi',
      'Uraian Tindak Lanjut',
      'Nilai Setor Rp',
      'Sesuai',
      'Dalam Proses',
      'Belum Ditindak Lanjuti',
      'Tidak Dapat Ditindak Lanjut',
      'Sisa Rp',
      'Tanggal Pengiriman',
      'Batas Akhir TL',

      'Ket',
    ],
  ];

  // Group data
  const groupedData: { [key: string]: TemuanHasilData[] } = {};
  DataTemuanHasil.forEach((item) => {
    const spNumber = getNameNoSP(Number(item.id_st));
    if (!groupedData[spNumber]) {
      groupedData[spNumber] = [];
    }
    groupedData[spNumber].push(item);
  });

  // Group tindak lanjut data
  const groupedTL: { [key: number]: TindakLanjutDB[] } = {};
  DataTL.forEach((item) => {
    if (!groupedTL[item.id_lhp]) {
      groupedTL[item.id_lhp] = [];
    }
    groupedTL[item.id_lhp].push(item);
  });

  // Prepare data rows
  const rows: any[][] = [];
  Object.entries(groupedData).forEach(([spNumber, items], groupIndex) => {
    items.forEach((item, itemIndex) => {
      const tindakLanjut = groupedTL[item.id_tlhp] || [];
      const row = [
        itemIndex === 0 ? groupIndex + 1 : '',
        itemIndex === 0 ? spNumber : '',
        item.uraian,
        `T${itemIndex + 1}`,
        item.kondisi_temuan,
        getNameKodeTemuan(Number(item.id_kode_temuan)),
        getNameKodeTemuan(Number(item.id_kode_temuan)).split('.')[0],
        item.rekomendasi_saran,
        getNameKodeRekomendasi(item.id_kode_rekomendasi).split('.')[0],
        formatCurrency(item.nilai_rekomendasi),
        getNameKodeRekomendasi(item.id_kode_rekomendasi).split('.')[0],
        getNameKodeRekomendasi(item.id_kode_rekomendasi),

        tindakLanjut.map((tl) => tl.uraian).join('\n'),
        tindakLanjut
          .map((amount) => formatCurrency(amount.nilai_setor))
          .join('\n'),
        tindakLanjut.filter((tl) => tl.kondisi_temuan === 'sesuai').length ||
          '',
        tindakLanjut.filter((tl) => tl.kondisi_temuan === 'dalam proses')
          .length || '',
        tindakLanjut.filter(
          (tl) => tl.kondisi_temuan === 'belum ditindak lanjut'
        ).length || '',
        tindakLanjut.filter(
          (tl) => tl.kondisi_temuan === 'tidak dapat ditindak lanjut'
        ).length || '',
        tindakLanjut
          .map((amount) => formatCurrency(amount.sisa_nominal))
          .join('\n'),
        tindakLanjut
          .map((tl) => formatToLocalDate(tl.tanggal_pengiriman))
          .join('\n'),
        tindakLanjut
          .map((tl) => formatToLocalDate(tl.batas_akhir_tl))
          .join('\n'),
        tindakLanjut.map((tl) => tl.keterangan).join('\n'),
      ];
      rows.push(row);
    });
  });

  // Add summary rows
  const summaryRows = DataKodeTemuan.filter(
    (item) => item.kode_temuan?.split('.')[1] === '00'
  ).map((item) => {
    const relatedTemuan = DataTemuanHasil.filter(
      (temuan) =>
        getNameKodeTemuan(Number(temuan.id_kode_temuan)).split('.')[0] ===
        item.kode_temuan?.split('.')[0]
    );
    const relatedTL = relatedTemuan.flatMap(
      (temuan) => groupedTL[temuan.id_tlhp] || []
    );

    return [
      '',
      '',
      '',
      '',
      '',
      item.keterangan_kode,
      relatedTemuan.length,
      '',
      relatedTemuan.length,
      formatCurrency(
        relatedTemuan.reduce(
          (sum, current) => sum + (current.nilai_rekomendasi || 0),
          0
        )
      ),
      '',
      '',
      '',
      formatCurrency(
        relatedTL.reduce((sum, tl) => sum + (tl.nilai_setor || 0), 0)
      ),
      relatedTL.filter((tl) => tl.kondisi_temuan === 'sesuai').length || '',
      relatedTL.filter((tl) => tl.kondisi_temuan === 'dalam proses').length ||
        '',
      relatedTL.filter((tl) => tl.kondisi_temuan === 'belum ditindak lanjut')
        .length || '',
      relatedTL.filter(
        (tl) => tl.kondisi_temuan === 'tidak dapat ditindak lanjut'
      ).length || '',
      formatCurrency(
        relatedTL.reduce((sum, tl) => sum + (tl.sisa_nominal || 0), 0)
      ),
      '',
      '',
      '',
    ];
  });

  // Calculate totals
  const totals = [
    'Total',
    '',
    '',
    '',
    '',
    '',
    DataTemuanHasil.length,
    '',
    DataTemuanHasil.length,
    formatCurrency(
      DataTemuanHasil.reduce(
        (sum, item) => sum + (item.nilai_rekomendasi || 0),
        0
      )
    ),
    '',
    '',
    '',
    formatCurrency(DataTL.reduce((sum, tl) => sum + (tl.nilai_setor || 0), 0)),
    DataTL.filter((tl) => tl.kondisi_temuan === 'sesuai').length || '',
    DataTL.filter((tl) => tl.kondisi_temuan === 'dalam proses').length || '',
    DataTL.filter((tl) => tl.kondisi_temuan === 'belum ditindak lanjut')
      .length || '',
    DataTL.filter((tl) => tl.kondisi_temuan === 'tidak dapat ditindak lanjut')
      .length || '',
    formatCurrency(DataTL.reduce((sum, tl) => sum + (tl.sisa_nominal || 0), 0)),
    '',
    '',
    '',
  ];

  // Combine all rows
  const allRows = [...headers, ...rows, ...summaryRows, totals];
  utils.sheet_add_aoa(ws, allRows);

  // Add styling
  const headerStyle = {
    font: { bold: true },
    alignment: { horizontal: 'center', vertical: 'center' },
  };

  // Apply styles
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < headers[i]?.length || 0; j++) {
      const cellRef = utils.encode_cell({ r: i, c: j });
      if (!ws[cellRef]) ws[cellRef] = {};
      ws[cellRef].s = headerStyle;
    }
  }

  // Add to workbook
  utils.book_append_sheet(wb, ws, 'Tindak Lanjut');

  // Generate and download file
  const wbout = write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  saveAs(blob, 'TindakLanjut.xlsx');
};
