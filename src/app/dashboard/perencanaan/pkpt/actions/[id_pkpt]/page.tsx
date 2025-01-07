'use client';
import React, { useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CardComponents } from '@/app/components/Global/Card';
import { useTeamStore } from '@/middleware/Store/useTeamStore';
import { FaTrash } from 'react-icons/fa';
import { title } from 'process';
import { FirestoreService } from '@/services/firestore.service';
import {
  PKPTData,
  PKPTDataBase,
  PKPTFormData,
} from '@/interface/interfacePKPT';
import {
  JenisLaporanDB,
  JenisPengawasanDB,
  RuangLingkupDB,
  TingkatResikoDB,
} from '@/interface/interfaceReferensi';
import { useFetch } from '@/hooks/useFetch';
import { AxiosService } from '@/services/axiosInstance.service';
import { useScopeStore } from '@/middleware/Store/useScopeStore';
import { UserManageDB } from '@/interface/interfaceUserManage';
import {
  InputFieldComponent,
  SelectInputField,
} from '@/app/components/Global/Input';
import { ButtonType } from '@/app/components/Global/Button';
import { useFetchById } from '@/hooks/useFetchById';
import { useGetNameUser } from '@/hooks/useGetName';
import { useRouter } from 'next/navigation';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';

interface PropsID {
  params: {
    id_pkpt: number;
  };
}
const axiosSecvice = new AxiosService();

