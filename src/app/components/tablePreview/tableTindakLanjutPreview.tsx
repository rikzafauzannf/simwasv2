'use client';
import { CardComponents } from '@/app/components/Global/Card';
import PdfGenerator from '@/app/components/PDFGenerator';
import { formatCurrency, formatToLocalDate } from '@/data/formatData';
import { useFetchAll } from '@/hooks/useFetchAll';
import {
  useGetNameKode,
  useGetNameLHP,
  useGetNameST,
} from '@/hooks/useGetName';
import { KodeTemuanDB } from '@/interface/interfaceReferensi';
import {
  RekomendasiData,
  TemuanHasilData,
} from '@/interface/interfaceTemuanHasil';
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
  const { data: DataRekomendasi } = useFetchAll<RekomendasiData>('rekomendasi');
  const { getNameNoSP } = useGetNameST();
  const { getNomorLHP, getUraianLHP } = useGetNameLHP();
  const { getNameKodeTemuan, getNameKodeRekomendasi } = useGetNameKode();

  // First, group all ST/LHP data by id_st
  const lhpData = React.useMemo(() => {
    const stGroups: {
      [key: number]: { nomorLHP: string; uraianLHP: string; noSP: string };
    } = {};

    // Get unique id_st values from findings
    const uniqueSTIds = Array.from(
      new Set(DataTemuanHasil?.map((temuan) => Number(temuan.id_st)))
    );

    // Map each id_st to its corresponding LHP info
    uniqueSTIds.forEach((id_st) => {
      stGroups[id_st] = {
        nomorLHP: getNomorLHP(id_st),
        uraianLHP: getUraianLHP(id_st),
        noSP: getNameNoSP(id_st),
      };
    });

    return stGroups;
  }, [DataTemuanHasil, getNomorLHP, getUraianLHP, getNameNoSP]);

  // Group findings by id_st
  const temuanBySTId = React.useMemo(() => {
    const groups: { [key: number]: TemuanHasilData[] } = {};

    DataTemuanHasil.forEach((temuan) => {
      const stId = Number(temuan.id_st);
      if (!groups[stId]) {
        groups[stId] = [];
      }
      groups[stId].push(temuan);
    });

    return groups;
  }, [DataTemuanHasil]);

  // Group recommendations by id_tlhp (temuan)
  const rekomendasiByTemuanId = React.useMemo(() => {
    const groups: { [key: number]: RekomendasiData[] } = {};

    DataRekomendasi.forEach((rekomendasi) => {
      const temuanId = rekomendasi.id_tlhp;
      if (!groups[temuanId]) {
        groups[temuanId] = [];
      }
      groups[temuanId].push(rekomendasi);
    });

    return groups;
  }, [DataRekomendasi]);

  // Link tindak lanjut to rekomendasi
  const tindakLanjutByRekomendasiId = React.useMemo(() => {
    const groups: { [key: number]: TindakLanjutDB } = {};

    DataTL.forEach((tl) => {
      // Assuming id_lhp in TindakLanjutDB corresponds to id_rekomendasi
      groups[tl.id_lhp] = tl;
    });

    return groups;
  }, [DataTL]);

  // Build the comprehensive structured data for the table
  const structuredData = React.useMemo(() => {
    // Sort the ST/LHP entries for consistency
    const sortedSTIds = Object.keys(lhpData)
      .map(Number)
      .sort((a, b) => a - b);

    return sortedSTIds.map((stId) => {
      const lhpInfo = lhpData[stId];
      const temuanList = temuanBySTId[stId] || [];

      // Map each temuan to include its rekomendasi and tindak lanjut
      const temuansWithDetails = temuanList.map((temuan) => {
        const rekomendasiList = rekomendasiByTemuanId[temuan.id_tlhp] || [];

        // Map each rekomendasi to include its tindak lanjut
        const rekomendasiWithTL = rekomendasiList.map((rekomendasi) => ({
          ...rekomendasi,
          tindakLanjut: tindakLanjutByRekomendasiId[rekomendasi.id_rekomendasi],
        }));

        return {
          ...temuan,
          rekomendasiList: rekomendasiWithTL,
        };
      });

      return {
        id_st: stId,
        lhpNumber: lhpInfo.nomorLHP,
        uraianLHP: lhpInfo.uraianLHP,
        noSP: lhpInfo.noSP,
        temuans: temuansWithDetails,
      };
    });
  }, [
    lhpData,
    temuanBySTId,
    rekomendasiByTemuanId,
    tindakLanjutByRekomendasiId,
  ]);

  // Enrich temuan data with kode_temuan information
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

  // Calculate totals for summary
  const totals = React.useMemo(() => {
    const totalNilaiRekomendasi = DataRekomendasi.reduce(
      (sum, item) => sum + (Number(item.rekomendasi_nilai) || 0),
      0
    );

    const totalNilaiSetor = DataTL.reduce(
      (sum, tl) => sum + (Number(tl.nilai_setor) || 0),
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
      (sum, tl) => sum + (Number(tl.sisa_nominal) || 0),
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
  }, [DataRekomendasi, DataTL]);

  // Handle Excel export
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

  // Group kode temuan for summary section
  const groupedRekomendasi = React.useMemo(() => {
    const groups: { [key: number]: RekomendasiData[] } = {};
    DataRekomendasi.forEach((item) => {
      if (!groups[item.id_tlhp]) {
        groups[item.id_tlhp] = [];
      }
      groups[item.id_tlhp].push(item);
    });
    return groups;
  }, [DataRekomendasi]);

  return (
    <AuthRoleWrapper
      allowedRoles={['Admin', 'Pimpinan', 'Pelaksana', 'Auditor', 'Developer']}
    >
      <div className=" container mx-auto px-4 max-w-screen-xl overflow-x-auto">
        <CardComponents>
          <div className="flex justify-between items-center w-full">
            <div>
              <h5 className="text-xl font-bold mb-2">
                STATUS TEMUAN HASIL PEMERIKSAAN/AUDIT DAN TINDAK LANJUTNYA
              </h5>
              <p className="text-gray-600">
                Inspektorat Daerah Kota Tasikmalaya
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Export Excel
              </button>
            </div>
          </div>
        </CardComponents>
        <PdfGenerator>
          <div className="space-y-3 w-full overflow-scroll p-4">
            <div className="text-center font-bold text-base text-[11px] lg:text-[14px]">
              <p>STATUS TEMUAN HASIL PEMERIKSAAN/AUDIT DAN TINDAK LANJUTNYA</p>
              <p>INSPEKTORAT DAERAH KOTA TASIKMALAYA</p>
              <p>s/d BULAN NOVEMBER 2023</p>
            </div>
            <div className="overflow-x-auto">
              <Table className="max-w-full border-collapse border border-gray-300 text-left text-[11px]">
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
                    <th className="border border-gray-300 p-2">Dalam Proses</th>
                    <th className="border border-gray-300 p-2">
                      Belum Ditindak Lanjuti
                    </th>
                    <th className="border border-gray-300 p-2">
                      Tidak Dapat Ditindak Lanjut
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {structuredData.map((lhpGroup, lhpIndex) => {
                    // Calculate total rows for this LHP group
                    const totalLHPRows = lhpGroup.temuans.reduce(
                      (acc, temuan) => {
                        return acc + Math.max(1, temuan.rekomendasiList.length);
                      },
                      0
                    );

                    return lhpGroup.temuans.flatMap((temuan, temuanIndex) => {
                      const rekomendasi = temuan.rekomendasiList;

                      // Calculate total rows for this temuan
                      const temuanRows = Math.max(1, rekomendasi.length);

                      // If no recommendations, show one row with empty cells
                      if (rekomendasi.length === 0) {
                        return (
                          <tr
                            key={`${temuan.id_tlhp}-empty`}
                            className="hover:bg-gray-100 text-center align-middle"
                          >
                            {temuanIndex === 0 && (
                              <>
                                <td
                                  className="border border-gray-300 p-2"
                                  rowSpan={totalLHPRows}
                                >
                                  {lhpIndex + 1}
                                </td>
                                <td
                                  className="border border-gray-300 p-2"
                                  rowSpan={totalLHPRows}
                                >
                                  {lhpGroup.noSP}
                                </td>
                                <td
                                  className="border border-gray-300 p-2"
                                  rowSpan={totalLHPRows}
                                >
                                  {lhpGroup.uraianLHP}
                                </td>
                              </>
                            )}
                            <td
                              className="border border-gray-300 p-2"
                              rowSpan={temuanRows}
                            >
                              T{temuanIndex + 1}
                            </td>
                            <td
                              className="border border-gray-300 p-2"
                              rowSpan={temuanRows}
                            >
                              {temuan.kondisi_temuan}
                            </td>
                            <td
                              className="border border-gray-300 p-2"
                              rowSpan={temuanRows}
                            >
                              {getNameKodeTemuan(Number(temuan.id_kode_temuan))}
                            </td>
                            <td
                              className="border border-gray-300 p-2"
                              rowSpan={temuanRows}
                            >
                              {
                                getNameKodeTemuan(
                                  Number(temuan.id_kode_temuan)
                                ).split('.')[0]
                              }
                            </td>
                            <td className="border border-gray-300 p-2"></td>
                            <td className="border border-gray-300 p-2"></td>
                            <td className="border border-gray-300 p-2"></td>
                            <td className="border border-gray-300 p-2"></td>
                            <td className="border border-gray-300 p-2"></td>
                            <td className="border border-gray-300 p-2"></td>
                            <td className="border border-gray-300 p-2"></td>
                            <td className="border border-gray-300 p-2"></td>
                            <td className="border border-gray-300 p-2"></td>
                            <td className="border border-gray-300 p-2"></td>
                            <td className="border border-gray-300 p-2"></td>
                            <td className="border border-gray-300 p-2"></td>
                            <td className="border border-gray-300 p-2"></td>
                            <td className="border border-gray-300 p-2"></td>
                          </tr>
                        );
                      }

                      // For temuans with recommendations
                      return rekomendasi.map((rek, rekIndex) => {
                        // Get tindak lanjut directly from the rekomendasi object
                        const tindakLanjut = rek.tindakLanjut;

                        return (
                          <tr
                            key={`${temuan.id_tlhp}-${rek.id_rekomendasi}`}
                            className="hover:bg-gray-100 text-center align-middle"
                          >
                            {temuanIndex === 0 && rekIndex === 0 && (
                              <>
                                <td
                                  className="border border-gray-300 p-2"
                                  rowSpan={totalLHPRows}
                                >
                                  {lhpIndex + 1}
                                </td>
                                <td
                                  className="border border-gray-300 p-2"
                                  rowSpan={totalLHPRows}
                                >
                                  {lhpGroup.noSP}
                                </td>
                                <td
                                  className="border border-gray-300 p-2"
                                  rowSpan={totalLHPRows}
                                >
                                  {lhpGroup.uraianLHP}
                                </td>
                              </>
                            )}
                            {rekIndex === 0 && (
                              <>
                                <td
                                  className="border border-gray-300 p-2"
                                  rowSpan={rekomendasi.length}
                                >
                                  T{temuanIndex + 1}
                                </td>
                                <td
                                  className="border border-gray-300 p-2"
                                  rowSpan={rekomendasi.length}
                                >
                                  {temuan.kondisi_temuan}
                                </td>
                                <td
                                  className="border border-gray-300 p-2"
                                  rowSpan={rekomendasi.length}
                                >
                                  {getNameKodeTemuan(
                                    Number(temuan.id_kode_temuan)
                                  )}
                                </td>
                                <td
                                  className="border border-gray-300 p-2"
                                  rowSpan={rekomendasi.length}
                                >
                                  {
                                    getNameKodeTemuan(
                                      Number(temuan.id_kode_temuan)
                                    ).split('.')[0]
                                  }
                                </td>
                              </>
                            )}
                            <td className="border border-gray-300 p-2">
                              {rek.rekomendasi_saran}
                            </td>
                            <td className="border border-gray-300 p-2">
                              {
                                getNameKodeRekomendasi(
                                  rek.id_kode_rekomendasi
                                ).split('.')[0]
                              }
                            </td>
                            <td className="border border-gray-300 p-2">
                              {formatCurrency(rek.rekomendasi_nilai)}
                            </td>
                            <td className="border border-gray-300 p-2">
                              {getNameKodeRekomendasi(rek.id_kode_rekomendasi)}
                            </td>
                            <td className="border border-gray-300 p-2">
                              {getNameKodeRekomendasi(rek.id_kode_rekomendasi)}
                            </td>
                            {/* Tindak Lanjut cells */}
                            {tindakLanjut ? (
                              <>
                                <td className="border border-gray-300 p-2">
                                  {tindakLanjut.uraian}
                                </td>
                                <td className="border border-gray-300 p-2">
                                  {formatCurrency(tindakLanjut.nilai_setor)}
                                </td>
                                <td className="border border-gray-300 p-2">
                                  {tindakLanjut.kondisi_temuan === 'sesuai'
                                    ? '1'
                                    : ''}
                                </td>
                                <td className="border border-gray-300 p-2">
                                  {tindakLanjut.kondisi_temuan ===
                                  'dalam proses'
                                    ? '1'
                                    : ''}
                                </td>
                                <td className="border border-gray-300 p-2">
                                  {tindakLanjut.kondisi_temuan ===
                                  'belum ditindak lanjut'
                                    ? '1'
                                    : ''}
                                </td>
                                <td className="border border-gray-300 p-2">
                                  {tindakLanjut.kondisi_temuan ===
                                  'tidak dapat ditindak lanjut'
                                    ? '1'
                                    : ''}
                                </td>
                                <td className="border border-gray-300 p-2">
                                  {formatCurrency(tindakLanjut.sisa_nominal)}
                                </td>
                                <td className="border border-gray-300 p-2">
                                  {formatToLocalDate(
                                    tindakLanjut.tanggal_pengiriman
                                  )}
                                </td>
                                <td className="border border-gray-300 p-2">
                                  {formatToLocalDate(
                                    tindakLanjut.batas_akhir_tl
                                  )}
                                </td>
                                <td className="border border-gray-300 p-2">
                                  {tindakLanjut.uraian}
                                </td>
                              </>
                            ) : (
                              // Empty cells if no tindak lanjut exists
                              <>
                                <td className="border border-gray-300 p-2"></td>
                                <td className="border border-gray-300 p-2"></td>
                                <td className="border border-gray-300 p-2"></td>
                                <td className="border border-gray-300 p-2"></td>
                                <td className="border border-gray-300 p-2"></td>
                                <td className="border border-gray-300 p-2"></td>
                                <td className="border border-gray-300 p-2"></td>
                                <td className="border border-gray-300 p-2"></td>
                                <td className="border border-gray-300 p-2"></td>
                                <td className="border border-gray-300 p-2"></td>
                              </>
                            )}
                          </tr>
                        );
                      });
                    });
                  })}

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

                    // Get related rekomendasi for the temuan
                    const relatedRekomendasi = relatedTemuan.flatMap(
                      (temuan) => groupedRekomendasi[temuan.id_tlhp] || []
                    );

                    // Get tindak lanjut based on rekomendasi
                    const relatedTL = relatedRekomendasi.flatMap((rek) => {
                      return (
                        DataTL.filter(
                          (tl) => tl.id_lhp === rek.id_rekomendasi
                        ) || []
                      );
                    });

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
                            relatedRekomendasi.reduce(
                              (sum, rek) =>
                                sum + (Number(rek.rekomendasi_nilai) || 0),
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
                              (sum, tl) => sum + (Number(tl.nilai_setor) || 0),
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
                              (sum, tl) => sum + (Number(tl.sisa_nominal) || 0),
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
                  {/* Total Summary Row */}
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
      </div>
    </AuthRoleWrapper>
  );
};

export default TableTindakLanjutPreview;
