'use client';
import { CardComponents } from '@/app/components/Global/Card';
import PdfGenerator from '@/app/components/PDFGenerator';
import { formatCurrency, formatToLocalDate } from '@/data/formatData';
import { useFetchAll } from '@/hooks/useFetchAll';
import { useGetNameKode, useGetNameST } from '@/hooks/useGetName';
import { KodeTemuanDB } from '@/interface/interfaceReferensi';
import { TemuanHasilData } from '@/interface/interfaceTemuanHasil';
import { TindakLanjutDB } from '@/interface/interfaceTindakLanjut';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import { Table } from 'flowbite-react';
import React from 'react';
import { exportToExcel } from './exportTindakLanjut';

const TableTindakLanjutPreview = () => {
  const { data: DataTemuanHasil } =
    useFetchAll<TemuanHasilData>('temuan_hasil');
  const { data: DataKodeTemuan } = useFetchAll<KodeTemuanDB>('kode_temuan');
  const { data: DataTL } = useFetchAll<TindakLanjutDB>('tindak_lanjut');
  const { getNameNoSP } = useGetNameST();
  const { getNameKodeTemuan, getNameKodeRekomendasi } = useGetNameKode();

  // Group tindak lanjut data by id_tlhp
  const groupedTL = React.useMemo(() => {
    const groups: { [key: number]: TindakLanjutDB[] } = {};
    DataTL.forEach((item) => {
      if (!groups[item.id_lhp]) {
        groups[item.id_lhp] = [];
      }
      groups[item.id_lhp].push(item);
    });
    return groups;
  }, [DataTL]);

  // Group data by SP number
  const groupedData = React.useMemo(() => {
    const groups: { [key: string]: TemuanHasilData[] } = {};
    DataTemuanHasil.forEach((item) => {
      const spNumber = getNameNoSP(Number(item.id_st));
      if (!groups[spNumber]) {
        groups[spNumber] = [];
      }
      groups[spNumber].push(item);
    });
    return groups;
  }, [DataTemuanHasil, getNameNoSP]);

  const mergedDataTemuan = React.useMemo(() => {
    return DataTemuanHasil.map((item) => {
      const kodeTemuan = DataKodeTemuan.find(
        (kode) => kode.id_kode_temuan === item.id_kode_temuan
      );
      return {
        ...item,
        kode_temuan: kodeTemuan ? kodeTemuan.kode_temuan : null,
      };
    }).filter((item) => item.kode_temuan !== null);
  }, [DataTemuanHasil, DataKodeTemuan]);

  const totals = React.useMemo(() => {
    const totalNilaiRekomendasi = DataTemuanHasil.reduce(
      (sum, item) => sum + (item.nilai_rekomendasi || 0),
      0
    );

    const totalNilaiSetor = DataTL.reduce(
      (sum, tl) => sum + (tl.nilai_setor || 0),
      0
    );

    const totalSesuai = DataTL.filter(
      (tl) => tl.kondisi_temuan === 'sesuai'
    ).length;

    const totalDalamProses = DataTL.filter(
      (tl) => tl.kondisi_temuan === 'dalam proses'
    ).length;

    const totalBelumTL = DataTL.filter(
      (tl) => tl.kondisi_temuan === 'belum ditindak lanjut'
    ).length;

    const totalTidakDapatTL = DataTL.filter(
      (tl) => tl.kondisi_temuan === 'tidak dapat ditindak lanjut'
    ).length;

    const totalSisaNominal = DataTL.reduce(
      (sum, tl) => sum + (tl.sisa_nominal || 0),
      0
    );

    return {
      totalNilaiRekomendasi,
      totalNilaiSetor,
      totalSesuai,
      totalDalamProses,
      totalBelumTL,
      totalTidakDapatTL,
      totalSisaNominal,
    };
  }, [DataTemuanHasil, DataTL]);

  const handleExport = () => {
    exportToExcel(
      DataTemuanHasil,
      DataKodeTemuan,
      DataTL,
      getNameNoSP,
      getNameKodeTemuan,
      getNameKodeRekomendasi,
      formatCurrency,
      formatToLocalDate
    );
  };
  return (
    <AuthRoleWrapper
      allowedRoles={['Admin', 'Pimpinan', 'Pelaksana', 'Auditor', 'Developer']}
    >
      <div className="space-y-3 w-full">        
        <CardComponents>
          <PdfGenerator>
            <div className="space-y-3 w-full">
              <div className="text-center font-bold text-base text-[11px] lg:text-[14px]">
                <p>
                  STATUS TEMUAN HASIL PEMERIKSAAN/AUDIT DAN TINDAK LANJUTNYA
                </p>
                <p>INSPEKTORAT DAERAH KOTA TASIKMALAYA</p>
                <p>s/d BULAN NOVEMBER 2023</p>
              </div>
              <div className="max-w-full overflow-x-auto">
                <Table className="min-w-full border-collapse border border-gray-300 text-left text-[11px]">
                  <thead className="bg-gray-200">
                    <tr className="text-center align-middle">
                      <th className="border border-gray-300 p-2" rowSpan={2}>
                        NO
                      </th>
                      <th className="border border-gray-300 p-2" rowSpan={2}>
                        NOMOR DAN TANGGAL SP
                      </th>
                      <th className="border border-gray-300 p-2" rowSpan={2}>
                        URAIAN,AUDITAN, NOMOR DAN TGL LHP
                      </th>
                      <th className="border border-gray-300 p-2" rowSpan={2}>
                        NO
                      </th>
                      <th className="border border-gray-300 p-2" rowSpan={2}>
                        KONDISI/TEMUAN
                      </th>
                      <th
                        className="border border-gray-300 p-2"
                        rowSpan={2}
                        colSpan={2}
                      >
                        KODE TEMUAN
                      </th>
                      <th
                        className="border border-gray-300 p-2"
                        rowSpan={2}
                        colSpan={2}
                      >
                        REKOMENDASI/SARAN
                      </th>
                      <th
                        className="border border-gray-300 p-2"
                        rowSpan={2}
                        colSpan={2}
                      >
                        NILAI REKOMENDASI Rp.
                      </th>
                      <th className="border border-gray-300 p-2" rowSpan={2}>
                        KODE Rekomendasi
                      </th>
                      <th className="border border-gray-300 p-2" rowSpan={2}>
                        Uraian Tindak Lanjut
                      </th>
                      <th className="border border-gray-300 p-2" rowSpan={2}>
                        Nilai Setor <br /> Rp
                      </th>
                      <th className="border border-gray-300 p-2" colSpan={4}>
                        Kategori Rekomendasi
                      </th>
                      <th className="border border-gray-300 p-2" rowSpan={2}>
                        Sisa <br /> Rp
                      </th>
                      <th className="border border-gray-300 p-2" rowSpan={2}>
                        Tanggal Pengiriman
                      </th>
                      <th className="border border-gray-300 p-2" rowSpan={2}>
                        Batas Akhir <br /> TL
                      </th>
                      <th
                        className="border border-gray-300 p-2 w-full"
                        rowSpan={2}
                      >
                        Ket
                      </th>
                    </tr>
                    <tr className="text-center align-middle">
                      <th className="border border-gray-300 p-2">Sesuai</th>
                      <th className="border border-gray-300 p-2">
                        Dalam Proses
                      </th>
                      <th className="border border-gray-300 p-2">
                        Belum Ditindak Lanjuti
                      </th>
                      <th className="border border-gray-300 p-2">
                        Tidak Dapat Ditindak Lanjut
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(groupedData).map(
                      ([spNumber, items], groupIndex) => {
                        return items.map((item, itemIndex) => {
                          const tindakLanjut = groupedTL[item.id_tlhp] || [];
                          return (
                            <tr
                              key={item.id_tlhp}
                              className="hover:bg-gray-100 text-center align-middle"
                            >
                              {itemIndex === 0 && (
                                <>
                                  <td
                                    className="border border-gray-300 p-2"
                                    rowSpan={items.length}
                                  >
                                    {groupIndex + 1}
                                  </td>
                                  <td
                                    className="border border-gray-300 p-2"
                                    rowSpan={items.length}
                                  >
                                    {spNumber}
                                  </td>
                                </>
                              )}
                              <td className="border border-gray-300 p-2">
                                {item.uraian}
                              </td>
                              <td className="border border-gray-300 p-2">
                                T{itemIndex + 1}
                              </td>
                              <td className="border border-gray-300 p-2">
                                {item.kondisi_temuan}
                              </td>
                              <td className="border border-gray-300 p-2">
                                {getNameKodeTemuan(Number(item.id_kode_temuan))}
                              </td>
                              <td className="border border-gray-300 p-2">
                                {
                                  getNameKodeTemuan(
                                    Number(item.id_kode_temuan)
                                  ).split('.')[0]
                                }
                              </td>
                              <td className="border border-gray-300 p-2">
                                {item.rekomendasi_saran}
                              </td>
                              <td className="border border-gray-300 p-2">
                                {
                                  getNameKodeRekomendasi(
                                    item.id_kode_rekomendasi
                                  ).split('.')[0]
                                }
                              </td>
                              <td className="border border-gray-300 p-2">
                                {formatCurrency(item.nilai_rekomendasi)}
                              </td>
                              <td className="border border-gray-300 p-2">
                                {
                                  getNameKodeRekomendasi(
                                    item.id_kode_rekomendasi
                                  ).split('.')[0]
                                }
                              </td>
                              <td className="border border-gray-300 p-2">
                                {getNameKodeRekomendasi(
                                  item.id_kode_rekomendasi
                                )}
                              </td>
                              {/* Tindak Lanjut cells */}
                              <td className="border border-gray-300 p-2">
                                {tindakLanjut.map((tl, idx) => (
                                  <div key={idx}>{tl.uraian}</div>
                                ))}
                              </td>
                              <td className="border border-gray-300 p-2">
                                {tindakLanjut.map((amount, idx) => (
                                  <div key={idx}>
                                    {formatCurrency(amount.nilai_setor)}
                                  </div>
                                ))}
                              </td>
                              <td className="border border-gray-300 p-2">
                                {tindakLanjut.filter(
                                  (tl) => tl.kondisi_temuan === 'sesuai'
                                ).length || ''}
                              </td>
                              <td className="border border-gray-300 p-2">
                                {tindakLanjut.filter(
                                  (tl) => tl.kondisi_temuan === 'dalam proses'
                                ).length || ''}
                              </td>
                              <td className="border border-gray-300 p-2">
                                {tindakLanjut.filter(
                                  (tl) =>
                                    tl.kondisi_temuan ===
                                    'belum ditindak lanjut'
                                ).length || ''}
                              </td>
                              <td className="border border-gray-300 p-2">
                                {tindakLanjut.filter(
                                  (tl) =>
                                    tl.kondisi_temuan ===
                                    'tidak dapat ditindak lanjut'
                                ).length || ''}
                              </td>
                              <td className="border border-gray-300 p-2">
                                {tindakLanjut.map((amount, idx) => (
                                  <div key={idx}>
                                    {formatCurrency(amount.sisa_nominal)}
                                  </div>
                                ))}
                              </td>
                              <td className="border border-gray-300 p-2">
                                {tindakLanjut.map((tl, idx) => (
                                  <div key={idx}>
                                    {formatToLocalDate(tl.tanggal_pengiriman)}
                                  </div>
                                ))}
                              </td>
                              <td className="border border-gray-300 p-2">
                                {tindakLanjut.map((tl, idx) => (
                                  <div key={idx}>
                                    {formatToLocalDate(tl.batas_akhir_tl)}
                                  </div>
                                ))}
                              </td>
                              <td className="border border-gray-300 p-2">
                                {tindakLanjut.map((tl, idx) => (
                                  <div key={idx}>{tl.keterangan}</div>
                                ))}
                              </td>
                            </tr>
                          );
                        });
                      }
                    )}

                    {/* Kode Temuan Summary Section */}
                    {DataKodeTemuan.filter(
                      (itemsfilter) =>
                        itemsfilter.kode_temuan?.split('.')[1] === '00'
                    ).map((item, index) => {
                      const relatedTemuan = mergedDataTemuan.filter(
                        (filterby) =>
                          filterby.kode_temuan?.split('.')[0] ===
                          item.kode_temuan?.split('.')[0]
                      );
                      const relatedTL = relatedTemuan.flatMap(
                        (temuan) => groupedTL[temuan.id_tlhp] || []
                      );

                      return (
                        <tr
                          key={index}
                          className="hover:bg-gray-100 text-center align-middle"
                        >
                          <td
                            className="border border-gray-300 p-2 text-center"
                            colSpan={6}
                          >
                            {item.keterangan_kode}
                          </td>
                          <td className="border border-gray-300 p-2 text-center">
                            {relatedTemuan.length}
                          </td>
                          <td className="border border-gray-300 p-2 text-center"></td>
                          <td className="border border-gray-300 p-2 text-center">
                            {relatedTemuan.length}
                          </td>
                          <td className="border border-gray-300 p-2 text-center">
                            {formatCurrency(
                              relatedTemuan.reduce(
                                (sum, current) =>
                                  sum + (current.nilai_rekomendasi || 0),
                                0
                              )
                            )}
                          </td>
                          <td className="border border-gray-300 p-2 text-center"></td>
                          <td className="border border-gray-300 p-2 text-center"></td>
                          <td className="border border-gray-300 p-2 text-center"></td>
                          <td className="border border-gray-300 p-2 text-center">
                            {formatCurrency(
                              relatedTL.reduce(
                                (sum, tl) => sum + (tl.nilai_setor || 0),
                                0
                              )
                            )}
                          </td>
                          <td className="border border-gray-300 p-2 text-center">
                            {relatedTL.filter(
                              (tl) => tl.kondisi_temuan === 'sesuai'
                            ).length || ''}
                          </td>
                          <td className="border border-gray-300 p-2 text-center">
                            {relatedTL.filter(
                              (tl) => tl.kondisi_temuan === 'dalam proses'
                            ).length || ''}
                          </td>
                          <td className="border border-gray-300 p-2 text-center">
                            {relatedTL.filter(
                              (tl) =>
                                tl.kondisi_temuan === 'belum ditindak lanjut'
                            ).length || ''}
                          </td>
                          <td className="border border-gray-300 p-2 text-center">
                            {relatedTL.filter(
                              (tl) =>
                                tl.kondisi_temuan ===
                                'tidak dapat ditindak lanjut'
                            ).length || ''}
                          </td>
                          <td className="border border-gray-300 p-2 text-center">
                            {formatCurrency(
                              relatedTL.reduce(
                                (sum, tl) => sum + (tl.sisa_nominal || 0),
                                0
                              )
                            )}
                          </td>
                          <td className="border border-gray-300 p-2 text-center"></td>
                          <td className="border border-gray-300 p-2 text-center"></td>
                          <td className="border border-gray-300 p-2 text-center"></td>
                        </tr>
                      );
                    })}
                    <tr className="hover:bg-gray-100 text-center align-middle font-bold">
                      <td
                        className="border border-gray-300 p-2 text-center"
                        colSpan={6}
                      >
                        Total
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {DataTemuanHasil.length}
                      </td>
                      <td className="border border-gray-300 p-2 text-center"></td>
                      <td className="border border-gray-300 p-2 text-center">
                        {DataTemuanHasil.length}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {formatCurrency(totals.totalNilaiRekomendasi)}
                      </td>
                      <td className="border border-gray-300 p-2 text-center"></td>
                      <td className="border border-gray-300 p-2 text-center"></td>
                      <td className="border border-gray-300 p-2 text-center"></td>
                      <td className="border border-gray-300 p-2 text-center">
                        {formatCurrency(totals.totalNilaiSetor)}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {totals.totalSesuai || ''}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {totals.totalDalamProses || ''}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {totals.totalBelumTL || ''}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {totals.totalTidakDapatTL || ''}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {formatCurrency(totals.totalSisaNominal)}
                      </td>
                      <td className="border border-gray-300 p-2 text-center"></td>
                      <td className="border border-gray-300 p-2 text-center"></td>
                      <td className="border border-gray-300 p-2 text-center"></td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </PdfGenerator>
        </CardComponents>
      </div>
    </AuthRoleWrapper>
  );
};

export default TableTindakLanjutPreview;