const ActionPkptPage: React.FC<PropsID> = ({ params }) => {
  const router = useRouter();
  const { data: DataPKPT } = useFetchById<PKPTDataBase>(
    'pkpt',
    Number(params.id_pkpt)
  );
  console.log('Data FROM DB : ', DataPKPT);

  const { data: DataJenisLaporan } = useFetch<JenisLaporanDB>('jenis_laporan');

  const { data: DataPengawasan } =
    useFetch<JenisPengawasanDB>('jenis_pengawasan');

  const { data: DataTingkatRisiko } =
    useFetch<TingkatResikoDB>('tingkat_resiko');

  const { data: DataRuangLingkup } = useFetch<RuangLingkupDB>('ruang_lingkup');
  const { data: DataUser } = useFetch<UserManageDB>('pengguna');

  const optionsJenisLaporan = DataJenisLaporan.map((item) => ({
    value: String(item.id_jenis_laporan),
    title: `${item.jenis_laporan} - ${item.keterangan}`,
  }));

  const optionsJenisPengawasan = DataPengawasan.map((item) => ({
    value: String(item.id_jenis_pengawasan),
    title: item.jenis_pengawasan,
  }));

  const optionsTingkatRisiko = DataTingkatRisiko.map((item) => ({
    value: String(item.id_tingkat_resiko),
    title: item.tingkat_resiko,
  }));

  const optionsRuangLingkup = DataRuangLingkup.map((item) => ({
    value: String(item.id_ruang_lingkup),
    title: item.ruang_lingkup,
  }));

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PKPTFormData>({
    defaultValues: DataPKPT || {},
    mode: 'onBlur',
  });

  const { teamMembers, addTeamMember, removeTeamMember, resetTeamMembers } =
    useTeamStore();
  const [newMemberId, setNewMemberId] = React.useState<number | string>('');

  // const hasReset = useRef(false);

  React.useEffect(() => {
    // resetTeamMembers();

    if (DataPKPT) {
      reset(DataPKPT);
      // hasReset.current = true;
      const dataTIM = DataPKPT?.tim.split(',');
      if (dataTIM.length > 0) {
        dataTIM.forEach((member) => {
          // setNewMemberId(member)
          const selectedMember = potentialMembers.find(
            (m) => m.id === Number(member)
          );
          if (selectedMember) {
            addTeamMember({ id: selectedMember.id, name: selectedMember.name });
          }
        });
      }
    }
  }, [DataPKPT, reset, addTeamMember, setNewMemberId]);

  const potentialMembers = DataUser.map((item) => ({
    id: item.id_user,
    name: item.username,
  }));

  console.log('data dari team: ', teamMembers);

  const { scopes, addScope, removeScope } = useScopeStore();
  const [newScopeId, setNewScopeId] = React.useState<number | string>('');

  const potentialScopes = DataRuangLingkup.map((item) => ({
    id: item.id_ruang_lingkup,
    name: item.ruang_lingkup,
  }));

  console.log('data dari scope: ', scopes);

  const onSubmit: SubmitHandler<PKPTFormData> = async (data) => {
    try {
      const pkptData = {
        status: DataPKPT?.status,
        id_user: 2,
        anggaran: String(data.anggaran),
        anggota_tim: String(data.anggota_tim),
        area_pengawasan: data.area_pengawasan,
        id_jenis_laporan: Number(data.id_jenis_laporan),
        id_jenis_pengawasan: Number(data.id_jenis_pengawasan),
        id_ruang_lingkup: Number(data.id_ruang_lingkup),
        id_tingkat_resiko: Number(data.id_tingkat_resiko),
        jumlah: data.jumlah,
        jumlah_laporan: Number(data.jumlah_laporan),
        keterangan: data.keterangan,
        ketua_tim: String(data.ketua_tim),
        penanggung_jawab: String(data.penanggung_jawab),
        pengendali_teknis: String(data.pengendali_teknis),
        rmp_pkpt: data.rmp_pkpt,
        rpl_pkpt: data.rpl_pkpt,
        sarana_prasarana: data.sarana_prasarana,
        tim: teamMembers.map((item) => String(item.id)).join(','),
        tujuan_sasaran: data.tujuan_sasaran,
        wakil_penanggung_jawab: String(data.wakil_penanggung_jawab),
      };
      console.log('Data yang dikirim:', pkptData);
      const result = await axiosSecvice.updateData(
        `/pkpt/${params.id_pkpt}`,
        pkptData
      );

      console.log('Respons dari server:', result);

      if (result.success) {
        console.log('PKPT Berhasil disimpan:', result);
        reset();
        alert('Data PKPT Berhasil disimpan');
        resetTeamMembers();
        router.push('/dashboard/perencanaan/pkpt');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Gagal menyimpan data PKPT');
    }
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMemberId) {
      const selectedMember = potentialMembers.find(
        (member) => member.id === Number(newMemberId)
      );
      if (selectedMember) {
        addTeamMember({ id: selectedMember.id, name: selectedMember.name });
        setNewMemberId('');
      }
    }
  };

  const handleAddScope = (e: React.FormEvent) => {
    e.preventDefault();
    if (newScopeId) {
      const selectedScope = potentialScopes.find(
        (scope) => scope.id === Number(newScopeId)
      );
      if (selectedScope) {
        addScope({ id: selectedScope.id, name: selectedScope.name });
        setNewScopeId('');
      }
    }
  };

  // Watch semua field yang akan mempengaruhi jumlah
  const penanggungJawab = watch('penanggung_jawab');
  const wakilPenanggungJawab = watch('wakil_penanggung_jawab');
  const supervisor = watch('pengendali_teknis');
  const ketuaTim = watch('ketua_tim');
  const aTim = watch('anggota_tim');

  // Effect untuk menghitung jumlah otomatis
  React.useEffect(() => {
    let total = 0;

    // Hitung jumlah berdasarkan nilai yang diinput
    if (penanggungJawab) total += Number(penanggungJawab) || 0;
    if (wakilPenanggungJawab) total += Number(wakilPenanggungJawab) || 0;
    if (supervisor) total += Number(supervisor) || 0;
    if (ketuaTim) total += Number(ketuaTim) || 0;
    if (aTim) total += Number(aTim) || 0;

    // Set nilai jumlah
    setValue('jumlah', total);
  }, [
    penanggungJawab,
    wakilPenanggungJawab,
    supervisor,
    ketuaTim,
    aTim,
    setValue,
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const handleDelete = async () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus PKPT ini?')) {
      try {
        const result = await axiosSecvice.deleteData(`pkpt/${params.id_pkpt}`);

        if (result.success) {
          alert('PKPT berhasil dihapus');
          router.push('/dashboard/perencanaan/pkpt');
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error('Error deleting PKPT:', error);
        alert('Gagal menghapus PKPT');
      }
    }
  };

  return (
    <AuthRoleWrapper allowedRoles={['Perencana']}>
      <div className="flex justify-between items-center">
        <h3>Data PKPT</h3>
        <div className="space-x-3">
          <button
            onClick={handleDelete}
            className="py-1 px-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
          >
            Hapus
          </button>
          {isEditing ? (
            ''
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="py-1 px-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
            >
              Edit
            </button>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Data PKPT */}
        <CardComponents>
          <section className="grid md:grid-cols-2 w-full gap-3">
            <InputFieldComponent
              label="Area Pengawasan"
              identiti="area"
              type="text"
              name="AreaPengawasan"
              placeholder="Masukan Area Pengawasan"
              register={register('area_pengawasan', {
                required: 'Area Pengawasan wajib diisi',
              })}
              error={errors.area_pengawasan}
              disabled={!isEditing}
            />
            <SelectInputField
              label="Jenis Pengawasan"
              identiti="select-field-pengawasan"
              options={optionsJenisPengawasan}
              register={register('id_jenis_pengawasan')}
              placeholder="Pilih Jenis Pengawasan"
              error={errors.id_jenis_pengawasan}
              type="select"
              name="JenisPengawasan"
              disabled={!isEditing}
            />

            <SelectInputField
              label="Ruang Lingkup"
              identiti="select-field-rlingkup"
              options={optionsRuangLingkup}
              register={register('id_ruang_lingkup')}
              placeholder="Pilih Ruang Lingkup"
              error={errors.id_ruang_lingkup}
              type="select"
              name="ruangLingkup"
              disabled={!isEditing}
            />

            <div className="md:col-span-2">
              <InputFieldComponent
                label="Tujuan / Sasaran"
                identiti="tSasaran"
                type="text"
                name="TujuanSasaran"
                placeholder="Masukan Tujuan / Sasaran pengawasan"
                register={register('tujuan_sasaran')}
                error={errors.tujuan_sasaran}
                disabled={!isEditing}
              />
            </div>

            {/* <div className="md:col-span-2">
            <div className="flex flex-col space-y-2">
              <label htmlFor="RuangLingkup" className="text-slate-800">
                Ruang Lingkup [{scopes.length}]
              </label>
              <div className="flex gap-2 w-full justify-start flex-grow">
                <select
                  value={newScopeId}
                  onChange={(e) => setNewScopeId(e.target.value)}
                  className="border border-b-2 border-t-0 border-l-0 border-r-0 shadow-md border-slate-600 text-black bg-slate-200/25 flex-1"
                >
                  <option value="" disabled>
                    Select a scope
                  </option>
                  {potentialScopes.map((scope) => (
                    <option key={scope.id} value={scope.id}>
                      {scope.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAddScope}
                  type="button"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-lightprimary"
                >
                  Tambah
                </button>
              </div>
            </div>            
            <div className="mt-4 space-y-2 w-full">
              {scopes.map((scope, index) => (
                <div
                  key={scope.id}
                  className="flex items-center justify-between bg-slate-100 p-2 rounded-md"
                >
                  <span className="text-slate-800">{scope.name}</span>
                  <button
                    onClick={() => removeScope(index)}
                    type="button"
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div> */}
          </section>
        </CardComponents>

        {/* Jadwal Pengawasan */}
        <CardComponents>
          <h3>Jadwal Pengawasan</h3>
          <section className="grid md:grid-cols-2 gap-3">
            <InputFieldComponent
              label="Rencana Penugasan"
              identiti="rPenugasan"
              type="date"
              name="RencanaPenugasan"
              placeholder="Tentukan rencana penugasan"
              register={register('rmp_pkpt', {
                required: 'Rencana Penugasan wajib diisi',
              })}
              error={errors.rmp_pkpt}
              disabled={!isEditing}
            />
            <InputFieldComponent
              label="Rencana Penerbitan"
              identiti="rPenerbitan"
              type="date"
              name="RencanaPenerbitan"
              placeholder="Tentukan rencana Penerbitan"
              register={register('rpl_pkpt', {
                required: 'Rencana Penerbitan wajib diisi',
              })}
              error={errors.rpl_pkpt}
              disabled={!isEditing}
            />
          </section>
        </CardComponents>

        {/* Hari Penugasan */}
        <CardComponents>
          <h3>Hari Penugasan</h3>
          <section className="grid md:grid-cols-2 gap-3">
            <InputFieldComponent
              label="Penanggung Jawab"
              identiti="penganggungJawab"
              type="number"
              name="PenanggungJawab"
              placeholder="Masukkan jumlah penanggung jawab"
              register={register('penanggung_jawab', {
                required: 'Penanggung Jawab wajib diisi',
                min: { value: 0, message: 'Tidak boleh negatif' },
              })}
              error={errors.penanggung_jawab}
              disabled={!isEditing}
            />
            <InputFieldComponent
              label="Wakil Penanggung Jawab"
              identiti="wPenanggungJawab"
              type="number"
              name="WakilPenanggungJawab"
              placeholder="Masukkan jumlah wakil penanggung jawab"
              register={register('wakil_penanggung_jawab', {
                required: 'Wakil Penanggung Jawab wajib diisi',
                min: { value: 0, message: 'Tidak boleh negatif' },
              })}
              error={errors.wakil_penanggung_jawab}
              disabled={!isEditing}
            />
            <InputFieldComponent
              label="Pengendali Teknis/Supervisor"
              identiti="pengendaliTeknis"
              type="number"
              name="Supervisor"
              placeholder="Tentukan pengendali teknis"
              register={register('pengendali_teknis', {
                required: 'Supervisor wajib diisi',
                min: { value: 0, message: 'Tidak boleh negatif' },
                // pattern: {
                //   value: /^[a-zA-Z\s]*$/,
                //   message: 'Hanya boleh berisi huruf dan spasi',
                // },
              })}
              error={errors.pengendali_teknis}
              disabled={!isEditing}
            />
            <InputFieldComponent
              label="Ketua TIM"
              identiti="ketuaTim"
              type="number"
              name="KetuaTIM"
              placeholder="Tentukan ketua tim"
              register={register('ketua_tim', {
                required: 'Ketua TIM wajib diisi',
                min: { value: 0, message: 'Tidak boleh negatif' },
                // pattern: {
                //   value: /^[a-zA-Z\s]*$/,
                //   message: 'Hanya boleh berisi huruf dan spasi',
                // },
              })}
              error={errors.ketua_tim}
              disabled={!isEditing}
            />
            <InputFieldComponent
              label="AnggotaTIM"
              identiti="ATim"
              type="number"
              name="ATim"
              placeholder="Masukan Anggota Tim"
              register={register('anggota_tim', {
                required: 'Anggota TIM wajib diisi',
                min: { value: 0, message: 'Tidak boleh negatif' },
                // pattern: {
                //   value: /^[a-zA-Z\s]*$/,
                //   message: 'Hanya boleh berisi huruf dan spasi',
                // },
              })}
              error={errors.anggota_tim}
              disabled={!isEditing}
            />
            <InputFieldComponent
              label="Jumlah"
              identiti="Jumlah"
              type="number"
              name="Jumlah"
              placeholder="Total Jumlah"
              register={register('jumlah')}
              error={errors.jumlah}
              disabled={true}
            />
            <div className="md:col-span-2">
              <div className="flex flex-col space-y-2">
                <label htmlFor="Tim" className="text-slate-800">
                  TIM [{teamMembers.length}]
                </label>
                {isEditing ? (
                  <div className="flex gap-2 w-full justify-start flex-grow">
                    <select
                      value={newMemberId}
                      onChange={(e) => setNewMemberId(e.target.value)}
                      className="border border-b-2 border-t-0 border-l-0 border-r-0 shadow-md border-slate-600 text-black bg-slate-200/25 flex-1"
                    >
                      <option value="" disabled>
                        Select a team member
                      </option>
                      {potentialMembers.map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleAddMember}
                      type="button"
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-lightprimary"
                    >
                      Tambah
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </div>

              {/* Display Team Members */}
              <div className="mt-4 space-y-2 w-full">
                {teamMembers.map((member, index) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between bg-slate-100 p-2 rounded-md"
                  >
                    <span className="text-slate-800">{member.name}</span>
                    <button
                      onClick={() => removeTeamMember(index)}
                      type="button"
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </CardComponents>

        {/* Optional data */}
        <CardComponents>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InputFieldComponent
              label="Anggaran (Opsional)"
              identiti="Anggaran"
              type="number"
              name="Anggaran"
              placeholder="Masukan total anggaran"
              register={register('anggaran', {
                min: { value: 0, message: 'Anggaran tidak boleh negatif' },
                validate: (value) =>
                  !value ||
                  Number.isInteger(Number(value)) ||
                  'Anggaran harus berupa bilangan bulat',
              })}
              error={errors.anggaran}
              disabled={!isEditing}
            />
            <div className="grid md:grid-cols-3 gap-3 w-full">
              <InputFieldComponent
                label="Jumlah Laporan"
                identiti="jLaporan"
                type="number"
                name="JumlahLaporan"
                placeholder="Masukan jumlah laporan"
                register={register('jumlah_laporan', {
                  required: 'Jumlah Laporan wajib diisi',
                  min: { value: 1, message: 'Minimal 1 laporan' },
                  validate: (value) =>
                    Number.isInteger(Number(value)) ||
                    'Jumlah laporan harus berupa bilangan bulat',
                })}
                error={errors.jumlah_laporan}
                disabled={!isEditing}
              />
              <div className="md:col-span-2">
                <SelectInputField
                  label="Jenis Laporan"
                  identiti="select-field"
                  options={optionsJenisLaporan}
                  register={register('id_jenis_laporan')}
                  placeholder="Pilih Jenis Laporan"
                  error={errors.id_jenis_laporan}
                  type="select"
                  name="JenisLaporan"
                  disabled={!isEditing}
                />
              </div>
            </div>
            <InputFieldComponent
              label="Sarana dan Prasarana (Opsional)"
              identiti="sPrasarana"
              type="text"
              name="SaranaDanPrasarana"
              placeholder="Masukan Sarana dan Prasarana"
              register={register('sarana_prasarana')}
              error={errors.sarana_prasarana}
              disabled={!isEditing}
            />
            {/* <InputFieldComponent
            label="Tingkat Risiko"
            identiti="tRisiko"
            type="text"
            name="TingkatRisiko"
            placeholder="Tentukan tingkat risiko"
            register={register('TingkatRisiko', {
              required: 'Tingkat Risiko wajib diisi',
              pattern: {
                value: /^(Rendah|Sedang|Tinggi|Non-PBR)$/i,
                message:
                  'Tingkat risiko harus berupa: Rendah, Sedang, Tinggi atau Non-PBR',
              },
            })}
            error={errors.TingkatRisiko}
          /> */}
            <SelectInputField
              label="Tingkat Risiko"
              identiti="tRisiko"
              options={optionsTingkatRisiko}
              register={register('id_tingkat_resiko')}
              placeholder="Pilih Tingkat Risiko"
              error={errors.id_tingkat_resiko}
              type="select"
              name="TingkatRisiko"
              disabled={!isEditing}
            />
            <div className="md:col-span-2">
              <InputFieldComponent
                label="Keterangan (Opsional)"
                identiti="keterangan"
                type="text"
                name="Keterangan"
                placeholder="Masukan keterangan jika diperlukan"
                register={register('keterangan')}
                error={errors.keterangan}
                disabled={!isEditing}
              />
            </div>
          </section>
        </CardComponents>

        <section className="flex">
          {/* <ButtonType Text="Ulangi" type="reset" /> */}
          {isEditing ? <ButtonType Text="Edit Data" type="submit" /> : ''}
        </section>
      </form>
    </AuthRoleWrapper>
  );
};

export default ActionPkptPage;
