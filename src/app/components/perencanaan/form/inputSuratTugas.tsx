'use client';
import React, { useState, useEffect } from 'react';
import {
  InputFieldComponent,
  SelectInputField,
  TextAreaFieldComponent,
} from '../../Global/Input';
import { ButtonType } from '../../Global/Button';
import { CardComponents } from '../../Global/Card';
import { useTeamStore } from '@/middleware/Store/useTeamStore';
import {
  FaTrash,
  FaUserPlus,
  FaCalendarAlt,
  FaClipboardList,
  FaUsers,
  FaFileAlt,
} from 'react-icons/fa';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  FormSuratTugas,
  SuratTugasData,
} from '@/interface/interfaceSuratTugas';
import { useFetch } from '@/hooks/useFetch';
import { JenisAuditDB, JenisLaporanDB } from '@/interface/interfaceReferensi';
import { AxiosService } from '@/services/axiosInstance.service';
import { UserManageDB } from '@/interface/interfaceUserManage';
import { useAuthStore } from '@/middleware/Store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useOptions } from '@/data/selectValue';
import { formatToLocalDate } from '@/data/formatData';
import { TbSend2 } from 'react-icons/tb';
import { Button } from 'flowbite-react';

interface PropsID {
  id_pkpt: number;
}

// Extended form interface to include uploadFile field
interface ExtendedFormSuratTugas extends FormSuratTugas {
  uploadFile?: FileList;
}

const axiosSecvice = new AxiosService();

