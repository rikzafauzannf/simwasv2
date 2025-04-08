'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DailyActivity from '@/app/components/dashboard/DailyActivity';
import { CardComponents } from '@/app/components/Global/Card';
import { InputFieldComponent } from '@/app/components/Global/Input';
import React from 'react';

interface PageProps {
  params: {
    id_realisasi: number;
  };
}

const ViewDataRealisasiPage = ({ params }: PageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const id = params.id_realisasi;

  const defaultValues = {
    PAudit: 'sa',
    JSuratTugas: 0,
    Bulan: 'november',
    NTglSp: 'dsa',
    WPenugasan: 'asd',
    TPemeriksa: 'dsa',
    PTeknis: 'sad',
    KTim: 'da',
    ATim: 'dsa',
    JObjekPengawasan: 0,
    JLaporan: 0,
  };

  const { register, handleSubmit } = useForm({
    defaultValues,
  });

  const onSubmit = (data: any) => {
    console.log('Updated data:', data);
    setIsEditing(false);
    // Add your update logic here
  };

  return (
    <div className="space-y-3">
      <section className="flex justify-between items-center">
        <h3>Detail Realisasi ({id})</h3>
        <div className="space-x-3">
          <button className="py-1 px-2 bg-red-500 text-white rounded-md shadow-md">
            Hapus
          </button>
          {isEditing ? (
            <button
              onClick={handleSubmit(onSubmit)}
              className="py-1 px-2 bg-green-500 text-white rounded-md shadow-md"
            >
              Simpan
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="py-1 px-2 bg-blue-500 text-white rounded-md shadow-md"
            >
              Edit
            </button>
          )}
        </div>
      </section>

      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="md:grid grid-cols-3 gap-3">
          <div className="col-span-2 space-y-3 order-2 md:order-1">
            <CardComponents>
              <h3 className="mb-3">Realisasi PKPT</h3>
              <div className="md:grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <InputFieldComponent
                    label="Program Audit / Kegiatan"
                    identiti="PAudit"
                    name="PAudit"
                    placeholder="Tentukan Program Audit"
                    type="text"
                    register={register('PAudit')}
                    disabled={!isEditing}
                  />
                </div>
                <InputFieldComponent
                  label="Jumlah Surat Tugas"
                  identiti="JSuratTugas"
                  name="JSuratTugas"
                  placeholder="Masukan Jumlah Surat Tugas"
                  type="number"
                  register={register('JSuratTugas')}
                  disabled={!isEditing}
                />
                <InputFieldComponent
                  label="Bulan"
                  identiti="Bulan"
                  name="Bulan"
                  placeholder="Tentukan Bulan"
                  type="text"
                  register={register('Bulan')}
                  disabled={!isEditing}
                />
                <InputFieldComponent
                  label="No/Tgl SP"
                  identiti="NTglSp"
                  name="NTglSp"
                  placeholder="Tentukan Nomor/Tanggal SP"
                  type="text"
                  register={register('NTglSp')}
                  disabled={!isEditing}
                />
                <InputFieldComponent
                  label="Waktu Penugasan"
                  identiti="WPenugasan"
                  name="WPenugasan"
                  placeholder="Tentukan waktu penugasan"
                  type="time"
                  register={register('WPenugasan')}
                  disabled={!isEditing}
                />
              </div>
            </CardComponents>
          </div>
          {/* <div className="order-1 md:order-2">
            <DailyActivity />
          </div> */}
        </section>
        <CardComponents>
          <h3 className="mb-3">TIM ST</h3>
          <div className="md:grid grid-cols-2 gap-3">
            <InputFieldComponent
              label="Tim Pemeriksa / Pelaksana Kegiatan"
              identiti="TPemeriksa"
              name="TPemeriksa"
              placeholder="Tentukan Tim Pemeriksa"
              type="text"
              register={register('TPemeriksa')}
              disabled={!isEditing}
            />
            <InputFieldComponent
              label="Pengendali Teknis / Supervisor"
              identiti="PTeknis"
              name="PTeknis"
              placeholder="Tentukan Pengendali Teknis"
              type="text"
              register={register('PTeknis')}
              disabled={!isEditing}
            />
            <InputFieldComponent
              label="Ketua TIM"
              identiti="KTim"
              name="KTim"
              placeholder="Tentukan Ketua TIM"
              type="text"
              register={register('KTim')}
              disabled={!isEditing}
            />
            <InputFieldComponent
              label="Anggota TIM"
              identiti="ATim"
              name="ATim"
              placeholder="Tentukan Anggota TIM"
              type="text"
              register={register('ATim')}
              disabled={!isEditing}
            />
          </div>
        </CardComponents>
        <CardComponents>
          <h3 className="mb-3">Jumlah Objek dan Laporan</h3>
          <div className="md:grid grid-cols-2 gap-3">
            <InputFieldComponent
              label="Jumlah Objek Pengawasan"
              identiti="JObjekPengawasan"
              name="JObjekPengawasan"
              placeholder="Tentukan Jumlah Objek Pengawasan"
              type="number"
              register={register('JObjekPengawasan')}
              disabled={!isEditing}
            />
            <InputFieldComponent
              label="Jumlah Laporan"
              identiti="JLaporan"
              name="JLaporan"
              placeholder="Tentukan Jumlah Laporan"
              type="number"
              register={register('JLaporan')}
              disabled={!isEditing}
            />
          </div>
        </CardComponents>
      </form>
    </div>
  );
};

export default ViewDataRealisasiPage;
