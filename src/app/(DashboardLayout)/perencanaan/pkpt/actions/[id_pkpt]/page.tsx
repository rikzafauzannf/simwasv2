'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DailyActivity from '@/app/components/dashboard/DailyActivity';
import { CardComponents } from '@/app/components/Global/Card';
import { InputFieldComponent } from '@/app/components/Global/Input';
import { NotofikasiEdit } from '@/app/components/Global/Notif';

// Cara 1: Menggunakan props params
interface PageProps {
  params: {
    id_pkpt: string;
  };
}

const ActionsPkptPage = ({ params }: PageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const id_pkpt = params.id_pkpt;

  // Dummy data - replace with your actual data fetching logic
  const defaultValues = {
    JenisPengawasan: 'Pengawasan Internal',
    AreaPengawasan: 'Area 1',
    RuangLingkup: 'Lingkup A',
    TujuanSasaran: 'Tujuan 1',
    RencanaPenugasan: '2024-03-20',
    RencanaPenerbitan: '2024-04-20',
    PenanggungJawab: 'John Doe',
    WakilPenanggungJawab: 'Jane Doe',
    Supervisor: 'Super Visor',
    KetuaTIM: 'Team Lead',
    ATim: 'Member 1',
    Jumlah: 5,
    Tim: 'Tim A',
    Anggaran: 1000000,
    JumlahLaporan: 3,
    SaranaDanPrasarana: 5,
    TingkatRisiko: 'Rendah',
    Keterangan: 'Keterangan tambahan',
  };

  const { register, handleSubmit } = useForm({
    defaultValues,
  });

  const onSubmit = (data: any) => {
    console.log('Updated data:', data);
    setIsEditing(false);
    // Add your update logic here
  };

  const dummyDummyNOtifikasi = [
    {
      username: 'reza',
      date: '12-11-2024 - 14.50 wib',
    },
    {
      username: 'reza',
      date: '12-11-2024 - 14.50 wib',
    },
    {
      username: 'reza',
      date: '12-11-2024 - 14.50 wib',
    },
    {
      username: 'reza',
      date: '12-11-2024 - 14.50 wib',
    },
    {
      username: 'reza',
      date: '12-11-2024 - 14.50 wib',
    },
  ];

  return (
    <div className="space-y-3">
      <section className="flex justify-between items-center">
        <h3>Lihat PKPT ({id_pkpt})</h3>
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
              <section className="grid md:grid-cols-2 w-full gap-3">
                <InputFieldComponent
                  label="Jenis Pengawasan"
                  identiti="jpengawasan"
                  type="text"
                  name="JenisPengawasan"
                  placeholder="Masukan Kategori Jenis Pengawasan"
                  register={register('JenisPengawasan')}
                  disabled={!isEditing}
                />
                <InputFieldComponent
                  label="Area Pengawasan"
                  identiti="area"
                  type="text"
                  name="AreaPengawasan"
                  placeholder="Masukan Area Pengawasan"
                  register={register('AreaPengawasan')}
                  disabled={!isEditing}
                />
                <InputFieldComponent
                  label="Ruang Lingkup"
                  identiti="rLingkup"
                  type="text"
                  name="RuangLingkup"
                  placeholder="Masukan Ruang Lingkup Pengawasan"
                  register={register('RuangLingkup')}
                  disabled={!isEditing}
                />
                <InputFieldComponent
                  label="Tujuan / Sasaran"
                  identiti="tSasaran"
                  type="text"
                  name="TujuanSasaran"
                  placeholder="Masukan Tujuan / Sasaran pengawasan"
                  register={register('TujuanSasaran')}
                  disabled={!isEditing}
                />
              </section>
            </CardComponents>

            <CardComponents>
              <h3>Jadwal Pengawasan</h3>
              <section className="grid md:grid-cols-2 gap-3">
                <InputFieldComponent
                  label="Rencana Penugasan"
                  identiti="rPenugasan"
                  type="date"
                  name="RencanaPenugasan"
                  placeholder="Tentukan rencana penugasan"
                  register={register('RencanaPenugasan')}
                  disabled={!isEditing}
                />
                <InputFieldComponent
                  label="Rencana Penerbitan"
                  identiti="rPenerbitan"
                  type="date"
                  name="RencanaPenerbitan"
                  placeholder="Tentukan rencana Penerbitan"
                  register={register('RencanaPenerbitan')}
                  disabled={!isEditing}
                />
              </section>
            </CardComponents>
          </div>
          <div className="order-1 md:order-2">
            <DailyActivity />
          </div>
        </section>

        <CardComponents>
          <h3>Hari Penugasan</h3>
          <section className="grid md:grid-cols-2 gap-3">
            <InputFieldComponent
              label="Penanggung Jawab"
              identiti="penganggungJawab"
              type="text"
              name="PenanggungJawab"
              placeholder="Tentukan penanggung jawab"
              register={register('PenanggungJawab')}
              disabled={!isEditing}
            />
            <InputFieldComponent
              label="Wakil Penanggung Jawab"
              identiti="wPenanggungJawab"
              type="text"
              name="WakilPenanggungJawab"
              placeholder="Tentukan wakil penanggung jawab"
              register={register('WakilPenanggungJawab')}
              disabled={!isEditing}
            />
            <InputFieldComponent
              label="Pengendali Teknis/Supervisor"
              identiti="pengendaliTeknis"
              type="text"
              name="Supervisor"
              placeholder="Tentukan pengendali teknis"
              register={register('Supervisor')}
              disabled={!isEditing}
            />
            <InputFieldComponent
              label="Ketua TIM"
              identiti="ketuaTim"
              type="text"
              name="KetuaTIM"
              placeholder="Tentukan ketua tim"
              register={register('KetuaTIM')}
              disabled={!isEditing}
            />
            <InputFieldComponent
              label="AnggotaTIM"
              identiti="ATim"
              type="text"
              name="ATim"
              placeholder="Masukan Anggota Tim"
              register={register('ATim')}
              disabled={!isEditing}
            />
            <InputFieldComponent
              label="Jumlah"
              identiti="Jumlah"
              type="number"
              name="Jumlah"
              placeholder="Jumlah TIM"
              register={register('Jumlah')}
              disabled={!isEditing}
            />
            <div className="col-span-2">
              <InputFieldComponent
                label="TIM"
                identiti="Tim"
                type="text"
                name="Tim"
                placeholder="Tentukan TIM"
                register={register('Tim')}
                disabled={!isEditing}
              />
            </div>
          </section>
        </CardComponents>

        <CardComponents>
          <section className="md:grid md:grid-cols-2 gap-3">
            <InputFieldComponent
              label="Anggaran (Opsional)"
              identiti="Anggaran"
              type="number"
              name="Anggaran"
              placeholder="Masukan total anggaran"
              register={register('Anggaran')}
              disabled={!isEditing}
            />
            <InputFieldComponent
              label="Jumlah Laporan"
              identiti="jLaporan"
              type="number"
              name="JumlahLaporan"
              placeholder="Masukan jumlah laporan"
              register={register('JumlahLaporan')}
              disabled={!isEditing}
            />
            <InputFieldComponent
              label="Saran dan Prasarana (Opsional)"
              identiti="sPrasarana"
              type="number"
              name="SaranaDanPrasarana"
              placeholder="Masukan Sarana dan Prasarana"
              register={register('SaranaDanPrasarana')}
              disabled={!isEditing}
            />
            <InputFieldComponent
              label="Tingkat Risiko"
              identiti="tRisiko"
              type="text"
              name="TingkatRisiko"
              placeholder="Tentukan tingkat risiko"
              register={register('TingkatRisiko')}
              disabled={!isEditing}
            />
            <div className="md:col-span-2">
              <InputFieldComponent
                label="Keterangan (Opsional)"
                identiti="keterangan"
                type="text"
                name="Keterangan"
                placeholder="Masukan keterangan jika diperlukan"
                register={register('Keterangan')}
                disabled={!isEditing}
              />
            </div>
          </section>
        </CardComponents>
      </form>
    </div>
  );
};

export default ActionsPkptPage;