const InputSuratTugas: React.FC<PropsID> = ({ id_pkpt }) => {
  const { user } = useAuthStore();
  const router = useRouter();

  const [uploadOption, setUploadOption] = useState('link');
  const [activeTab, setActiveTab] = useState('informasi');
  const [isFormValid, setIsFormValid] = useState(false);

  const { optionsDataUser, optionsJenisAudit, potentialMembers } = useOptions();

  const handleUploadOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUploadOption(event.target.value);
  };

  const { teamMembers, addTeamMember, removeTeamMember, resetTeamMembers } =
    useTeamStore();
  const [newMemberId, setNewMemberId] = React.useState<number | string>('');

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

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isValid, isDirty, dirtyFields, touchedFields },
  } = useForm<ExtendedFormSuratTugas>({
    defaultValues: {
      bulan: '',
      link_st: '',
    },
    mode: 'all',
  });

  // Watch all form fields to check if the form is valid
  const formValues = watch();

  // Check if all required fields are filled based on current tab
  useEffect(() => {
    const checkFormValidity = () => {
      // Required fields by tab
      const requiredFieldsByTab: Record<
        string,
        Array<keyof ExtendedFormSuratTugas | 'anggota_tim'>
      > = {
        informasi: [
          'bulan',
          'no_tglsp',
          'program_audit',
          'jumlah_hp',
          'waktu_awal',
          'waktu_akhir',
        ],
        tim: [
          'tim_pemeriksa',
          'wk_penanggung_jawab',
          'pengendali_teknis',
          'ketua_tim',
        ],
        audit: [
          'jumlah_objek',
          'jumlah_laporan',
          'id_jenis_audit',
          'keterangan',
        ],
        // dokumen: uploadOption === 'link' ? ['link_st'] : ['uploadFile'],
        dokumen: ['link_st'],
      };

      // Get all required fields across all tabs
      const allRequiredFields = [
        ...requiredFieldsByTab.informasi,
        ...requiredFieldsByTab.tim,
        ...requiredFieldsByTab.audit,
        ...requiredFieldsByTab.dokumen,
      ];

      // Check if all required fields are filled
      const allFieldsValid = allRequiredFields.every((field) => {
        // if (field === 'uploadFile' && uploadOption !== 'file') return true;
        if (field === 'link_st' && uploadOption !== 'link') return true;
        if (field === 'anggota_tim') return teamMembers.length > 0;

        const value = formValues[field];
        const fieldError = errors[field];

        return value !== undefined && value !== '' && !fieldError;
      });

      // Check if team members are added
      const hasTeamMembers = teamMembers.length > 0;

      setIsFormValid(allFieldsValid && hasTeamMembers && isValid);
    };

    checkFormValidity();
  }, [formValues, errors, isValid, teamMembers, uploadOption]);

  const onSubmit: SubmitHandler<ExtendedFormSuratTugas> = async (data) => {
    try {
      const dataST = {
        id_user: Number(user?.id_user),
        id_pkpt: Number(id_pkpt),
        anggota_tim: teamMembers.map((item) => String(item.id)).join(','),
        bulan: data.bulan,
        id_jenis_audit: Number(data.id_jenis_audit),
        jumlah_laporan: Number(data.jumlah_laporan),
        jumlah_objek: Number(data.jumlah_objek),
        keterangan: data.keterangan,
        ketua_tim: data.ketua_tim,
        link_st: data.link_st,
        no_tglsp: data.no_tglsp,
        pengendali_teknis: data.pengendali_teknis,
        program_audit: data.program_audit,
        tim_pemeriksa: data.tim_pemeriksa,
        waktu_penugasan: `${formatToLocalDate(data.waktu_awal)} - ${formatToLocalDate(data.waktu_akhir)}`,
        wk_penanggung_jawab: data.wk_penanggung_jawab,
        jumlah_hp: Number(data.jumlah_hp),
      };

      const result = await axiosSecvice.addData('/surat_tugas', dataST);

      if (result.success) {
        reset();
        alert('Data Surat Tugas berhasil disimpan');
        resetTeamMembers();
        router.push('/dashboard/surattugas');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Gagal menyimpan data Surat Tugas');
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary">
          Penginputan Rekap Surat Tugas
        </h2>
        <div className="h-1 bg-primary w-20 mt-2"></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            type="button"
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
              activeTab === 'informasi'
                ? 'bg-primary text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('informasi')}
          >
            <FaCalendarAlt /> Informasi Dasar
          </button>
          <button
            type="button"
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
              activeTab === 'tim'
                ? 'bg-primary text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('tim')}
          >
            <FaUsers /> Tim Pemeriksa
          </button>
          <button
            type="button"
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
              activeTab === 'audit'
                ? 'bg-primary text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('audit')}
          >
            <FaClipboardList /> Detail Audit
          </button>
          <button
            type="button"
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
              activeTab === 'dokumen'
                ? 'bg-primary text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('dokumen')}
          >
            <FaFileAlt /> Dokumen
          </button>
        </div>

        <CardComponents>
          {/* Informasi Dasar */}
          {activeTab === 'informasi' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
                <FaCalendarAlt className="mr-2" /> Informasi Dasar
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <InputFieldComponent
                  label="Bulan *"
                  identiti="Bulan"
                  name="bulan"
                  placeholder="Masukan Bulan Penugasan (Januari, Februari, dst)"
                  type="text"
                  register={register('bulan', {
                    required: 'Bulan harus diisi',
                    pattern: {
                      value:
                        /^(Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember)$/,
                      message:
                        'Format bulan tidak valid, contoh: Januari, Februari, Maret, dst.',
                    },
                  })}
                  error={errors.bulan}
                />
                <InputFieldComponent
                  label="No/Tgl.SP *"
                  identiti="noTgl"
                  name="noTgl"
                  placeholder="Masukan Nomor/TGL.SP"
                  type="text"
                  register={register('no_tglsp', {
                    required: 'Wajib mengisi NO/Tgl.Sp',
                  })}
                  error={errors.no_tglsp}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <InputFieldComponent
                  label="Program Audit/Kegiatan *"
                  identiti="programAudit"
                  name="programAudit"
                  placeholder="Masukan Program Audit"
                  type="text"
                  register={register('program_audit', {
                    required: 'Wajib untuk mengisi program audit',
                  })}
                  error={errors.program_audit}
                />
                <InputFieldComponent
                  label="Jumlah Hari Penugasan *"
                  identiti="jumlahHP"
                  name="jumlahHP"
                  placeholder="Tentukan jumlah hari penugasan"
                  type="number"
                  register={register('jumlah_hp', {
                    required: 'Jumlah Hari Penugasan wajib di isi',
                    min: {
                      value: 1,
                      message: 'Jumlah hari minimal 1',
                    },
                  })}
                  error={errors.jumlah_hp}
                />
              </div>

              <div className="space-y-4">
                <h4 className="text-base font-medium text-gray-700">
                  Waktu Penugasan *
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <InputFieldComponent
                    label="Tanggal Mulai *"
                    identiti="waktumulai"
                    name="waktumulai"
                    placeholder="Tentukan tanggal mulai"
                    type="date"
                    register={register('waktu_awal', {
                      required: 'Tanggal Mulai wajib di isi',
                    })}
                    error={errors.waktu_awal}
                  />
                  <InputFieldComponent
                    label="Tanggal Berakhir *"
                    identiti="waktu_akhir"
                    name="waktu_akhir"
                    placeholder="Tentukan Tanggal Berakhir"
                    type="date"
                    register={register('waktu_akhir', {
                      required: 'Tanggal Akhir wajib di isi',
                      validate: (value) => {
                        const startDate = new Date(watch('waktu_awal'));
                        const endDate = new Date(value);
                        return (
                          endDate >= startDate ||
                          'Tanggal berakhir harus setelah tanggal mulai'
                        );
                      },
                    })}
                    error={errors.waktu_akhir}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tim Pemeriksa */}
          {activeTab === 'tim' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
                <FaUsers className="mr-2" /> Tim Pemeriksa
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <SelectInputField
                  label="Tim Pemeriksa/Pelaksana Kegiatan *"
                  identiti="select-field-timpemeriksa"
                  options={optionsDataUser}
                  register={register('tim_pemeriksa', {
                    required: 'Tentukan tim audit',
                  })}
                  placeholder="Tentukan tim audit"
                  error={errors.tim_pemeriksa}
                  type="select"
                  name="tim_pemeriksa"
                />
                <SelectInputField
                  label="Irban/Wk.Penanggung Jawab *"
                  identiti="select-field-irban"
                  options={optionsDataUser}
                  register={register('wk_penanggung_jawab', {
                    required: 'Tentukan Irban/Wk.Penanggung Jawab',
                  })}
                  placeholder="Tentukan Irban/Wk.Penanggung Jawab"
                  error={errors.wk_penanggung_jawab}
                  type="select"
                  name="wk_penanggung_jawab"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <SelectInputField
                  label="Pengendali Teknis/Supervisor *"
                  identiti="select-field-pteknis"
                  options={optionsDataUser}
                  register={register('pengendali_teknis', {
                    required: 'Pengendali Teknis wajib diisi',
                  })}
                  placeholder="Tentukan Pengendali Teknis"
                  error={errors.pengendali_teknis}
                  type="select"
                  name="pengendaliTeknis"
                />
                <SelectInputField
                  label="Ketua Tim *"
                  identiti="select-field-ketua"
                  options={optionsDataUser}
                  register={register('ketua_tim', {
                    required: 'Masukan Ketua Tim',
                  })}
                  placeholder="Tentukan Ketua Tim"
                  error={errors.ketua_tim}
                  type="select"
                  name="ketua_tim"
                />
              </div>

              <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="Tim" className="text-slate-800 font-medium">
                    Anggota Tim *{' '}
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${teamMembers.length > 0 ? 'bg-primary text-white' : 'bg-red-500 text-white'}`}
                    >
                      {teamMembers.length}
                    </span>
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <select
                      value={newMemberId}
                      onChange={(e) => setNewMemberId(e.target.value)}
                      className="border rounded-md p-2 flex-1 shadow-sm focus:ring-2 focus:ring-primary focus:border-primary"
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
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-lightprimary transition-colors flex items-center justify-center gap-2"
                    >
                      <FaUserPlus /> Tambah
                    </button>
                  </div>
                  {teamMembers.length === 0 && (
                    <p className="text-red-500 text-sm">
                      Minimal satu anggota tim wajib ditambahkan
                    </p>
                  )}
                </div>

                {/* Display Team Members */}
                <div className="mt-4 space-y-2 w-full max-h-60 overflow-y-auto">
                  {teamMembers.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                      Belum ada anggota tim yang ditambahkan
                    </div>
                  ) : (
                    teamMembers.map((member, index) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between bg-white p-3 rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <span className="text-slate-800">{member.name}</span>
                        <button
                          onClick={() => removeTeamMember(index)}
                          type="button"
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Detail Audit */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
                <FaClipboardList className="mr-2" /> Detail Audit
              </h3>

              <div className="grid md:grid-cols-3 gap-6">
                <InputFieldComponent
                  label="Jumlah Objek Pengawasan *"
                  identiti="jumlahObjek"
                  name="jumlahObjek"
                  placeholder="Tentukan Jumlah Objek Pengawasan"
                  type="number"
                  register={register('jumlah_objek', {
                    min: {
                      value: 1,
                      message: 'Jumlah objek minimal 1',
                    },
                    required: 'Masukan jumlah objek',
                  })}
                  error={errors.jumlah_objek}
                />
                <InputFieldComponent
                  label="Jumlah Laporan *"
                  identiti="jumlahLaporan"
                  name="jumlahLaporan"
                  placeholder="Tentukan Jumlah Laporan"
                  type="number"
                  register={register('jumlah_laporan', {
                    min: {
                      value: 1,
                      message: 'Jumlah laporan minimal 1',
                    },
                    required: 'Masukan Jumlah Laporan',
                  })}
                  error={errors.jumlah_laporan}
                />
                <SelectInputField
                  label="Jenis Audit *"
                  identiti="jenisAudit"
                  name="jenisAudit"
                  options={optionsJenisAudit}
                  placeholder="Tentukan Jenis Audit"
                  register={register('id_jenis_audit', {
                    required: 'Masukan jenis Audit',
                  })}
                  error={errors.id_jenis_audit}
                  type="select"
                />
              </div>

              <div>
                <TextAreaFieldComponent
                  rows={5}
                  label="Keterangan *"
                  identiti="keterangan"
                  name="keterangan"
                  placeholder="Masukan Keterangan ST"
                  type="text"
                  register={register('keterangan', {
                    required: 'Masukan Keterangan',
                    minLength: {
                      value: 10,
                      message: 'Keterangan minimal 10 karakter',
                    },
                  })}
                  error={errors.keterangan}
                />
              </div>
            </div>
          )}

          {/* Dokumen */}
          {activeTab === 'dokumen' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
                <FaFileAlt className="mr-2" /> Dokumen Surat Tugas
              </h3>

              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <div>
                  <label className="font-medium text-gray-700 block mb-2">
                    Metode Upload Surat Tugas *
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="uploadOption"
                        value="file"
                        checked={uploadOption === 'file'}
                        onChange={handleUploadOptionChange}
                        className="mr-2 text-primary"
                      />
                      <span>Unggah File</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="uploadOption"
                        value="link"
                        checked={uploadOption === 'link'}
                        onChange={handleUploadOptionChange}
                        className="mr-2 text-primary"
                      />
                      <span>Masukkan Link</span>
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  {uploadOption === 'file' ? (
                    <div className="space-y-2">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Upload File *
                        </label>
                        <input
                          type="file"
                          {...register('uploadFile', {
                            required: 'File Surat Tugas wajib diunggah',
                          })}
                          className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-primary file:text-white
                            hover:file:bg-lightprimary
                            transition-colors"
                        />
                        {errors.uploadFile && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.uploadFile.message}
                          </p>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        Format yang didukung: PDF, DOCX, XLSX. Ukuran maksimal:
                        5MB
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <InputFieldComponent
                        label="Masukan Link Suresman *"
                        identiti="linkStSuresman"
                        name="linkStSuresman"
                        placeholder="Masukan Link Suresman ST"
                        type="url"
                        register={register('link_st', {
                          required: 'Masukan Link ST',
                          pattern: {
                            value: /^https?:\/\/.+/i,
                            message: 'Mohon masukkan link yang valid',
                          },
                        })}
                        error={errors.link_st}
                      />
                      <p className="text-sm text-gray-500">
                        Pastikan link dapat diakses oleh pihak yang berwenang
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardComponents>

        <div className="flex justify-between items-center mt-6">
          <div className="flex gap-3">
            {activeTab !== 'informasi' && (
              <button
                type="button"
                onClick={() => {
                  const tabs = ['informasi', 'tim', 'audit', 'dokumen'];
                  const currentIndex = tabs.indexOf(activeTab);
                  setActiveTab(tabs[currentIndex - 1]);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Kembali
              </button>
            )}

            {activeTab !== 'dokumen' && (
              <button
                type="button"
                onClick={() => {
                  const tabs = ['informasi', 'tim', 'audit', 'dokumen'];
                  const currentIndex = tabs.indexOf(activeTab);
                  setActiveTab(tabs[currentIndex + 1]);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Lanjut
              </button>
            )}
          </div>

          <Button
            type="submit"
            disabled={!isFormValid}
            className={`transition-colors font-medium ${
              isFormValid
                ? 'bg-primary text-white hover:bg-lightprimary'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <TbSend2 className="mr-1" />
            Buat Surat Tugas
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InputSuratTugas;
