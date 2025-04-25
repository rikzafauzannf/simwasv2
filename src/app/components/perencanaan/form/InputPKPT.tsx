'use client';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CardComponents } from '../../Global/Card';
import { InputFieldComponent, SelectInputField } from '../../Global/Input';
import { ButtonType } from '../../Global/Button';
import { useTeamStore } from '@/middleware/Store/useTeamStore';
import { FaTrash, FaPlus, FaCalendarAlt, FaUserFriends } from 'react-icons/fa';
import { MdAssignment, MdSchedule, MdAttachMoney } from 'react-icons/md';
import { PKPTFormData } from '@/interface/interfacePKPT';
import { AxiosService } from '@/services/axiosInstance.service';
import { useScopeStore } from '@/middleware/Store/useScopeStore';
import { useAuthStore } from '@/middleware/Store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useOptions } from '@/data/selectValue';
import { useGetNameUser } from '@/hooks/useGetName';
import { motion } from 'framer-motion';
import { Button } from 'flowbite-react';

const axiosService = new AxiosService();

interface StatusProps {
  status?: string;
}

const InputPKPT: React.FC<StatusProps> = ({ status = 'pkpt' }) => {
  const { user } = useAuthStore();
  const router = useRouter();
  const { getNameUser } = useGetNameUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);
  const totalSections = 4;

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

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<PKPTFormData>({
    defaultValues: {
      area_pengawasan: '',
      keterangan: '',
      tujuan_sasaran: '',
      jumlah: 0,
    },
    mode: 'onChange',
  });

  const { teamMembers, addTeamMember, removeTeamMember, resetTeamMembers } =
    useTeamStore();
  const [newMemberId, setNewMemberId] = useState<number | string>('');

  const { scopes, addScope, removeScope } = useScopeStore();
  const [newScopeId, setNewScopeId] = useState<number | string>('');

  const onSubmit: SubmitHandler<PKPTFormData> = async (data) => {
    try {
      setIsSubmitting(true);
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
        status: status,
        id_user: Number(user?.id_user),
      };

      const result = await axiosService.addData('/pkpt', pkptData);

      if (result.success) {
        reset();
        showNotification(
          `Data ${status.toUpperCase()} berhasil disimpan!`,
          'success'
        );
        resetTeamMembers();
        router.push('/dashboard/pkpt');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showNotification(`Gagal menyimpan data ${status}`, 'error');
    } finally {
      setIsSubmitting(false);
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
          setNewMemberId(''); // Reset selected member after adding
          showNotification(
            `${selectedMember.name} berhasil ditambahkan ke tim`,
            'success'
          );
        } else {
          showNotification('Anggota tim sudah ada dalam daftar', 'warning');
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
        showNotification(
          `${selectedScope.name} berhasil ditambahkan ke ruang lingkup`,
          'success'
        );
      }
    }
  };

  // Notification system
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    visible: false,
  });

  const showNotification = (message: string, type: string) => {
    setNotification({ message, type, visible: true });
    setTimeout(() => {
      setNotification({ message: '', type: '', visible: false });
    }, 3000);
  };

  // Form navigation
  const nextSection = async () => {
    let fieldsToValidate: string[] = [];

    // Define which fields to validate based on current section
    switch (currentSection) {
      case 1:
        fieldsToValidate = [
          'area_pengawasan',
          'id_jenis_pengawasan',
          'id_ruang_lingkup',
          'tujuan_sasaran',
        ];
        break;
      case 2:
        fieldsToValidate = ['rmp_pkpt', 'rpl_pkpt'];
        break;
      case 3:
        fieldsToValidate = [
          'penanggung_jawab',
          'wakil_penanggung_jawab',
          'pengendali_teknis',
          'ketua_tim',
          'anggota_tim',
          'nama_penanggung_jawab',
          'nama_wakil_penanggung_jawab',
          'nama_pengendali_teknis',
          'nama_ketua_tim',
        ];
        break;
      default:
        break;
    }

    // Validate the fields for current section
    const isValid = await trigger(fieldsToValidate as any);

    if (isValid && currentSection < totalSections) {
      setCurrentSection((prev) => prev + 1);
    } else if (!isValid) {
      showNotification('Harap isi semua bidang wajib dengan benar', 'error');
    }
  };

  const prevSection = () => {
    if (currentSection > 1) {
      setCurrentSection((prev) => prev - 1);
    }
  };

  // Watch all fields that affect jumlah
  const penanggungJawab = watch('penanggung_jawab');
  const wakilPenanggungJawab = watch('wakil_penanggung_jawab');
  const supervisor = watch('pengendali_teknis');
  const ketuaTim = watch('ketua_tim');
  const aTim = watch('anggota_tim');

  // Effect to automatically calculate the total
  useEffect(() => {
    let total = 0;

    // Calculate total based on input values
    if (penanggungJawab) total += Number(penanggungJawab) || 0;
    if (wakilPenanggungJawab) total += Number(wakilPenanggungJawab) || 0;
    if (supervisor) total += Number(supervisor) || 0;
    if (ketuaTim) total += Number(ketuaTim) || 0;
    if (aTim) total += Number(aTim) || 0;

    // Set jumlah value
    setValue('jumlah', total);
  }, [
    penanggungJawab,
    wakilPenanggungJawab,
    supervisor,
    ketuaTim,
    aTim,
    setValue,
  ]);

  const renderProgressBar = () => {
    return (
      <div className="w-full mb-8">
        <div className="flex justify-between mb-2">
          {[...Array(totalSections)].map((_, index) => (
            <div
              key={index}
              className={`flex flex-col items-center`}
              onClick={() => {
                // Only allow going back or to completed sections
                if (index + 1 <= currentSection) {
                  setCurrentSection(index + 1);
                }
              }}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer
                  ${
                    index + 1 === currentSection
                      ? 'bg-primary text-white'
                      : index + 1 < currentSection
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200'
                  }`}
              >
                {index + 1}
              </div>
              <span
                className={`text-xs mt-1 ${index + 1 === currentSection ? 'text-primary font-medium' : 'text-gray-500'}`}
              >
                {index === 0
                  ? 'Data'
                  : index === 1
                    ? 'Jadwal'
                    : index === 2
                      ? 'Tim'
                      : 'Detail'}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${(currentSection / totalSections) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-6xl mx-auto"
    >
      {/* Progress Bar */}
      {renderProgressBar()}

      {/* Notification */}
      {notification.visible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            notification.type === 'success'
              ? 'bg-green-500'
              : notification.type === 'error'
                ? 'bg-red-500'
                : 'bg-yellow-500'
          } text-white`}
        >
          {notification.message}
        </motion.div>
      )}

      {/* Section 1: Data PKPT */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <CardComponents>
            <div className="flex items-center mb-4">
              <MdAssignment className="text-primary text-xl mr-2" />
              <h3 className="text-xl font-semibold capitalize">
                Data {status}
              </h3>
            </div>
            <section className="grid md:grid-cols-2 w-full gap-6">
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
                register={register('id_jenis_pengawasan', {
                  required: 'Jenis Pengawasan wajib diisi',
                })}
                placeholder="Pilih Jenis Pengawasan"
                error={errors.id_jenis_pengawasan}
                type="select"
                name="JenisPengawasan"
              />

              <SelectInputField
                label="Ruang Lingkup"
                identiti="select-field-rlingkup"
                options={optionsRuangLingkup}
                register={register('id_ruang_lingkup', {
                  required: 'Ruang Lingkup wajib diisi',
                })}
                placeholder="Pilih Ruang Lingkup"
                error={errors.id_ruang_lingkup}
                type="select"
                name="ruangLingkup"
              />

              <InputFieldComponent
                label="Tujuan / Sasaran"
                identiti="tSasaran"
                type="text"
                name="TujuanSasaran"
                placeholder="Masukan Tujuan / Sasaran pengawasan"
                register={register('tujuan_sasaran', {
                  required: 'Tujuan / Sasaran wajib diisi',
                })}
                error={errors.tujuan_sasaran}
              />
            </section>
          </CardComponents>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={nextSection}
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              Lanjut <span className="ml-2">→</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Section 2: Jadwal Pengawasan */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <CardComponents>
            <div className="flex items-center mb-4">
              <MdSchedule className="text-primary text-xl mr-2" />
              <h3 className="text-xl font-semibold">Jadwal Pengawasan</h3>
            </div>
            <section className="grid md:grid-cols-2 gap-6">
              <div className="relative">
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
                <FaCalendarAlt className="absolute right-3 top-9 text-gray-400" />
              </div>
              <div className="relative">
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
                <FaCalendarAlt className="absolute right-3 top-9 text-gray-400" />
              </div>
            </section>
          </CardComponents>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={prevSection}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors flex items-center"
            >
              <span className="mr-2">←</span> Kembali
            </button>
            <button
              type="button"
              onClick={nextSection}
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              Lanjut <span className="ml-2">→</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Section 3: Hari Penugasan */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <CardComponents>
            <div className="flex items-center mb-4">
              <FaUserFriends className="text-primary text-xl mr-2" />
              <h3 className="text-xl font-semibold">Tim Penugasan</h3>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mr-4">
                  <span className="text-primary font-bold text-lg">
                    {watch('jumlah') || 0}
                  </span>
                </div>
                <span className="text-blue-800 font-medium">
                  Total Hari Penugasan
                </span>
              </div>
            </div>

            <section className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-full sm:w-1/6">
                  <InputFieldComponent
                    label="HP"
                    identiti="penganggungJawab"
                    type="number"
                    name="PenanggungJawab"
                    placeholder="^"
                    register={register('penanggung_jawab', {
                      required: 'Wajib diisi',
                      min: { value: 0, message: 'Tidak boleh negatif' },
                    })}
                    error={errors.penanggung_jawab}
                  />
                </div>
                <div className="w-full sm:w-5/6">
                  <SelectInputField
                    label="Penanggung Jawab"
                    identiti="nama_penanggung_jawab"
                    options={optionsDataUser}
                    register={register('nama_penanggung_jawab', {
                      required: 'Wajib diisi',
                    })}
                    placeholder="Pilih Penanggung Jawab"
                    error={errors.nama_penanggung_jawab}
                    type="select"
                    name="penanggung_jawab"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-full sm:w-1/6">
                  <InputFieldComponent
                    label="HP"
                    identiti="wPenanggungJawab"
                    type="number"
                    name="WakilPenanggungJawab"
                    placeholder="^"
                    register={register('wakil_penanggung_jawab', {
                      required: 'Wajib diisi',
                      min: { value: 0, message: 'Tidak boleh negatif' },
                    })}
                    error={errors.wakil_penanggung_jawab}
                  />
                </div>
                <div className="w-full sm:w-5/6">
                  <SelectInputField
                    label="Wakil Penanggung Jawab"
                    identiti="wakil_penanggung_jawab"
                    options={optionsDataUser}
                    register={register('nama_wakil_penanggung_jawab', {
                      required: 'Wajib diisi',
                    })}
                    placeholder="Pilih Wakil Penanggung Jawab"
                    error={errors.nama_wakil_penanggung_jawab}
                    type="select"
                    name="wakil_penanggung_jawab"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-full sm:w-1/6">
                  <InputFieldComponent
                    label="HP"
                    identiti="pengendaliTeknis"
                    type="number"
                    name="Supervisor"
                    placeholder="^"
                    register={register('pengendali_teknis', {
                      required: 'Wajib diisi',
                      min: { value: 0, message: 'Tidak boleh negatif' },
                    })}
                    error={errors.pengendali_teknis}
                  />
                </div>
                <div className="w-full sm:w-5/6">
                  <SelectInputField
                    label="Pengendali Teknis/Supervisor"
                    identiti="nama_pengendali_teknis"
                    options={optionsDataUser}
                    register={register('nama_pengendali_teknis', {
                      required: 'Wajib diisi',
                    })}
                    placeholder="Pilih Pengendali Teknis/Supervisor"
                    error={errors.nama_pengendali_teknis}
                    type="select"
                    name="pengendali_teknis"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-full sm:w-1/6">
                  <InputFieldComponent
                    label="HP"
                    identiti="ketuaTim"
                    type="number"
                    name="KetuaTIM"
                    placeholder="^"
                    register={register('ketua_tim', {
                      required: 'Wajib diisi',
                      min: { value: 0, message: 'Tidak boleh negatif' },
                    })}
                    error={errors.ketua_tim}
                  />
                </div>
                <div className="w-full sm:w-5/6">
                  <SelectInputField
                    label="Ketua TIM"
                    identiti="nama_ketua_tim"
                    options={optionsDataUser}
                    register={register('nama_ketua_tim', {
                      required: 'Wajib diisi',
                    })}
                    placeholder="Pilih Ketua TIM"
                    error={errors.nama_ketua_tim}
                    type="select"
                    name="ketua_tim"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-full sm:w-1/6">
                    <InputFieldComponent
                      label="HP"
                      identiti="ATim"
                      type="number"
                      name="ATim"
                      placeholder="^"
                      register={register('anggota_tim', {
                        required: 'Wajib diisi',
                        min: { value: 0, message: 'Tidak boleh negatif' },
                      })}
                      error={errors.anggota_tim}
                    />
                  </div>
                  <div className="w-full sm:w-5/6">
                    <div className="flex flex-col space-y-2 w-full">
                      <label
                        htmlFor="Tim"
                        className="text-slate-800 font-medium"
                      >
                        Anggota Tim [{teamMembers.length}]
                      </label>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <select
                          value={newMemberId}
                          onChange={(e) => setNewMemberId(e.target.value)}
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary flex-1"
                        >
                          <option value="" disabled>
                            Pilih anggota tim
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
                          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                        >
                          <FaPlus className="mr-2" /> Tambah
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {teamMembers.map((member, index) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors"
                        >
                          <span className="text-slate-800">{member.name}</span>
                          <button
                            onClick={() => removeTeamMember(index)}
                            type="button"
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </CardComponents>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={prevSection}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors flex items-center"
            >
              <span className="mr-2">←</span> Kembali
            </button>
            <button
              type="button"
              onClick={nextSection}
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              Lanjut <span className="ml-2">→</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Section 4: Optional data */}
      {currentSection === 4 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <CardComponents>
            <div className="flex items-center mb-4">
              <MdAttachMoney className="text-primary text-xl mr-2" />
              <h3 className="text-xl font-semibold">Detail Tambahan</h3>
            </div>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div className="grid grid-cols-3 gap-3 w-full">
                <div className="col-span-1">
                  <InputFieldComponent
                    label="Jumlah Laporan"
                    identiti="jLaporan"
                    type="number"
                    name="JumlahLaporan"
                    placeholder="Jumlah"
                    register={register('jumlah_laporan', {
                      required: 'Wajib diisi',
                      min: { value: 1, message: 'Minimal 1 laporan' },
                      validate: (value) =>
                        Number.isInteger(Number(value)) ||
                        'Harus berupa bilangan bulat',
                    })}
                    error={errors.jumlah_laporan}
                  />
                </div>
                <div className="col-span-2">
                  <SelectInputField
                    label="Jenis Laporan"
                    identiti="select-field"
                    options={optionsJenisLaporan}
                    register={register('id_jenis_laporan', {
                      required: 'Jenis Laporan wajib diisi',
                    })}
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
                register={register('id_tingkat_resiko', {
                  required: 'Tingkat Risiko wajib diisi',
                })}
                placeholder="Pilih Tingkat Risiko"
                error={errors.id_tingkat_resiko}
                type="select"
                name="TingkatRisiko"
              />

              <div className="md:col-span-2">
                <div className="relative">
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
              </div>
            </section>
          </CardComponents>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={prevSection}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors flex items-center"
            >
              <span className="mr-2">←</span> Kembali
            </button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-green-600 hover:bg-green-700"
            >
              {isSubmitting
                ? 'Menyimpan...'
                : `Simpan Data ${status.toUpperCase()}`}
            </Button>
          </div>
        </motion.div>
      )}

      {/* Summary Section - Can be added if needed */}
      {/*
        {currentSection === 5 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CardComponents>
              <h3 className="text-xl font-semibold mb-4">Ringkasan Data</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                // Summary content here
              </div>
            </CardComponents>
            
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={prevSection}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Kembali
              </button>
              <ButtonType 
                Text={isSubmitting ? "Menyimpan..." : "Simpan Data"} 
                type="submit" 
                disabled={isSubmitting}
              />
            </div>
          </motion.div>
        )}
        */}
    </form>
  );
};

export default InputPKPT;
