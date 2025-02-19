'use client';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CardComponents } from '@/app/components/Global/Card';
import { ButtonType } from '@/app/components/Global/Button';
import { useTeamStore } from '@/middleware/Store/useTeamStore';
import { FaTrash } from 'react-icons/fa';
import {
  PKPTData,
  PKPTDataBase,
  PKPTFormData,
} from '@/interface/interfacePKPT';
import { AxiosService } from '@/services/axiosInstance.service';
import { useScopeStore } from '@/middleware/Store/useScopeStore';
import { useAuthStore } from '@/middleware/Store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useOptions } from '@/data/selectValue';
import { useGetNameUser } from '@/hooks/useGetName';
import {
  InputFieldComponent,
  SelectInputField,
} from '@/app/components/Global/Input';
import { useFetchById } from '@/hooks/useFetchById';

const axiosSecvice = new AxiosService();

interface PageProps {
  params: {
    id_pkpt?: number;
  };
}

const ActiontPKPTPage: React.FC<PageProps> = ({ params }) => {
  const { user } = useAuthStore();
  const router = useRouter();
  const { getNameUser } = useGetNameUser();
  const { data: DataPKPT } = useFetchById<PKPTDataBase>(
    'pkpt',
    Number(params.id_pkpt)
  );
  console.log('Data FROM DB : ', DataPKPT);

  const {
    optionsDataUser,
    optionsJenisAudit,
    optionsJenisLaporan,
    optionsJenisPengawasan,
    optionsRuangLingkup,
    optionsTingkatRisiko,
    potentialMembers,
    potentialScopes,
  } = useOptions();

  const [isLoading, setIsLoading] = React.useState(true);
  const [isDataLoaded, setIsDataLoaded] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PKPTFormData>({
    defaultValues: {},
    mode: 'onBlur',
  });

  const { teamMembers, addTeamMember, removeTeamMember, resetTeamMembers } =
    useTeamStore();
  const [newMemberId, setNewMemberId] = React.useState<number | string>('');

  React.useEffect(() => {
    if (DataPKPT && !isDataLoaded) {
      setIsDataLoaded(true);

      reset({
        area_pengawasan: DataPKPT.area_pengawasan || '',
        id_jenis_pengawasan: DataPKPT.id_jenis_pengawasan
          ? Number(DataPKPT.id_jenis_pengawasan)
          : undefined,
        id_ruang_lingkup: DataPKPT.id_ruang_lingkup
          ? Number(DataPKPT.id_ruang_lingkup)
          : undefined,
        tujuan_sasaran: DataPKPT.tujuan_sasaran || '',
        rmp_pkpt: DataPKPT.rmp_pkpt || '',
        rpl_pkpt: DataPKPT.rpl_pkpt || '',
        penanggung_jawab: DataPKPT.penanggung_jawab || '',
        wakil_penanggung_jawab: DataPKPT.wakil_penanggung_jawab || '',
        pengendali_teknis: DataPKPT.pengendali_teknis || '',
        ketua_tim: DataPKPT.ketua_tim || '',
        anggota_tim: DataPKPT.anggota_tim || '',
        nama_penanggung_jawab: DataPKPT.nama_penanggung_jawab || '',
        nama_wakil_penanggung_jawab: DataPKPT.nama_wakil_penanggung_jawab || '',
        nama_pengendali_teknis: DataPKPT.nama_pengendali_teknis || '',
        nama_ketua_tim: DataPKPT.nama_ketua_tim || '',
        jumlah: DataPKPT.jumlah || 0,
        anggaran: DataPKPT.anggaran || '',
        jumlah_laporan: DataPKPT.jumlah_laporan || 0,
        id_jenis_laporan: DataPKPT.id_jenis_laporan
          ? Number(DataPKPT.id_jenis_laporan)
          : undefined,
        sarana_prasarana: DataPKPT.sarana_prasarana || '',
        id_tingkat_resiko: DataPKPT.id_tingkat_resiko
          ? Number(DataPKPT.id_tingkat_resiko)
          : undefined,
        keterangan: DataPKPT.keterangan || '',
      });

      setIsLoading(false);
    }
  }, [DataPKPT, reset, isDataLoaded]);

  React.useEffect(() => {
    if (DataPKPT && isDataLoaded) {
      resetTeamMembers();
      if (DataPKPT.nama_anggota_tim) {
        const memberIds = DataPKPT.nama_anggota_tim
          .split(',')
          .map((id) => id.trim())
          .filter(Boolean);
        memberIds.forEach((id) => {
          const member = potentialMembers.find((m) => m.id === Number(id));
          if (member) {
            addTeamMember({ id: member.id, name: member.name });
          }
        });
      }
    }
  }, [
    DataPKPT,
    isDataLoaded,
    resetTeamMembers,
    addTeamMember,
    potentialMembers,
  ]);

  console.log('data dari team: ', teamMembers);

  const { scopes, addScope, removeScope } = useScopeStore();
  const [newScopeId, setNewScopeId] = React.useState<number | string>('');

  console.log('data dari scope: ', scopes);

  const onSubmit: SubmitHandler<PKPTFormData> = async (data) => {
    try {
      const dataTim = `PT: ${getNameUser(Number(data.nama_pengendali_teknis))} | KT: ${getNameUser(Number(data.nama_ketua_tim))} | AT: ${teamMembers.map((item) => getNameUser(Number(item.id))).join(', ')} `;
      const pkptData: PKPTFormData = {
        id_jenis_pengawasan: Number(data.id_jenis_pengawasan),
        tujuan_sasaran: data.tujuan_sasaran,
        area_pengawasan: data.area_pengawasan,
        id_ruang_lingkup: Number(data.id_ruang_lingkup),
        rmp_pkpt: data.rmp_pkpt,
        rpl_pkpt: data.rpl_pkpt,
        penanggung_jawab: data.penanggung_jawab,
        wakil_penanggung_jawab: data.wakil_penanggung_jawab,
        pengendali_teknis: data.pengendali_teknis,
        ketua_tim: data.ketua_tim,
        anggota_tim: data.anggota_tim,
        nama_penanggung_jawab: data.nama_penanggung_jawab,
        nama_wakil_penanggung_jawab: data.nama_wakil_penanggung_jawab,
        nama_pengendali_teknis: data.nama_pengendali_teknis,
        nama_ketua_tim: data.nama_ketua_tim,
        nama_anggota_tim: teamMembers.map((item) => item.id).join(', '),
        tim: dataTim,
        jumlah: Number(data.jumlah),
        anggaran: data.anggaran,
        jumlah_laporan: Number(data.jumlah_laporan),
        id_jenis_laporan: Number(data.id_jenis_laporan),
        sarana_prasarana: data.sarana_prasarana,
        id_tingkat_resiko: Number(data.id_tingkat_resiko),
        keterangan: data.keterangan,
        status: String(DataPKPT?.status),
        id_user: Number(user?.id_user),
      };

      if (!pkptData.nama_penanggung_jawab || !pkptData.nama_ketua_tim) {
        throw new Error('Data nama penanggung jawab dan ketua tim harus diisi');
      }

      console.log('Data yang dikirim:', pkptData);
      const result = await axiosSecvice.updateData(
        `/pkpt/${params.id_pkpt}`,
        pkptData
      );

      console.log('Respons dari server:', result);

      if (result.success) {
        console.log(`${String(DataPKPT?.status)} berhasil disimpan:`, result);
        reset();
        alert(`Data ${String(DataPKPT?.status)} berhasil disimpan`);
        resetTeamMembers();
        router.push('/dashboard/perencanaan/pkpt');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(`Gagal menyimpan data ${String(DataPKPT?.status)}`);
    }
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMemberId) {
      const selectedMember = potentialMembers.find(
        (member) => member.id === Number(newMemberId)
      );
      if (selectedMember) {
        // Check if member already exists in the team
        const memberExists = teamMembers.some(
          (member) => member.id === selectedMember.id
        );
        if (!memberExists) {
          addTeamMember({ id: selectedMember.id, name: selectedMember.name });
          setNewMemberId('');
        } else {
          alert('Anggota tim sudah ada dalam daftar');
        }
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

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Data PKPT */}
          <CardComponents>
            <h3 className="capitalize">Data {DataPKPT?.status}</h3>
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
              />

              {/* <div className="md:col-span-2"> */}
              <InputFieldComponent
                label="Tujuan / Sasaran"
                identiti="tSasaran"
                type="text"
                name="TujuanSasaran"
                placeholder="Masukan Tujuan / Sasaran pengawasan"
                register={register('tujuan_sasaran')}
                error={errors.tujuan_sasaran}
              />
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
              />
            </section>
          </CardComponents>

          {/* Hari Penugasan */}
          <CardComponents>
            <div className="flex justify-between items-center gap-3">
              <h3>Hari Penugasan</h3>
              <InputFieldComponent
                label="Total Hari"
                identiti="Jumlah"
                type="number"
                name="Jumlah"
                placeholder="Total Jumlah"
                register={register('jumlah')}
                error={errors.jumlah}
                disabled={true}
              />
            </div>

            <section className="grid md:grid-cols-2 gap-3 w-full">
              <div className="flex justify-start items-start gap-2 flex-nowrap w-full">
                <div className="basis-20">
                  <InputFieldComponent
                    label="HP"
                    identiti="penganggungJawab"
                    type="number"
                    name="PenanggungJawab"
                    placeholder="^"
                    register={register('penanggung_jawab', {
                      required: 'Penanggung Jawab wajib diisi',
                      min: { value: 0, message: 'Tidak boleh negatif' },
                    })}
                    error={errors.penanggung_jawab}
                  />
                </div>

                <div className="basis-auto">
                  <SelectInputField
                    label="Penanggung Jawab"
                    identiti="nama_penanggung_jawab"
                    options={optionsDataUser}
                    register={register('nama_penanggung_jawab')}
                    placeholder="Pilih Penanggung Jawab"
                    error={errors.nama_penanggung_jawab}
                    type="select"
                    name="penanggung_jawab"
                    defaultValue={DataPKPT?.nama_penanggung_jawab || ''}
                  />
                </div>
              </div>
              <div className="flex justify-start items-start gap-2 flex-nowrap w-full">
                <div className="basis-20">
                  <InputFieldComponent
                    label="HP"
                    identiti="wPenanggungJawab"
                    type="number"
                    name="WakilPenanggungJawab"
                    placeholder="^"
                    register={register('wakil_penanggung_jawab', {
                      required: 'Wakil Penanggung Jawab wajib diisi',
                      min: { value: 0, message: 'Tidak boleh negatif' },
                    })}
                    error={errors.wakil_penanggung_jawab}
                  />
                </div>

                <div className="basis-auto">
                  <SelectInputField
                    label="Wakil Penanggung Jawab"
                    identiti="wakil_penanggung_jawab"
                    options={optionsDataUser}
                    register={register('nama_wakil_penanggung_jawab')}
                    placeholder="Pilih Wakil Penanggung Jawab"
                    error={errors.nama_wakil_penanggung_jawab}
                    type="select"
                    name="wakil_penanggung_jawab"
                  />
                </div>
              </div>
              <div className="flex justify-start items-start gap-2 flex-nowrap w-full">
                <div className="basis-20">
                  <InputFieldComponent
                    label="HP"
                    identiti="pengendaliTeknis"
                    type="number"
                    name="Supervisor"
                    placeholder="^"
                    register={register('pengendali_teknis', {
                      required: 'Pengendali Teknis Jawab wajib diisi',
                      min: { value: 0, message: 'Tidak boleh negatif' },
                    })}
                    error={errors.pengendali_teknis}
                  />
                </div>

                <div className="basis-auto">
                  <SelectInputField
                    label="Pengendali Teknis/Supervisor"
                    identiti="nama_pengendali_teknis"
                    options={optionsDataUser}
                    register={register('nama_pengendali_teknis')}
                    placeholder="Pilih Pengendali Teknis/Supervisor"
                    error={errors.nama_pengendali_teknis}
                    type="select"
                    name="pengendali_teknis"
                  />
                </div>
              </div>
              <div className="flex justify-start items-start gap-2">
                <div className="basis-20">
                  <InputFieldComponent
                    label="HP"
                    identiti="ketuaTim"
                    type="number"
                    name="KetuaTIM"
                    placeholder="^"
                    register={register('ketua_tim', {
                      required: 'Ketua TIM wajib diisi',
                      min: { value: 0, message: 'Tidak boleh negatif' },
                    })}
                    error={errors.ketua_tim}
                  />
                </div>
                <div className="basis-auto">
                  <SelectInputField
                    label="Ketua TIM"
                    identiti="nama_ketua_tim"
                    options={optionsDataUser}
                    register={register('nama_ketua_tim')}
                    placeholder="Pilih Ketua TIM"
                    error={errors.nama_ketua_tim}
                    type="select"
                    name="ketua_tim"
                  />
                </div>
              </div>

              <div className="flex justify-start items-start gap-2 col-span-2">
                <div className="basis-20">
                  <InputFieldComponent
                    label="HP"
                    identiti="ATim"
                    type="number"
                    name="ATim"
                    placeholder="^"
                    register={register('anggota_tim', {
                      required: 'Anggota TIM wajib diisi',
                      min: { value: 0, message: 'Tidak boleh negatif' },
                      // pattern: {
                      //   value: /^[a-zA-Z\s]*$/,
                      //   message: 'Hanya boleh berisi huruf dan spasi',
                      // },
                    })}
                    error={errors.anggota_tim}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col space-y-2 w-full">
                    <label
                      htmlFor="Tim"
                      className="text-slate-800 text-sm sm:text-base"
                    >
                      TIM [{teamMembers.length}]
                    </label>
                    <div className="flex flex-col sm:flex-row w-full space-y-2 sm:space-y-0 sm:space-x-2">
                      <select
                        value={newMemberId}
                        onChange={(e) => {
                          console.log('Selected value:', e.target.value);
                          setNewMemberId(e.target.value);
                        }}
                        className="border-b-2 border-t-0 border-l-0 border-r-0 shadow-md border-slate-600 text-black bg-slate-200/25 flex-1 px-2 py-1 text-sm sm:text-base"
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
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-lightprimary text-sm sm:text-base"
                      >
                        Tambah
                      </button>
                    </div>
                  </div>

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
              />
              <SelectInputField
                label="Tingkat Risiko"
                identiti="tRisiko"
                options={optionsTingkatRisiko}
                register={register('id_tingkat_resiko')}
                placeholder="Pilih Tingkat Risiko"
                error={errors.id_tingkat_resiko}
                type="select"
                name="TingkatRisiko"
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
                />
              </div>
            </section>
          </CardComponents>

          <section className="flex">
            {/* <ButtonType Text="Ulangi" type="reset" /> */}
            <ButtonType Text="Simpan Data" type="submit" />
          </section>
        </form>
      )}
    </>
  );
};

export default ActiontPKPTPage;
