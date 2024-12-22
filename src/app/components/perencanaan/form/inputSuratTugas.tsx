'use client';
import React, { useState } from 'react';
import {
  InputFieldComponent,
  SelectInputField,
  TextAreaFieldComponent,
} from '../../Global/Input';
import { ButtonType } from '../../Global/Button';
import { CardComponents } from '../../Global/Card';
import { useTeamStore } from '@/middleware/Store/useTeamStore';
import { FaTrash } from 'react-icons/fa';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  FormSuratTugas,
  SuratTugasData,
} from '@/interface/interfaceSuratTugas';
import { useFetch } from '@/hooks/useFetch';
import { JenisLaporanDB } from '@/interface/interfaceReferensi';
import { AxiosService } from '@/services/axiosInstance.service';
import { UserManageDB } from '@/interface/interfaceUserManage';

interface PropsID {
  id_pkpt: number;
}

const axiosSecvice = new AxiosService();

const InputSuratTugas: React.FC<PropsID> = ({ id_pkpt }) => {
  const { data: DataJenisLaporan } = useFetch<JenisLaporanDB>('jenis_laporan');
  const { data: DataUser } = useFetch<UserManageDB>('pengguna');
  const [uploadOption, setUploadOption] = useState('link');

  const handleUploadOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUploadOption(event.target.value);
  };

  const { teamMembers, addTeamMember, removeTeamMember, resetTeamMembers } =
    useTeamStore();
  const [newMemberId, setNewMemberId] = React.useState<number | string>('');

  const potentialMembers = DataUser.map((item) => ({
    id: item.id_user,
    name: item.username,
  }));

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
    formState: { errors },
  } = useForm<FormSuratTugas>({
    defaultValues: {
      bulan: '',
      link_st: '',
    },
    mode: 'onBlur',
  });

  const optionsJenisAudit = DataJenisLaporan.map((item) => ({
    value: String(item.id_jenis_laporan),
    title: `${item.jenis_laporan} - ${item.keterangan}`,
  }));

  const onSubmit: SubmitHandler<FormSuratTugas> = async (data) => {
    try {
      const dataST: FormSuratTugas = {
        id_user: 2,
        id_pkpt: Number(id_pkpt),
        anggota_tim: teamMembers.map((item) => String(item.id)).join(','),
        bulan: data.bulan,
        id_jenis_laporan: Number(data.id_jenis_laporan),
        jumlah_laporan: Number(data.jumlah_laporan),
        jumlah_objek: Number(data.jumlah_objek),
        keterangan: data.keterangan,
        ketua_tim: data.ketua_tim,
        link_st: data.link_st,
        no_tgllh: data.no_tgllh,
        no_tglsp: data.no_tglsp,
        pengendali_teknis: data.pengendali_teknis,
        program_audit: data.program_audit,
        tim_pemeriksa: data.tim_pemeriksa,
        waktu_penugasan: data.waktu_penugasan,
        wk_penanggung_jawab: data.wk_penanggung_jawab,
      };

      console.log('Send on porgress... ', dataST);
      const result = await axiosSecvice.addData('/surat_tugas', dataST);

      console.log('Respons dari server:', result);

      if (result.success) {
        console.log('Surat Tugas berhasil disimpan:', result);
        reset();
        alert('Data Surat Tugas berhasil disimpan');
        resetTeamMembers();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Gagal menyimpan data Jenis Pengawasan');
    }
  };

  return (
    <>
      <h3 className="text-xl mb-3">Penginputan Rekap Surat Tugas</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <CardComponents>
          <div className="space-y-3">
            <section className="grid grid-cols-2 gap-3">
              <InputFieldComponent
                label="Bulan"
                identiti="Bulan"
                name="bulan"
                placeholder="Masukan Bulan Penugasan"
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
                label="No/Tgl.SP"
                identiti="noTgl"
                name="noTgl"
                placeholder="Masukan Nomor/TGL.SP"
                type="text"
                register={register('no_tglsp', {
                  required: 'wajib mengisi NO/Tgl.Sp',
                })}
                error={errors.no_tglsp}
              />
              {/* <div className="col-span-2"> */}
              {/* <SelectInputField
                  label="Program Audit/Kegiatan"
                  identiti="programAudit"
                  name="programAugit"
                  options={optionsKegiatan}
                  placeholder="Tentukan Kegiatan"
                  register={'kegiatan'}
                  type="select"
                /> */}
              <InputFieldComponent
                label="Program Audit/Kegiatan"
                identiti="programAudit"
                name="programAudit"
                placeholder="Masukan Program Audit"
                type="text"
                register={register('program_audit', {
                  required: 'wajib untuk mengisi program audit',
                })}
                error={errors.program_audit}
              />
              <InputFieldComponent
                label="Waktu Penugasan"
                identiti="waktuPenugasan"
                name="waktuPenugasan"
                placeholder="Tentukan Waktu Penugasan"
                type="text"
                register={register('waktu_penugasan', {
                  required: 'wajib di isi berapa lama hari penugasan',
                })}
                error={errors.waktu_penugasan}
              />
              {/* </div> */}
            </section>
            <h3>Tim Audit</h3>
            <section className="grid md:grid-cols-2 gap-3">
              <InputFieldComponent
                label="Tim Pemeriksa/Pelaksana Kegiatan"
                identiti="timPemeriksa"
                name="timPemeriksa"
                placeholder="Tentukan Tim Pemeriksa"
                type="text"
                register={register('tim_pemeriksa', {
                  required: 'tentukan tim audit',
                })}
                error={errors.tim_pemeriksa}
              />
              <InputFieldComponent
                label="Irban/Wk.Penanggung Jawab"
                identiti="irbanwk"
                name="irbanwk"
                placeholder="Tentuakan Irban/Wk,Penanggung Jawab"
                type="text"
                register={register('wk_penanggung_jawab', {
                  required: 'Mohon untuk memasukan Irban/Wk.Penanggung Jawab',
                })}
                error={errors.wk_penanggung_jawab}
              />
              <InputFieldComponent
                label="Pengendali Teknis/Supervisor"
                identiti="pengendaliTeknis"
                name="pengendaliTeknis"
                placeholder="Tentukan Pengendali Teknis"
                type="text"
                register={register('pengendali_teknis', {
                  required: 'Pengendali Teknis wajib diisi',
                })}
              />
              <InputFieldComponent
                label="Ketua Tim"
                identiti="ketuaTIM"
                name="ketuaTIM"
                placeholder="Tentukan Ketua Tim"
                type="text"
                register={register('ketua_tim', {
                  required: 'Masukan Ketua Tim',
                })}
              />
              <div className="md:col-span-2">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="Tim" className="text-slate-800">
                    TIM [{teamMembers.length}]
                  </label>
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
            <h3>Audit</h3>
            <section className="grid grid-cols-2 gap-3">
              <InputFieldComponent
                label="Jumlah Objek Pengawasan"
                identiti="jumlahObjek"
                name="jumlahObjek"
                placeholder="Tentukan Jumlah Objek Pengawasan"
                type="number"
                register={register('jumlah_objek', {
                  min: 0,
                  required: 'Masukan jumlah objek',
                })}
                error={errors.jumlah_objek}
              />
              <InputFieldComponent
                label="Jumlah Laporan"
                identiti="jumlahLaporan"
                name="jumlahLaporan"
                placeholder="Tentukan Jumlah Laporan"
                type="number"
                register={register('jumlah_laporan', {
                  min: 0,
                  required: 'Masukan Jumlah Laporan',
                })}
              />
              <InputFieldComponent
                label="No.Tgl.LHP/LHE/LHR"
                identiti="noTglLh"
                name="noTglLh"
                placeholder="Tentukan No.Tgl.LHP/LHE/LHR"
                type="text"
                register={register('no_tgllh', {
                  required: 'Masukan No.TGL/LH....',
                })}
              />
              {/* <InputFieldComponent
                label="Jenis Audit"
                identiti="jenisAudit"
                name="jenisAudit"
                placeholder="Tentukan Jenis Audit"
                type="text"
                register={register('')}
              /> */}
              <SelectInputField
                label="Jenis Audit"
                identiti="jenisAudit"
                name="jenisAudit"
                options={optionsJenisAudit}
                placeholder="Tentukan Jenis Audit"
                register={register('id_jenis_laporan', {
                  required: 'Masukan jenis Audit',
                })}
                error={errors.id_jenis_laporan}
                type="select"
              />
              <TextAreaFieldComponent
                rows={5}
                label="Keterangan"
                identiti="keterangan"
                name="keterangan"
                placeholder="Masukan Keterangan ST"
                type="text"
                register={register('keterangan', {
                  required: 'Masukan Keterangan',
                })}
              />
              <div className="space-y-2">
                <label htmlFor="" className="text-slate-800">
                  Upload Surat Tugas
                </label>
                <br />
                <small>
                  Max file size is ... mb. File Support .pdf .xlcl .docx
                </small>
                <div className="flex justify-start gap-3">
                  <label>
                    <input
                      type="radio"
                      name="uploadOption"
                      value="file"
                      checked={uploadOption === 'file'}
                      onChange={handleUploadOptionChange}
                    />
                    Unggah File
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="uploadOption"
                      value="link"
                      checked={uploadOption === 'link'}
                      onChange={handleUploadOptionChange}
                    />
                    Masukkan Link
                  </label>
                </div>
                {/* <section className="flex gap-2 w-full"> */}
                {uploadOption === 'file' ? (
                  // <input type="file" name="fileUpload" />
                  <InputFieldComponent
                    label="Upload File"
                    identiti="uploadFile"
                    name="uploadFile"
                    placeholder="Upload File ST"
                    type="file"
                    register={'uploadFile'}
                  />
                ) : (
                  // <input type="text" name="linkInput" placeholder="Masukkan Link" />
                  <InputFieldComponent
                    label="Masukan Link Suresman"
                    identiti="linkStSuresman"
                    name="linkStSuresman"
                    placeholder="Masukan Link Suresman ST"
                    type="link"
                    register={register('link_st', {
                      required: 'Masukan Link ST',
                    })}
                    error={errors.link_st}
                  />
                )}
                {/* </section> */}
              </div>
            </section>
          </div>
        </CardComponents>
        <ButtonType Text="+ Buat Rekap Surat Tugas" type="submit" />
      </form>
    </>
  );
};

export default InputSuratTugas;
