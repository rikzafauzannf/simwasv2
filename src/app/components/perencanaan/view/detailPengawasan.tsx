'use client';
import React, { useEffect, useState } from 'react';
import { CardComponents } from '../../Global/Card';
import { PKPTDataBase } from '@/interface/interfacePKPT';
import { FirestoreService } from '@/services/firestore.service';
import { useFetchById } from '@/hooks/useFetchById';

interface Props {
  id_pkpt: string;
}

const DetailPengawasan = ({ id_pkpt }: Props) => {
  const {
    data: DataPKPT,
    isLoading,
    error,
  } = useFetchById<PKPTDataBase>('pkpt', id_pkpt);
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
      <section className="grid grid-cols-4 gap-3">
        <div className="bg-white p-2 rounded-md shadow-md text-center font-medium">
          {DataPKPT ? DataPKPT.ruang_lingkup : 'No data available'}
        </div>
        {/* <div className="bg-white p-2 rounded-md shadow-md text-center font-medium">
          kominfo
        </div>
        <div className="bg-white p-2 rounded-md shadow-md text-center font-medium">
          kominfo
        </div>
        <div className="bg-white p-2 rounded-md shadow-md text-center font-medium">
          kominfo
        </div> */}
      </section>

      {/* section data identiti*/}
      <section className="grid grid-cols-3 gap-3">
        <CardComponents>
          <p className="text-sm">Jenis Pengawasan</p>
          <h3 className="text-xl">
            {DataPKPT ? DataPKPT.jenis_pengawasan : 'No data available'}
          </h3>
        </CardComponents>
        <CardComponents>
          <p className="text-sm">Tingkat Resiko</p>
          <h3 className="text-xl">
            {DataPKPT ? DataPKPT.tingkat_risiko : 'No data available'}
          </h3>
        </CardComponents>
        <CardComponents>
          <p className="text-sm">Anggaran</p>
          <h3 className="text-xl">
            Rp.{' '}
            {DataPKPT
              ? DataPKPT.anggaran.toLocaleString('id-ID')
              : 'No data available'}
          </h3>
        </CardComponents>
      </section>
      {/* section jadwal penugasan */}
      <CardComponents>
        <p>Jadwal Penugasan</p>
        <hr />
        <section className="grid grid-cols-2 gap-3">
          <div>
            <p>Rencana Mulai Penugasan</p>
            <h3>
              {DataPKPT ? DataPKPT.rencana_penugasan : 'No data available'}
            </h3>
          </div>
          <div>
            <p>Rencana Penerbitan Laporan</p>
            <h3>
              {DataPKPT ? DataPKPT.rencana_penerbitan : 'No data available'}
            </h3>
          </div>
        </section>
      </CardComponents>
      {/* section tujuan dan tim */}
      <section className="grid grid-cols-2 gap-3">
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
              ? DataPKPT.tim.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-2 rounded-md hover:font-semibold text-slate-950"
                  >
                    {item.name}
                  </div>
                ))
              : 'No data available'}
          </div>
        </CardComponents>
      </section>
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
            <div className="grid grid-cols-3 gap-3">
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
      {/* data minor */}
      <section className="grid grid-cols-2 gap-3">
        <CardComponents>
          <p>Jumlah Laporan</p>
          <h3 className="text-xl">
            {DataPKPT ? DataPKPT.jumlah_laporan : 'No data available'}
          </h3>
        </CardComponents>
        <CardComponents>
          <p>Sarana & Prasarana</p>
          <p className="text-slate-950">
            {DataPKPT ? DataPKPT.sarana_prasarana : 'No data available'}
          </p>
        </CardComponents>
        <div className="col-span-2">
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
