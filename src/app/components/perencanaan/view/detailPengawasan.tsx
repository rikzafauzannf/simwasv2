'use client';
import React from 'react';
import { CardComponents } from '../../Global/Card';

const DetailPengawasan = () => {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">#Area Pengawasan</h1>
      <p>Ruang Lingkup:</p>
      <section className="grid grid-cols-4 gap-3">
        <div className="bg-white p-2 rounded-md shadow-md text-center font-medium">
          kominfo
        </div>
        <div className="bg-white p-2 rounded-md shadow-md text-center font-medium">
          kominfo
        </div>
        <div className="bg-white p-2 rounded-md shadow-md text-center font-medium">
          kominfo
        </div>
        <div className="bg-white p-2 rounded-md shadow-md text-center font-medium">
          kominfo
        </div>
      </section>

      {/* section data identiti*/}
      <section className="grid grid-cols-3 gap-3">
        <CardComponents>
          <p className="text-sm">Jenis Pengawasan</p>
          <h3 className="text-xl">Audit Ketaatan</h3>
        </CardComponents>
        <CardComponents>
          <p className="text-sm">Tingkat Resiko</p>
          <h3 className="text-xl">Tinggi</h3>
        </CardComponents>
        <CardComponents>
          <p className="text-sm">Anggaran</p>
          <h3 className="text-xl">Rp.33.660.000</h3>
        </CardComponents>
      </section>
      {/* section jadwal penugasan */}
      <CardComponents>
        <p>Jadwal Penugasan</p>
        <hr />
        <section className="grid grid-cols-2 gap-3">
          <div>
            <p>Rencana Mulai Penugasan</p>
            <h3>01/09/2024</h3>
          </div>
          <div>
            <p>Rencana Penerbitan Laporan</p>
            <h3>30/09/2024</h3>
          </div>
        </section>
      </CardComponents>
      {/* section tujuan dan tim */}
      <section className="grid grid-cols-2 gap-3">
        <CardComponents>
          <p className="font-medium">Tujuan/Sasaran</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            nemo dicta esse adipisci rem architecto natus vel, est ipsum
            cupiditate.
          </p>
        </CardComponents>
        <CardComponents>
          <p className="font-medium">Tim</p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam,
            magnam.
          </p>
        </CardComponents>
      </section>
      {/* section hari kerja */}
      <CardComponents>
        <p>Hari Penugasan</p>
        <section className="flex justify-start items-start gap-3">
          <div className="w-1/5">
            <small>Jumlah</small>
            <h2 className="text-2xl font-extrabold">300</h2>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <small>Penanggung Jawab</small>
                <h3>25</h3>
              </div>
              <div>
                <small>Wakil Penanggung Jawab</small>
                <h3>34</h3>
              </div>
              <div>
                <small>Dalnis/Supervisor</small>
                <h3>10</h3>
              </div>
              <div>
                <small>Ketua Tim</small>
                <h3>98</h3>
              </div>
              <div>
                <small>Anggota Tim</small>
                <h3>25</h3>
              </div>            
            </div>
          </div>
        </section>
      </CardComponents>
      {/* data minor */}
      <section className="grid grid-cols-2 gap-3">
        <CardComponents>
          <p>Jumlah Laporan</p>
          <h3 className="text-xl">1 LHP</h3>
        </CardComponents>
        <CardComponents>
          <p>Keterangan</p>
          <h3 className="text-xl">Gabungan</h3>
        </CardComponents>
        <div className="col-span-2">
          <CardComponents>
            <p>Sarana & Prasarana</p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa non
              asperiores nisi voluptates aperiam magnam.
            </p>
          </CardComponents>
        </div>
      </section>
    </div>
  );
};

export default DetailPengawasan;
