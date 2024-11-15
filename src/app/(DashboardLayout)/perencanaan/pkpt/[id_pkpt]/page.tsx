import DailyActivity from '@/app/components/dashboard/DailyActivity';
import { CardComponents } from '@/app/components/Global/Card';
import { InputFiledComponent } from '@/app/components/Global/Input';
import { NotofikasiEdit } from '@/app/components/Global/Notif';

// Cara 1: Menggunakan props params
interface PageProps {
  params: {
    id_pkpt: number;
  };
}

const ViewPkptPage = ({ params }: PageProps) => {
  // Sekarang kita bisa menggunakan params.id_pkpt
  console.log('ID PKPT:', params.id_pkpt);
  const id_pkpt = params.id_pkpt;

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
        {/* tombol action */}
        <div className="space-x-3">
          <button className="py-1 px-2 bg-slate-300 rounded-md shadow-md">
            Hapus
          </button>
          <button className="py-1 px-2 bg-slate-300 rounded-md shadow-md">
            Edit
          </button>
        </div>
      </section>

      {/* persiapan data */}
      <section className="md:grid grid-cols-3 gap-3">
        <div className="col-span-2 space-y-3 order-2 md:order-1">
          <CardComponents>
            <section className="grid md:grid-cols-2 w-full gap-3">
              <InputFiledComponent
                label="Jenis Pengawasan"
                identiti="jpengawasan"
                type="text"
                name="JenisPengawasan"
                placeholder="Masukan Kategori Jenis Pengawasan"
              />
              <InputFiledComponent
                label="Area Pengawasan"
                identiti="area"
                type="text"
                name="AreaPengawasan"
                placeholder="Masukan Area Pengawasan"
              />
              <InputFiledComponent
                label="Ruang Lingkup"
                identiti="rLingkup"
                type="text"
                name="RuangLingkup"
                placeholder="Masukan Ruang Lingkup Pengawasan"
              />
              <InputFiledComponent
                label="Tujuan / Sasaran"
                identiti="tSasaran"
                type="text"
                name="TujuanSasaran"
                placeholder="Masukan Tujuan / Sasaran pengawasan"
              />
            </section>
          </CardComponents>
          {/* penjadwalan */}
          <CardComponents>
            <h3>Jadwal Pengawasan</h3>
            <section className="grid md:grid-cols-2 gap-3">
              <InputFiledComponent
                label="Rencana Penugasan"
                identiti="rPenugasan"
                type="date"
                name="RencanaPenugasan"
                placeholder="Tentukan rencana penugasan"
              />
              <InputFiledComponent
                label="Rencana Penerbitan"
                identiti="rPenerbitan"
                type="date"
                name="RencanaPenerbitan"
                placeholder="Tentukan rencana Penerbitan"
              />
            </section>
          </CardComponents>
        </div>
        {/* notif */}
        {/* <NotofikasiEdit data={dummyDummyNOtifikasi}/> */}
        <div className="order-1 md:order-2">
          <DailyActivity />
        </div>
      </section>

      {/* Hari Penugasan */}
      <CardComponents>
        <h3>Hari Penugasan</h3>
        <section className="grid md:grid-cols-2 gap-3">
          <InputFiledComponent
            label="Penanggung Jawab"
            identiti="penganggungJawab"
            type="text"
            name="PenanggungJawab"
            placeholder="Tentukan penanggung jawab"
          />
          <InputFiledComponent
            label="Wakil Penanggung Jawab"
            identiti="wPenanggungJawab"
            type="text"
            name="WakilPenanggungJawab"
            placeholder="Tentukan wakil penanggung jawab"
          />
          <InputFiledComponent
            label="Pengendali Teknis/Supervisor"
            identiti="pengendaliTeknis"
            type="text"
            name="Supervisor"
            placeholder="Tentukan pengendali teknis"
          />
          <InputFiledComponent
            label="Ketua TIM"
            identiti="ketuaTim"
            type="text"
            name="KetuaTIM"
            placeholder="Tentukan ketua tim"
          />
          <InputFiledComponent
            label="AnggotaTIM"
            identiti="ATim"
            type="text"
            name="ATim"
            placeholder="Masukan Anggota Tim"
          />
          <InputFiledComponent
            label="Jumlah"
            identiti="Jumlah"
            type="number"
            name="Jumlah"
            placeholder="Jumlah TIM"
          />
          <div className="col-span-2">
            <InputFiledComponent
              label="TIM"
              identiti="Tim"
              type="text"
              name="Tim"
              placeholder="Tentukan TIM"
            />
          </div>
        </section>
      </CardComponents>
      {/* optional data */}
      <CardComponents>
        <section className="md:grid md:grid-cols-2 gap-3">
          <InputFiledComponent
            label="Anggaran (Opsional)"
            identiti="Anggaran"
            type="number"
            name="Anggaran"
            placeholder="Masukan total anggaran"
          />
          <InputFiledComponent
            label="Jumlah Laporan"
            identiti="jLaporan"
            type="number"
            name="JumlahLaporan"
            placeholder="Masukan jumlah laporan"
          />
          <InputFiledComponent
            label="Saran dan Prasarana (Opsional)"
            identiti="sPrasarana"
            type="number"
            name="SaranaDanPrasarana"
            placeholder="Masukan Sarana dan Prasarana"
          />
          <InputFiledComponent
            label="Tingkat Risiko"
            identiti="tRisiko"
            type="text"
            name="TingkatRisiko"
            placeholder="Tentukan tingkat risiko"
          />
          <div className="md:col-span-2">
            <InputFiledComponent
              label="Keterangan (Opsional)"
              identiti="keterangan"
              type="text"
              name="Keterangan"
              placeholder="Masukan keterangan jika diperlukan"
            />
          </div>
        </section>
      </CardComponents>
    </div>
  );
};

export default ViewPkptPage;
