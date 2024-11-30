'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import DailyActivity from '@/app/components/dashboard/DailyActivity';
import { CardComponents } from '@/app/components/Global/Card';
import { InputFieldComponent, SelectInputField } from '@/app/components/Global/Input';
import { NotofikasiEdit } from '@/app/components/Global/Notif';
import { useTeamStore } from '@/middleware/Store/useTeamStore';
import { FaTrash } from 'react-icons/fa';
import { FirestoreService } from '@/services/firestore.service';
import { PKPTDataBase } from '@/interface/interfacePKPT';

// Cara 1: Menggunakan props params
interface PageProps {
  params: {
    id_pkpt: string;
  };
}

const ActionsPkptPage = ({ params }: PageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const id_pkpt = params.id_pkpt;
  const [newMember, setNewMember] = useState('');
  const { teamMembers, addTeamMember, removeTeamMember, resetTeamMembers } = useTeamStore();
  const [DataPKPT, setDataPKPT] = useState<PKPTDataBase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const firestoreService = new FirestoreService();
  
  // Initialize useForm with empty default values
  const { register, handleSubmit, reset, watch, setValue } = useForm();

  // Watch fields that affect the total
  const penanggungJawab = watch('PenanggungJawab');
  const wakilPenanggungJawab = watch('WakilPenanggungJawab');
  const supervisor = watch('Supervisor');
  const ketuaTim = watch('KetuaTIM');
  const aTim = watch('ATim');

  // Add options for JenisLaporan
  const optionsJenisLaporan = [
    { value: 'LHP', title: 'LHP' },
    { value: 'LHA', title: 'LHA' },
    { value: 'LHM', title: 'LHM' },
    { value: 'LHE', title: 'LHE' },
    { value: 'LHR', title: 'LHR' },
  ];

  // Add effect to calculate total automatically
  useEffect(() => {
    let total = 0;

    // Calculate total based on input values
    if (penanggungJawab) total += Number(penanggungJawab) || 0;
    if (wakilPenanggungJawab) total += Number(wakilPenanggungJawab) || 0;
    if (supervisor) total += Number(supervisor) || 0;
    if (ketuaTim) total += Number(ketuaTim) || 0;
    if (aTim) total += Number(aTim) || 0;

    // Set the total value
    setValue('Jumlah', total);
  }, [penanggungJawab, wakilPenanggungJawab, supervisor, ketuaTim, aTim, setValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await firestoreService.getDataById('pkpt', id_pkpt);
        if (response.success && response.data) {
          const datapkpt = response.data as PKPTDataBase;
          setDataPKPT([datapkpt]);
          
          // Parse jumlah_laporan to separate number and type
          const [jumlahLaporan, jenisLaporan] = datapkpt.jumlah_laporan.split(' - ');
          
          // Reset form with modified values
          reset({
            JenisPengawasan: datapkpt.jenis_pengawasan,
            AreaPengawasan: datapkpt.area_pengawasan,
            RuangLingkup: datapkpt.ruang_lingkup,
            TujuanSasaran: datapkpt.tujuan_sasaran,
            RencanaPenugasan: datapkpt.rencana_penugasan,
            RencanaPenerbitan: datapkpt.rencana_penerbitan,
            PenanggungJawab: datapkpt.penanggung_jawab,
            WakilPenanggungJawab: datapkpt.wakil_penanggung_jawab,
            Supervisor: datapkpt.pengendali_teknis,
            KetuaTIM: datapkpt.ketua_tim,
            ATim: datapkpt.anggota_tim,
            Jumlah: datapkpt.jumlah,
            Tim: datapkpt.tim,
            Anggaran: datapkpt.anggaran,
            JumlahLaporan: jumlahLaporan,
            JenisLaporan: jenisLaporan,
            SaranaDanPrasarana: datapkpt.sarana_prasarana || '',
            TingkatRisiko: datapkpt.tingkat_risiko,
            Keterangan: datapkpt.keterangan,
          });

          // Initialize team members
          resetTeamMembers();
          datapkpt.tim?.forEach(member => {
            addTeamMember(member.name);
          });
          
          setError(null);
        } else {
          setError(new Error(response.message));
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [reset, resetTeamMembers, addTeamMember]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const onSubmit = async (data: any) => {
    try {
      // Prepare the updated data
      const updatedData = {
        jenis_pengawasan: data.JenisPengawasan,
        area_pengawasan: data.AreaPengawasan,
        ruang_lingkup: data.RuangLingkup,
        tujuan_sasaran: data.TujuanSasaran,
        rencana_penugasan: data.RencanaPenugasan,
        rencana_penerbitan: data.RencanaPenerbitan,
        penanggung_jawab: Number(data.PenanggungJawab),
        wakil_penanggung_jawab: Number(data.WakilPenanggungJawab),
        pengendali_teknis: Number(data.Supervisor),
        ketua_tim: Number(data.KetuaTIM),
        anggota_tim: Number(data.ATim),
        jumlah: Number(data.Jumlah),
        tim: teamMembers,
        anggaran: data.Anggaran ? Number(data.Anggaran) : null,
        jumlah_laporan: `${data.JumlahLaporan} - ${data.JenisLaporan}`,
        sarana_prasarana: data.SaranaDanPrasarana || '',
        tingkat_risiko: data.TingkatRisiko,
        keterangan: data.Keterangan || null,
        // Maintain existing metadata
        id_user: DataPKPT[0].id_user,
        createdAt: DataPKPT[0].createdAt,
        status: DataPKPT[0].status,
        active: DataPKPT[0].active,
      };

      // Update the document in Firestore
      const result = await firestoreService.updateData('pkpt', id_pkpt, updatedData);

      if (result.success) {
        setIsEditing(false);
        // Optionally show success message
        alert('Data berhasil diperbarui');
        // Refresh the data
        window.location.reload();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error updating PKPT:', error);
      alert('Gagal memperbarui data PKPT');
    }
  };

  // Add delete functionality
  const handleDelete = async () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus PKPT ini?')) {
      try {
        const result = await firestoreService.deleteData('pkpt', id_pkpt);
        if (result.success) {
          alert('PKPT berhasil dihapus');
          // Redirect to PKPT list page
          window.location.href = '/perencanaan/pkpt';
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error('Error deleting PKPT:', error);
        alert('Gagal menghapus PKPT');
      }
    }
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

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMember.trim()) {
      addTeamMember(newMember.trim());
      setNewMember('');
    }
  };

  // Replace the existing Tim input field with this new team section
  const teamSection = (
    <div className="col-span-2">
      <div className="flex flex-col space-y-2">
        <label htmlFor="Tim" className="text-slate-800">
          TIM [{teamMembers.length}]
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
            placeholder="Masukkan nama anggota tim"
            className="border border-b-2 border-t-0 border-l-0 border-r-0 shadow-md border-slate-600 text-black bg-slate-200/25 flex-1"
            disabled={!isEditing}
          />
          <button
            onClick={handleAddMember}
            type="button"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-lightprimary disabled:bg-gray-400"
            disabled={!isEditing}
          >
            Tambah
          </button>
        </div>
      </div>

      {/* Display Team Members */}
      <div className="mt-4 space-y-2">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between bg-slate-100 p-2 rounded-md"
          >
            <span className="text-slate-800">{member.name}</span>
            {isEditing && (
              <button
                onClick={() => removeTeamMember(member.id)}
                type="button"
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-3">
      <section className="flex justify-between items-center">
        <h3>Lihat PKPT ({id_pkpt})</h3>
        <div className="space-x-3">
          <button 
            onClick={handleDelete}
            className="py-1 px-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
          >
            Hapus
          </button>
          {isEditing ? (
            <button
              onClick={handleSubmit(onSubmit)}
              className="py-1 px-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
            >
              Simpan
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="py-1 px-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
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
                <SelectInputField
                  label="Jenis Pengawasan"
                  identiti="select-field-pengawasan"
                  options={optionsJenisLaporan}
                  register={register('JenisPengawasan')}
                  placeholder="Pilih Jenis Pengawasan"
                  disabled={!isEditing}
                  type="select"
                  name="JenisPengawasan"
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
              type="number"
              name="PenanggungJawab"
              placeholder="Masukkan jumlah penanggung jawab"
              register={register('PenanggungJawab')}
              disabled={!isEditing}
            />
            <InputFieldComponent
              label="Wakil Penanggung Jawab"
              identiti="wPenanggungJawab"
              type="number"
              name="WakilPenanggungJawab"
              placeholder="Masukkan jumlah wakil penanggung jawab"
              register={register('WakilPenanggungJawab')}
              disabled={!isEditing}
            />
            <InputFieldComponent
              label="Pengendali Teknis/Supervisor"
              identiti="pengendaliTeknis"
              type="number"
              name="Supervisor"
              placeholder="Tentukan jumlah pengendali teknis"
              register={register('Supervisor')}
              disabled={!isEditing}
            />
            <InputFieldComponent
              label="Ketua TIM"
              identiti="ketuaTim"
              type="number"
              name="KetuaTIM"
              placeholder="Tentukan jumlah ketua tim"
              register={register('KetuaTIM')}
              disabled={!isEditing}
            />
            <InputFieldComponent
              label="AnggotaTIM"
              identiti="ATim"
              type="number"
              name="ATim"
              placeholder="Masukan jumlah Anggota Tim"
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
              disabled={true}
            />
            {teamSection}
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
            <div className="flex justify-start items-baseline gap-3">
              <div className="flex-1">
                <InputFieldComponent
                  label="Jumlah Laporan"
                  identiti="jLaporan"
                  type="number"
                  name="JumlahLaporan"
                  placeholder="Masukan jumlah laporan"
                  register={register('JumlahLaporan')}
                  disabled={!isEditing}
                />
              </div>
              <SelectInputField
                label="Jenis Laporan"
                identiti="select-field"
                options={optionsJenisLaporan}
                register={register('JenisLaporan')}
                placeholder="Pilih Jenis Laporan"
                disabled={!isEditing}
                type="select"
                name="JenisLaporan"
              />
            </div>
            <InputFieldComponent
              label="Sarana dan Prasarana (Opsional)"
              identiti="sPrasarana"
              type="text"
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
