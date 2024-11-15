import DailyActivity from '@/app/components/dashboard/DailyActivity';
import { CardComponents } from '@/app/components/Global/Card';
import { InputFiledComponent } from '@/app/components/Global/Input';
import React from 'react';

interface PageProps {
  params: {
    id_realisasi: number;
  };
}

const ViewDataRealisasiPage = ({ params }: PageProps) => {
  console.log('id page :', params.id_realisasi);
  const id = params.id_realisasi;
  return (
    <div className="space-y-3">
      <section className="flex justify-between items-center">
        <h3>Detail Realisasi ({id})</h3>
        <div className="space-x-3">
          <button className="py-1 px-2 bg-slate-300 rounded-md shadow-md">
            Hapus
          </button>
          <button className="py-1 px-2 bg-slate-300 rounded-md shadow-md">
            Edit
          </button>
        </div>
      </section>

      <section className="md:grid grid-cols-3 gap-3">
        {/* input realisasi pkpt */}
        <div className="col-span-2 space-y-3 order-2 md:order-1">
          <CardComponents>
            <h3 className="mb-3">Realisasi PKPT</h3>
            <div className="md:grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <InputFiledComponent
                  label="Program Audit / Kegiatan"
                  identiti="PAudit"
                  name="PAudit"
                  placeholder="Tentukan Program Audit"
                  type="text"
                />
              </div>
              <InputFiledComponent
                label="Jumlah Surat Tugas"
                identiti="JSuratTugas"
                name="JSuratTugas"
                placeholder="Masukan Jumlah Surat Tugas"
                type="number"
              />
              <InputFiledComponent
                label="Bulan"
                identiti="Bulan"
                name="Bulan"
                placeholder="Tentukan Bulan"
                type="text"
              />
              <InputFiledComponent
                label="No/Tgl SP"
                identiti="NTglSp"
                name="NTglSp"
                placeholder="Tentukan Nomor/Tanggal SP"
                type="text"
              />
              <InputFiledComponent
                label="Waktu Penugasan"
                identiti="WPenugasan"
                name="WPenugasan"
                placeholder="Tentukan waktu penugasan"
                type="time"
              />
            </div>
          </CardComponents>
        </div>
        <div className="order-1 md:order-2">
          <DailyActivity />
        </div>
      </section>
      {/* tim st */}
      <CardComponents>
        <h3 className="mb-3">TIM ST</h3>
        <div className="md:grid grid-cols-2 gap-3">
          <InputFiledComponent
            label="Tim Pemeriksa / Pelaksana Kegiatan"
            identiti="TPemeriksa"
            name="TPemeriksa"
            placeholder="Tentukan Tim Pemeriksa"
            type="text"
          />
          <InputFiledComponent
            label="Pengendali Teknis / Supervisor"
            identiti="PTeknis"
            name="PTeknis"
            placeholder="Tentukan Pengendali Teknis"
            type="text"
          />
          <InputFiledComponent
            label="Ketua TIM"
            identiti="KTim"
            name="KTim"
            placeholder="Tentukan Ketua TIM"
            type="text"
          />
          <InputFiledComponent
            label="Anggota TIM"
            identiti="ATim"
            name="ATim"
            placeholder="Tentukan Anggota TIM"
            type="text"
          />
        </div>
      </CardComponents>
      {/* jumlah objek laporan */}
      <CardComponents>
        <h3 className="mb-3">Jumlah Objek dan Laporan</h3>
        <div className="md:grid grid-cols-2 gap-3">
          <InputFiledComponent
            label="Jumlah Objek Pengawasan"
            identiti="JObjekPengawasan"
            name="JObjekPengawasan"
            placeholder="Tentukan Jumlah Objek Pengawasan"
            type="number"
          />
          <InputFiledComponent
            label="Jumlah Laporan"
            identiti="JLaporan"
            name="JLaporan"
            placeholder="Tentukan Jumlah Laporan"
            type="number"
          />
        </div>
      </CardComponents>
    </div>
  );
};

export default ViewDataRealisasiPage;
