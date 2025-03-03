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
import { Accordion, Card } from 'flowbite-react';
import { formatCurrency, formatToLocalDate } from '@/data/formatData';
import { useFetchAll } from '@/hooks/useFetchAll';
import { CardComponents } from '../Global/Card';

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

  const { data: DataRekomendasi } = useFetchAll<RekomendasiData>('rekomendasi');
  console.log('Data Rekomendasi: ', DataRekomendasi);

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
    !['Pelaksana', 'Auditor', 'Developer'].includes(user.role as string)
  )
    return null;

  return (
    <>
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari Data ST / Program Audit"
          className="w-full p-2 border rounded-md mt-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Data List */}
      <section className="grid gap-8">
        {/* {currentItems.map((group, index) => (
          <> */}
        <Accordion className="bg-white shadow-md">
          {currentItems.map((group, index) => (
            <Accordion.Panel key={index}>
              <Accordion.Title>
                <h1 className="font-light text-sm">{group.spNumber}</h1>
                <p>{group.programAudit}</p>
              </Accordion.Title>
              <Accordion.Content>
                <div className="flex justify-start items-start gap-3">
                  <div>
                    <p>Jumlah Temuan</p>
                    <h2 className="text-2xl font-semibold">
                      {group.temuanList.length}
                    </h2>
                  </div>
                  <ul className="list-none space-y-4 flex-1">
                    {group.temuanList.map((temuan, idx) => (
                      <li key={idx} className="border-b-2 py-3">
                        <Card>
                          <div className="grid grid-cols-3 gap-3 w-full">
                            <div>
                              <small>Uraian LHP</small>
                              <h1>{getUraianLHP(temuan.id_st)}</h1>
                            </div>
                            <div>
                              <small>Kondisi Temuan</small>
                              <h1>{temuan.kondisi_temuan}</h1>
                            </div>
                            <div>
                              <small>Kode Temuan</small>
                              <h1>
                                {getNameKodeTemuan(temuan.id_kode_temuan)}
                              </h1>
                              <small>
                                {getFieldKodeTemuan(temuan.id_kode_temuan)}
                              </small>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 gap-3">
                            {DataRekomendasi.filter(
                              (itemsfilter) =>
                                itemsfilter.id_tlhp === temuan.id_tlhp
                            ).map((rekomendasi, index) => {
                              return (
                                <CardComponents key={index}>
                                  <div className="grid lg:grid-cols-1 gap-2">
                                    <div>
                                      <small>Rekomendasi/Saran</small>
                                      <h1>{rekomendasi.rekomendasi_saran}</h1>
                                    </div>
                                    <div>
                                      <small>Rekomendasi Nilai (Rp.)</small>
                                      <h1>
                                        {formatCurrency(
                                          rekomendasi.rekomendasi_nilai
                                        )}
                                      </h1>
                                    </div>
                                    <div>
                                      <small>Kode Rekomendasi</small>
                                      <h1>
                                        {getNameKodeRekomendasi(
                                          rekomendasi.id_kode_rekomendasi
                                        )}
                                      </h1>
                                      <small>
                                        {getFieldKodeRekomendasi(
                                          rekomendasi.id_kode_rekomendasi
                                        )}
                                      </small>
                                    </div>
                                  </div>
                                  <Link
                                    href={`/dashboard/${todo}/${rekomendasi.id_rekomendasi}`}
                                    className="py-1 px-2 border border-violet-600 text-slate-900 rounded-md text-center text-sm font-medium hover:bg-violet-700 hover:text-white inline-block mt-1 w-full"
                                  >
                                    {title}
                                  </Link>
                                </CardComponents>
                              );
                            })}
                          </div>
                          {/* <div className="flex justify-between items-baseline gap-3">
                            <Link
                              href={`https://wa.me/${getUserPhone(temuan.id_user)}`}
                              target="_blank"
                            >
                              <p className="flex items-center gap-2 text-sm">
                                <Icon
                                  icon="solar:user-check-line-duotone"
                                  width="18"
                                  height="18"
                                />
                                {getNameUser(temuan.id_user)}
                              </p>
                            </Link>
                            <p>{formatToLocalDate(temuan.created_at)}</p>
                          </div> */}
                          {/* <Link
                            href={`/dashboard/${todo}/${temuan.id_tlhp}`}
                            className="py-1 px-2 border border-violet-600 text-slate-900 rounded-md text-center text-sm font-medium hover:bg-violet-700 hover:text-white inline-block mt-1 w-full"
                          >
                            {title}
                          </Link> */}
                        </Card>
                      </li>
                    ))}
                  </ul>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          ))}
        </Accordion>
      </section>

      {/* Pagination Controls */}
      {filteredData.length > itemsPerPage && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default MapDataTemuanHasil;
