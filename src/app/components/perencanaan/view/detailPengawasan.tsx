'use client';
import React from 'react';
import { CardComponents } from '../../Global/Card';
import { PKPTDataBase } from '@/interface/interfacePKPT';
import { useFetchById } from '@/hooks/useFetchById';
import {
  useGetNameJenisLaporan,
  useGetNameJenisPengawasan,
  useGetNameRuangLingkup,
  useGetNameTingkatResiko,
  useGetNameUser,
} from '@/hooks/useGetName';
import { formatCurrency, formatToLocalDate } from '@/data/formatData';

interface Props {
  id_pkpt: number;
}

const DetailPengawasan = ({ id_pkpt }: Props) => {
  const {
    data: DataPKPT,
    isLoading,
    error,
  } = useFetchById<PKPTDataBase>('pkpt', id_pkpt);

  const { getNameRuangLingkup } = useGetNameRuangLingkup();
  const { getNameJenisLaporan } = useGetNameJenisLaporan();
  const { getNameJenisPengawasan } = useGetNameJenisPengawasan();
  const { getNameTingkatResiko } = useGetNameTingkatResiko();
  const { getNameUser } = useGetNameUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-3">
      <div>
        <p className="font-semibold">
          {'>>'}
          {DataPKPT ? DataPKPT.status : 'No data available'}
        </p>
        <h1 className="text-2xl font-semibold">
          # {DataPKPT ? DataPKPT.area_pengawasan : 'No data available'}
        </h1>
      </div>
      <p>Ruang Lingkup:</p>
      <section className="grid lg:grid-cols-4 gap-3">

      {
  DataPKPT?.id_ruang_lingkup.split(', ').map((items:number) => {
    return (
      <div className="bg-white p-2 rounded-md shadow-md text-center font-semibold" key={items}>
        {getNameRuangLingkup(Number(items))}
      </div>
    );
  })
}
     
      </section>

      {/* section data identiti*/}
      <section className="grid lg:grid-cols-3 gap-3">
        <CardComponents>
          <p className="text-sm">Jenis Pengawasan</p>
          <h3 className="text-xl">
            {DataPKPT
              ? getNameJenisPengawasan(DataPKPT.id_jenis_pengawasan)
              : 'No data available'}
          </h3>
        </CardComponents>
        <CardComponents>
          <p className="text-sm">Tingkat Resiko</p>
          <h3 className="text-xl">
            {DataPKPT
              ? getNameTingkatResiko(DataPKPT.id_tingkat_resiko)
              : 'No data available'}
          </h3>
        </CardComponents>
        <CardComponents>
          <p className="text-sm">Anggaran</p>
          <h3 className="text-xl">
            {DataPKPT
              ? formatCurrency(Number(DataPKPT.anggaran))
              : 'No data available'}
          </h3>
        </CardComponents>
      </section>
      {/* section jadwal penugasan */}
      <CardComponents>
        <p>Jadwal Penugasan</p>
        <hr />
        <section className="grid md:grid-cols-2 gap-3">
          <div>
            <p>Rencana Mulai Penugasan</p>
            <h3>
              {DataPKPT
                ? formatToLocalDate(DataPKPT.rmp_pkpt)
                : 'No data available'}
            </h3>
          </div>
          <div>
            <p>Rencana Penerbitan Laporan</p>
            <h3>
              {DataPKPT
                ? formatToLocalDate(DataPKPT.rpl_pkpt)
                : 'No data available'}
            </h3>
          </div>
        </section>
      </CardComponents>

      {/* section hari kerja */}
      <CardComponents>
        <p>Hari Penugasan</p>
        <section className="flex justify-start items-start gap-3">
          <div className="w-1/5">
            <small>Jumlah</small>
            <h2 className="text-2xl font-extrabold">
              {DataPKPT ? DataPKPT.jumlah : 'No data available'}
            </h2>
          </div>
          <div className="flex-1">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <small>Penanggung Jawab</small>
                <h3>
                  {DataPKPT ? DataPKPT.penanggung_jawab : 'No data available'}
                </h3>
              </div>
              <div>
                <small>Wakil Penanggung Jawab</small>
                <h3>
                  {DataPKPT
                    ? DataPKPT.wakil_penanggung_jawab
                    : 'No data available'}
                </h3>
              </div>
              <div>
                <small>Dalnis/Supervisor</small>
                <h3>
                  {DataPKPT ? DataPKPT.pengendali_teknis : 'No data available'}
                </h3>
              </div>
              <div>
                <small>Ketua Tim</small>
                <h3>{DataPKPT ? DataPKPT.ketua_tim : 'No data available'}</h3>
              </div>
              <div>
                <small>Anggota Tim</small>
                <h3>{DataPKPT ? DataPKPT.anggota_tim : 'No data available'}</h3>
              </div>
            </div>
          </div>
        </section>
      </CardComponents>
      {/* section tujuan dan tim */}
      <section className="grid lg:grid-cols-2 gap-3">
        <CardComponents>
          <p className="font-medium">Tujuan/Sasaran</p>
          <p className="text-slate-950">
            {DataPKPT ? DataPKPT.tujuan_sasaran : 'No data available'}
          </p>
        </CardComponents>
        <CardComponents>
          <p className="font-medium">Tim</p>
          <div className="flex flex-col gap-2">
            {DataPKPT
              ? DataPKPT?.tim.split('|').map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-2 rounded-md hover:font-semibold text-slate-950"
                  >
                    {item}
                  </div>
                ))
              : 'No data available'}
            {/* {DataPKPT?.tim
              .split(',')
              .map((id) => getNameUser(Number(id)))
              .join(', ')} */}
          </div>
        </CardComponents>
      </section>
      {/* data minor */}
      <section className="grid lg:grid-cols-2 gap-3">
        <CardComponents>
          <p>Jumlah Laporan</p>
          <h3 className="text-xl">
            {DataPKPT ? DataPKPT.jumlah_laporan : 'No data available'} -{' '}
            {DataPKPT
              ? getNameJenisLaporan(DataPKPT.id_jenis_laporan)
              : 'No available'}
          </h3>
        </CardComponents>
        <CardComponents>
          <p>Sarana & Prasarana</p>
          <p className="text-slate-950">
            {DataPKPT ? DataPKPT.sarana_prasarana : 'No data available'}
          </p>
        </CardComponents>
        <div className="lg:col-span-2">
          <CardComponents>
            <p>Keterangan</p>
            <h3>{DataPKPT ? DataPKPT.keterangan : 'No data available'}</h3>
          </CardComponents>
        </div>
      </section>
    </div>
  );
};

export default DetailPengawasan;
