'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useFetch } from '@/hooks/useFetch';
import {
  RekomendasiData,
  TemuanHasilData,
} from '@/interface/interfaceTemuanHasil';
import {
  useGetNameKode,
  useGetNameLHP,
  useGetNameST,
  useGetNameUser,
} from '@/hooks/useGetName';
import { Icon } from '@iconify/react';
import { useAuthStore } from '@/middleware/Store/useAuthStore';
import { Accordion, Card, Badge, Spinner } from 'flowbite-react';
import { formatCurrency, formatToLocalDate } from '@/data/formatData';
import { useFetchAll } from '@/hooks/useFetchAll';
import { CardComponents } from '../Global/Card';
import { LHPData } from '@/interface/interfaceHasilPengawasan';
import Lottie from "lottie-react";
import animationsload from '../../../../public/animation_load.json'

interface Props {
  todo: string;
  title: string;
}

const MapDataTemuanHasil: React.FC<Props> = ({ todo, title }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: DatTemuanHasil, isLoading } =
    useFetch<TemuanHasilData>('temuan_hasil');
  const { getNameNoSP, getProgramAudit } = useGetNameST();
  const {
    getNameKodeRekomendasi,
    getNameKodeTemuan,
    getFieldKodeTemuan,
    getFieldKodeRekomendasi,
  } = useGetNameKode();

  const { getNomorLHP, getUraianLHP } = useGetNameLHP();
  const { getNameUser, getUserPhone } = useGetNameUser();

  const { data: DataRekomendasi, isLoading: isLoadingRekomendasi } =
    useFetchAll<RekomendasiData>('rekomendasi');

  // Mengelompokkan data berdasarkan id_st
  const groupedData = useMemo(() => {
    if (!DatTemuanHasil) return [];

    const groups: { [key: string]: TemuanHasilData[] } = {};

    DatTemuanHasil.forEach((item) => {
      const stKey = getNameNoSP(item.id_st);
      if (!groups[stKey]) {
        groups[stKey] = [];
      }
      groups[stKey].push(item);
    });

    return Object.entries(groups).map(([stKey, temuanList]) => ({
      id_st: temuanList[0].id_st,
      spNumber: stKey,
      programAudit: getProgramAudit(temuanList[0].id_st),
      temuanList,
    }));
  }, [DatTemuanHasil, getNameNoSP, getProgramAudit]);

  // Filter data berdasarkan search term
  const filteredData = groupedData.filter(
    (group) =>
      group.spNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.programAudit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const { user } = useAuthStore();
  if (
    !user ||
    !['Pelaksana', 'Auditor', 'Developer','JFA','OPD'].includes(user.role as string)
  )
    return null;

  if (isLoading || isLoadingRekomendasi) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          {/* <Spinner size="xl" className="mx-auto mb-4" /> */}
          <Lottie animationData={animationsload} loop={true}/>
          <p className="text-gray-500">Loading data...</p>
        </div>
      </div>
    );
  }

  if (filteredData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Cari Data ST / Program Audit"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="py-16">
          <Icon
            icon="solar:file-search-broken"
            className="mx-auto mb-4 text-gray-400"
            width="64"
            height="64"
          />
          <h3 className="text-lg font-medium text-gray-900">
            Data tidak ditemukan
          </h3>
          <p className="text-gray-500 mt-2">
            Silahkan coba pencarian yang lain
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Icon
            icon="solar:magnifer-linear"
            className="text-gray-500"
            width="20"
            height="20"
          />
        </div>
        <input
          type="text"
          placeholder="Cari Data ST / Program Audit"
          className="w-full p-3 ps-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all bg-white shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Data Stats */}
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg shadow-md p-4 text-white">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold">Ringkasan Data</h2>
            <p className="text-violet-100">Periode terkini</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-32">
              <p className="text-violet-100 text-sm">Total ST</p>
              <p className="text-2xl font-bold">{filteredData.length}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-32">
              <p className="text-violet-100 text-sm">Total Temuan</p>
              <p className="text-2xl font-bold">
                {filteredData.reduce(
                  (sum, group) => sum + group.temuanList.length,
                  0
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Data List */}
      <section className="space-y-4">
        <Accordion className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden bg-white">
          {currentItems.map((group, index) => (
            <Accordion.Panel key={index}>
              <Accordion.Title className="flex justify-between items-center p-5 hover:bg-gray-50 focus:ring-2 focus:ring-violet-200 transition-all">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 items-center mb-1">
                    <Badge color="purple" className="font-normal">
                      SP {index + 1 + indexOfFirstItem}
                    </Badge>
                    <h3 className="text-gray-500 text-sm font-medium">
                      {group.spNumber}
                    </h3>
                  </div>
                  <p className="font-semibold text-gray-900">
                    {group.programAudit}
                  </p>
                </div>
                <Badge color="gray" className="ms-2 font-normal hidden sm:flex">
                  {group.temuanList.length} Temuan
                </Badge>
              </Accordion.Title>
              <Accordion.Content className="bg-gray-50 p-5">
                <div className="flex flex-col lg:flex-row justify-start items-start gap-5">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 min-w-48">
                    <p className="text-gray-500 text-sm mb-1">Jumlah Temuan</p>
                    <h2 className="text-3xl font-bold text-violet-600">
                      {group.temuanList.length}
                    </h2>
                    <div className="flex flex-col gap-2 mt-4">
                      <div className="bg-violet-50 p-3 rounded-md">
                        <p className="text-xs text-gray-500">Nomor LHP</p>
                        <p className="text-sm font-medium">
                          {getNomorLHP(group.temuanList[0].id_st)}
                        </p>
                      </div>
                      <div className="bg-violet-50 p-3 rounded-md">
                        <p className="text-xs text-gray-500">Tanggal</p>
                        <p className="text-sm font-medium">
                          {formatToLocalDate(group.temuanList[0].created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 w-full space-y-4">
                    {group.temuanList.map((temuan, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                      >
                        <div className="p-4 border-b border-gray-100">
                          <div className="flex items-center justify-between mb-3">
                            <Badge color="purple" className="font-normal">
                              Temuan #{idx + 1}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {formatToLocalDate(temuan.created_at)}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">
                                Uraian LHP
                              </p>
                              <p className="font-medium text-gray-900">
                                {getUraianLHP(temuan.id_st)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">
                                Kondisi Temuan
                              </p>
                              <p className="font-medium text-gray-900">
                                {temuan.kondisi_temuan}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">
                                Kode Temuan
                              </p>
                              <p className="font-medium text-gray-900">
                                {getNameKodeTemuan(temuan.id_kode_temuan)}
                              </p>
                              <p className="text-xs text-gray-500 mt-1 italic">
                                {getFieldKodeTemuan(temuan.id_kode_temuan)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-gray-50">
                          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                            <Icon
                              icon="solar:document-linear"
                              width="18"
                              height="18"
                            />
                            Rekomendasi
                          </h4>
                          <div className="grid grid-cols-1 gap-3">
                            {DataRekomendasi.filter(
                              (itemsfilter) =>
                                itemsfilter.id_tlhp === temuan.id_tlhp
                            ).map((rekomendasi, index) => (
                              <div
                                key={index}
                                className="bg-white rounded-lg p-3 border border-gray-200"
                              >
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-3">
                                  <div>
                                    <p className="text-xs text-gray-500 mb-1">
                                      Rekomendasi/Saran
                                    </p>
                                    <p className="font-medium text-gray-900">
                                      {rekomendasi.rekomendasi_saran}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 mb-1">
                                      Rekomendasi Nilai
                                    </p>
                                    <p className="font-medium text-gray-900">
                                      {formatCurrency(
                                        rekomendasi.rekomendasi_nilai
                                      )}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 mb-1">
                                      Kode Rekomendasi
                                    </p>
                                    <p className="font-medium text-gray-900">
                                      {getNameKodeRekomendasi(
                                        rekomendasi.id_kode_rekomendasi
                                      )}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1 italic">
                                      {getFieldKodeRekomendasi(
                                        rekomendasi.id_kode_rekomendasi
                                      )}
                                    </p>
                                  </div>
                                </div>
                                <Link
                                  href={`/dashboard/${todo}/${rekomendasi.id_rekomendasi}`}
                                  className="inline-flex items-center justify-center w-full py-2.5 px-3 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors gap-2"
                                >
                                  <Icon
                                    icon="solar:eye-linear"
                                    width="18"
                                    height="18"
                                  />
                                  {title}
                                </Link>
                              </div>
                            ))}
                          </div>
                          {DataRekomendasi.filter(
                            (item) => item.id_tlhp === temuan.id_tlhp
                          ).length === 0 && (
                            <div className="text-center py-6 text-gray-500">
                              <Icon
                                icon="solar:box-minimalistic-broken"
                                className="mx-auto mb-2"
                                width="32"
                                height="32"
                              />
                              <p>Belum ada data rekomendasi</p>
                            </div>
                          )}
                        </div>
                        <div className="p-3 flex justify-between items-center border-t border-gray-100 bg-white">
                          <Link
                            href={`https://wa.me/${getUserPhone(temuan.id_user)}`}
                            target="_blank"
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-violet-600 transition-colors"
                          >
                            <Icon
                              icon="solar:user-rounded-linear"
                              width="16"
                              height="16"
                            />
                            {getNameUser(temuan.id_user)}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          ))}
        </Accordion>
      </section>

      {/* Pagination Controls */}
      {filteredData.length > itemsPerPage && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white flex items-center gap-1 transition-colors"
          >
            <Icon icon="solar:arrow-left-linear" width="16" height="16" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="hidden sm:flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  currentPage === page
                    ? 'bg-violet-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <span className="sm:hidden px-4 py-2 text-sm text-gray-700">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white flex items-center gap-1 transition-colors"
          >
            <span className="hidden sm:inline">Next</span>
            <Icon icon="solar:arrow-right-linear" width="16" height="16" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MapDataTemuanHasil;
