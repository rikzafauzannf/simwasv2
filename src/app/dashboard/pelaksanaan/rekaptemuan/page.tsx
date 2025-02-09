'use client';
import { CardComponents } from '@/app/components/Global/Card';
import PdfGenerator from '@/app/components/PDFGenerator';
import { useFetchAll } from '@/hooks/useFetchAll';
import { useGetNameKode, useGetNameST } from '@/hooks/useGetName';
import { KodeTemuanDB } from '@/interface/interfaceReferensi';
import { TemuanHasilData } from '@/interface/interfaceTemuanHasil';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import { Table } from 'flowbite-react';
import React from 'react';

const RekapTemuanPage = () => {
  const { data: DataTemuanHasil } =
    useFetchAll<TemuanHasilData>('temuan_hasil');
  const { data: DataKodeTemuan } = useFetchAll<KodeTemuanDB>('kode_temuan');
  const { getNameNoSP } = useGetNameST();
  const { getNameKodeTemuan, getNameKodeRekomendasi } = useGetNameKode();

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
        kode_temuan: kodeTemuan ? kodeTemuan.kode_temuan : null, // Gabungkan kode_temuan
      };
    }).filter((item) => item.kode_temuan !== null); // Hanya ambil yang memiliki pasangan
  }, [DataTemuanHasil, DataKodeTemuan]);
  
  return (
    <AuthRoleWrapper
      allowedRoles={['Admin', 'Pimpinan', 'Pelaksana', 'Auditor']}
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
                    {Object.entries(groupedData).map(
                      ([spNumber, items], groupIndex) => {
                        return items.map((item, itemIndex) => (
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
                              {item.nilai_rekomendasi}
                            </td>
                            <td className="border border-gray-300 p-2">
                              {
                                getNameKodeRekomendasi(
                                  item.id_kode_rekomendasi
                                ).split('.')[0]
                              }
                            </td>
                            <td className="border border-gray-300 p-2">
                              {getNameKodeRekomendasi(item.id_kode_rekomendasi)}
                            </td>
                          </tr>
                        ));
                      }
                    )}
                    {/* Kode Temuan Summary Section */}
                    {DataKodeTemuan.filter((itemsfilter)=>itemsfilter.kode_temuan?.split('.')[1] === "00").map((item, index) => (
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
                          {
                            mergedDataTemuan.filter(
                              (filterby) =>
                                filterby.kode_temuan?.split('.')[0] === item.kode_temuan?.split('.')[0]
                            ).length
                          }
                        </td>
                        <td className="border border-gray-300 p-2 text-center"></td>
                        <td className="border border-gray-300 p-2 text-center">
                          {
                            mergedDataTemuan.filter(
                              (filterby) =>
                                filterby.kode_temuan?.split('.')[0] === item.kode_temuan?.split('.')[0]
                            ).length
                          }
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          {DataTemuanHasil.filter(
                            (filterby) =>
                              filterby.id_kode_temuan === item.id_kode_temuan
                          ).reduce(
                            (sum, current) => sum + current.nilai_rekomendasi,
                            0
                          )}
                        </td>
                        <td className="border border-gray-300 p-2 text-center"></td>
                        <td className="border border-gray-300 p-2 text-center"></td>
                      </tr>
                    ))}
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
                        {DataTemuanHasil.length}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {DataTemuanHasil.reduce(
                          (sum, current) => sum + current.nilai_rekomendasi,
                          0
                        )}
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

export default RekapTemuanPage;
