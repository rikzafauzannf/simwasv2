'use client';
import { CardComponents } from '@/app/components/Global/Card';
import PdfGenerator from '@/app/components/PDFGenerator';
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
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import { Table } from 'flowbite-react';
import React from 'react';

const TableTemuanPreview = () => {
  const { data: DataTemuanHasil } =
    useFetchAll<TemuanHasilData>('temuan_hasil');
  const { data: DataKodeTemuan } = useFetchAll<KodeTemuanDB>('kode_temuan');
  const { getNameNoSP } = useGetNameST();
  const { getNameKodeTemuan, getNameKodeRekomendasi } = useGetNameKode();
  const { data: RekomendasiData } = useFetchAll<RekomendasiData>('rekomendasi');
  const { getNomorLHP, getSTLHP, getUraianLHP } = useGetNameLHP();

  // First group data by ST, then by LHP, then by temuan
  const groupedData = React.useMemo(() => {
    const stGroups: {
      [key: string]: {
        stNumber: string;
        lhpGroups: {
          [key: string]: {
            lhpNumber: string;
            uraianLHP: string;
            temuans: TemuanHasilData[];
          };
        };
      };
    } = {};

    DataTemuanHasil.forEach((temuan) => {
      const idST = Number(temuan.id_st);
      const stNumber = getNameNoSP(idST);

      if (!stGroups[stNumber]) {
        stGroups[stNumber] = {
          stNumber,
          lhpGroups: {},
        };
      }

      const lhpNumber = getNomorLHP(idST);
      const uraianLHP = getUraianLHP(idST);

      if (!stGroups[stNumber].lhpGroups[lhpNumber]) {
        stGroups[stNumber].lhpGroups[lhpNumber] = {
          lhpNumber,
          uraianLHP,
          temuans: [],
        };
      }

      stGroups[stNumber].lhpGroups[lhpNumber].temuans.push(temuan);
    });

    return stGroups;
  }, [DataTemuanHasil, getNameNoSP, getNomorLHP, getUraianLHP]);

  // Map temuan with their associated recommendations
  const structuredData = React.useMemo(() => {
    return Object.values(groupedData).map((stGroup) => {
      return {
        stNumber: stGroup.stNumber,
        lhps: Object.values(stGroup.lhpGroups).map((lhpGroup) => {
          return {
            lhpNumber: lhpGroup.lhpNumber,
            uraianLHP: lhpGroup.uraianLHP,
            temuans: lhpGroup.temuans.map((temuan) => {
              // Get all recommendations for this temuan
              const rekomendasiList = RekomendasiData.filter(
                (rek) => rek.id_tlhp === temuan.id_tlhp
              );

              return {
                ...temuan,
                rekomendasiList:
                  rekomendasiList.length > 0 ? rekomendasiList : [],
              };
            }),
          };
        }),
      };
    });
  }, [groupedData, RekomendasiData]);

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

  // Calculate total recommendations
  const totalRekomendasi = React.useMemo(() => {
    return RekomendasiData.length;
  }, [RekomendasiData]);

  // Calculate total nilai rekomendasi
  const totalNilaiRekomendasi = React.useMemo(() => {
    return RekomendasiData.reduce(
      (sum, current) => sum + (Number(current.rekomendasi_nilai) || 0),
      0
    );
  }, [RekomendasiData]);

  return (
    <AuthRoleWrapper
      allowedRoles={['Admin', 'Pimpinan', 'Pelaksana', 'Auditor', 'Developer','JFA','PEP']}
    >
      <div className="space-y-3">
        <CardComponents>
          <PdfGenerator>
            <div className="space-y-3">
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
                      <th className="border border-gray-300 p-2">NO</th>
                      <th className="border border-gray-300 p-2">
                        NOMOR DAN TANGGAL SP
                      </th>
                      <th className="border border-gray-300 p-2">
                        URAIAN,AUDITAN, NOMOR DAN TGL LHP
                      </th>
                      <th className="border border-gray-300 p-2">NO</th>
                      <th className="border border-gray-300 p-2">
                        KONDISI/TEMUAN
                      </th>
                      <th className="border border-gray-300 p-2" colSpan={2}>
                        KODE TEMUAN
                      </th>
                      <th className="border border-gray-300 p-2" colSpan={2}>
                        REKOMENDASI/SARAN
                      </th>
                      <th className="border border-gray-300 p-2" colSpan={2}>
                        NILAI REKOMENDASI Rp.
                      </th>
                      <th className="border border-gray-300 p-2">KODE REK</th>
                    </tr>
                  </thead>
                  <tbody>
                    {structuredData.map((stGroup, stIndex) => {
                      // Calculate total rows for this ST group
                      let stRowCount = 0;
                      stGroup.lhps.forEach((lhp) => {
                        lhp.temuans.forEach((temuan) => {
                          stRowCount +=
                            temuan.rekomendasiList.length > 0
                              ? temuan.rekomendasiList.length
                              : 1;
                        });
                      });

                      return stGroup.lhps.flatMap((lhp, lhpIndex) => {
                        // Calculate row count for this LHP
                        let lhpRowCount = 0;
                        lhp.temuans.forEach((temuan) => {
                          lhpRowCount +=
                            temuan.rekomendasiList.length > 0
                              ? temuan.rekomendasiList.length
                              : 1;
                        });

                        return lhp.temuans.flatMap((temuan, temuanIndex) => {
                          // If no recommendations, show one row with empty recommendation
                          if (temuan.rekomendasiList.length === 0) {
                            const isFirstTemuanInLHP = temuanIndex === 0;
                            const isFirstLHPInST = lhpIndex === 0;

                            return (
                              <tr
                                key={`${temuan.id_tlhp}-empty`}
                                className="hover:bg-gray-100 text-center align-middle"
                              >
                                {isFirstLHPInST && isFirstTemuanInLHP && (
                                  <td
                                    className="border border-gray-300 p-2"
                                    rowSpan={stRowCount}
                                  >
                                    {stIndex + 1}
                                  </td>
                                )}

                                {isFirstLHPInST && isFirstTemuanInLHP && (
                                  <td
                                    className="border border-gray-300 p-2"
                                    rowSpan={stRowCount}
                                  >
                                    {stGroup.stNumber}
                                  </td>
                                )}

                                {isFirstTemuanInLHP && (
                                  <td
                                    className="border border-gray-300 p-2"
                                    rowSpan={lhpRowCount}
                                  >
                                    {lhp.uraianLHP}
                                  </td>
                                )}

                                <td className="border border-gray-300 p-2">
                                  T{temuanIndex + 1}
                                </td>
                                <td className="border border-gray-300 p-2">
                                  {temuan.kondisi_temuan}
                                </td>
                                <td className="border border-gray-300 p-2">
                                  {getNameKodeTemuan(
                                    Number(temuan.id_kode_temuan)
                                  )}
                                </td>
                                <td className="border border-gray-300 p-2">
                                  {
                                    getNameKodeTemuan(
                                      Number(temuan.id_kode_temuan)
                                    ).split('.')[0]
                                  }
                                </td>
                                <td className="border border-gray-300 p-2">
                                  {/* Empty rekomendasi cell */}
                                </td>
                                <td className="border border-gray-300 p-2">
                                  {/* Empty kode rekomendasi prefix cell */}
                                </td>
                                <td className="border border-gray-300 p-2">
                                  {/* Empty nilai rekomendasi cell */}
                                </td>
                                <td className="border border-gray-300 p-2">
                                  {/* Empty kode rekomendasi prefix cell */}
                                </td>
                                <td className="border border-gray-300 p-2">
                                  {/* Empty kode rekomendasi cell */}
                                </td>
                              </tr>
                            );
                          }

                          // For temuans with recommendations
                          return temuan.rekomendasiList.map(
                            (rekomendasi, rekIndex) => {
                              const isFirstTemuanInLHP = temuanIndex === 0;
                              const isFirstLHPInST = lhpIndex === 0;
                              const isFirstRekForTemuan = rekIndex === 0;
                              const isFirstRow =
                                isFirstLHPInST &&
                                isFirstTemuanInLHP &&
                                isFirstRekForTemuan;

                              return (
                                <tr
                                  key={`${temuan.id_tlhp}-${rekomendasi.id_rekomendasi}-${rekIndex}`}
                                  className="hover:bg-gray-100 text-center align-middle"
                                >
                                  {isFirstLHPInST &&
                                    isFirstTemuanInLHP &&
                                    isFirstRekForTemuan && (
                                      <td
                                        className="border border-gray-300 p-2"
                                        rowSpan={stRowCount}
                                      >
                                        {stIndex + 1}
                                      </td>
                                    )}

                                  {isFirstLHPInST &&
                                    isFirstTemuanInLHP &&
                                    isFirstRekForTemuan && (
                                      <td
                                        className="border border-gray-300 p-2"
                                        rowSpan={stRowCount}
                                      >
                                        {stGroup.stNumber}
                                      </td>
                                    )}

                                  {isFirstTemuanInLHP &&
                                    isFirstRekForTemuan && (
                                      <td
                                        className="border border-gray-300 p-2"
                                        rowSpan={lhpRowCount}
                                      >
                                        {lhp.uraianLHP}
                                      </td>
                                    )}

                                  {isFirstRekForTemuan && (
                                    <>
                                      <td
                                        className="border border-gray-300 p-2"
                                        rowSpan={temuan.rekomendasiList.length}
                                      >
                                        T{temuanIndex + 1}
                                      </td>
                                      <td
                                        className="border border-gray-300 p-2"
                                        rowSpan={temuan.rekomendasiList.length}
                                      >
                                        {temuan.kondisi_temuan}
                                      </td>
                                      <td
                                        className="border border-gray-300 p-2"
                                        rowSpan={temuan.rekomendasiList.length}
                                      >
                                        {getNameKodeTemuan(
                                          Number(temuan.id_kode_temuan)
                                        )}
                                      </td>
                                      <td
                                        className="border border-gray-300 p-2"
                                        rowSpan={temuan.rekomendasiList.length}
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
                                    {rekomendasi.rekomendasi_saran}
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    {
                                      getNameKodeRekomendasi(
                                        rekomendasi.id_kode_rekomendasi
                                      ).split('.')[0]
                                    }
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    {rekomendasi.rekomendasi_nilai}
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    {
                                      getNameKodeRekomendasi(
                                        rekomendasi.id_kode_rekomendasi
                                      ).split('.')[0]
                                    }
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    {getNameKodeRekomendasi(
                                      rekomendasi.id_kode_rekomendasi
                                    )}
                                  </td>
                                </tr>
                              );
                            }
                          );
                        });
                      });
                    })}

                    {/* Kode Temuan Summary Section */}
                    {DataKodeTemuan.filter(
                      (itemsfilter) =>
                        itemsfilter.kode_temuan?.split('.')[1] === '00'
                    ).map((item, index) => {
                      // Count temuans with this kode_temuan
                      const temuanCount = mergedDataTemuan.filter(
                        (filterby) =>
                          filterby.kode_temuan?.split('.')[0] ===
                          item.kode_temuan?.split('.')[0]
                      ).length;

                      // Get temuans with this kode_temuan prefix
                      const relatedTemuans = mergedDataTemuan.filter(
                        (filterby) =>
                          filterby.kode_temuan?.split('.')[0] ===
                          item.kode_temuan?.split('.')[0]
                      );

                      // Get all id_tlhp values from filtered temuans
                      const relatedTlhpIds = relatedTemuans.map(
                        (temuan) => temuan.id_tlhp
                      );

                      // Count rekomendasi associated with these temuan
                      const rekomendasiCount = RekomendasiData.filter((rek) =>
                        relatedTlhpIds.includes(rek.id_tlhp)
                      ).length;

                      // Calculate total nilai for this kode_temuan
                      const totalNilai = RekomendasiData.filter((rek) =>
                        relatedTlhpIds.includes(rek.id_tlhp)
                      ).reduce(
                        (sum, rek) =>
                          sum + (Number(rek.rekomendasi_nilai) || 0),
                        0
                      );

                      return (
                        <tr
                          key={`summary-${index}`}
                          className="hover:bg-gray-100 text-center align-middle"
                        >
                          <td
                            className="border border-gray-300 p-2 text-center"
                            colSpan={6}
                          >
                            {item.keterangan_kode}
                          </td>
                          <td className="border border-gray-300 p-2 text-center">
                            {temuanCount}
                          </td>
                          <td className="border border-gray-300 p-2 text-center"></td>
                          <td className="border border-gray-300 p-2 text-center">
                            {rekomendasiCount}
                          </td>
                          <td className="border border-gray-300 p-2 text-center">
                            {totalNilai}
                          </td>
                          <td className="border border-gray-300 p-2 text-center"></td>
                          <td className="border border-gray-300 p-2 text-center"></td>
                        </tr>
                      );
                    })}

                    {/* Total Row */}
                    <tr className="hover:bg-gray-100 text-center align-middle">
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
                        {RekomendasiData.length}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {totalNilaiRekomendasi}
                      </td>
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

export default TableTemuanPreview;
