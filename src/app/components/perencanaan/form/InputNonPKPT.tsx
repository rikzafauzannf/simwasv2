'use client';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CardComponents } from '../../Global/Card';
import { InputFieldComponent, SelectInputField } from '../../Global/Input';
import { ButtonType } from '../../Global/Button';
import { useTeamStore } from '@/middleware/Store/useTeamStore';
import { FaTrash } from 'react-icons/fa';
import { title } from 'process';

interface PKPTFormData {
  JenisPengawasan: string;
  AreaPengawasan: string;
  RuangLingkup: string;
  TujuanSasaran: string;
  RencanaPenugasan: string;
  RencanaPenerbitan: string;
  PenanggungJawab: string;
  WakilPenanggungJawab: string;
  Supervisor: string;
  KetuaTIM: string;
  ATim: string;
  Jumlah: number;
  Anggaran?: number;
  JumlahLaporan: number;
  SaranaDanPrasarana?: number;
  TingkatRisiko: string;
  Keterangan?: string;
  JenisLaporan: string;
}

const InputNonPKPT = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PKPTFormData>({
    defaultValues: {
      JenisPengawasan: '',
      AreaPengawasan: '',
      RuangLingkup: '',
      TujuanSasaran: '',
      RencanaPenugasan: '',
      RencanaPenerbitan: '',
      PenanggungJawab: '',
      WakilPenanggungJawab: '',
      Supervisor: '',
      KetuaTIM: '',
      ATim: '',
      Jumlah: 0,
      JumlahLaporan: 0,
      TingkatRisiko: '',
      JenisLaporan: '',
    },
    mode: 'onBlur',
  });
  const optionsJenisLaporan = [
    { value: 'LHP', title: 'LHP' },
    { value: 'LHA', title: 'LHA' },
    { value: 'LHM', title: 'LHM' },
    { value: 'LHE', title: 'LHE' },
    { value: 'LHR', title: 'LHR' },
  ];

  const { teamMembers, addTeamMember, removeTeamMember } = useTeamStore();
  const [newMember, setNewMember] = React.useState('');

  const onSubmit: SubmitHandler<PKPTFormData> = async (data) => {
    try {
      // Here you would add your Firebase logic
      console.log('Form data:', data);
      console.log('Team members:', teamMembers);

      // Reset form after successful submission
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMember.trim()) {
      addTeamMember(newMember.trim());
      setNewMember('');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Data PKPT */}
      <CardComponents>
        <h3>Data Non-PKPT</h3>
        <section className="grid md:grid-cols-2 w-full gap-3">
          <InputFieldComponent
            label="Area Pengawasan"
            identiti="area"
            type="text"
            name="AreaPengawasan"
            placeholder="Masukan Area Pengawasan"
            register={register('AreaPengawasan', {
              required: 'Area Pengawasan wajib diisi',
            })}
            error={errors.AreaPengawasan}
          />
          <SelectInputField
            label="Jenis Pengawasan"
            identiti="select-field-pengawasan"
            options={optionsJenisLaporan}
            register={register('JenisPengawasan')}
            placeholder="Pilih Jenis Pengawasan"
            error={errors.JenisPengawasan}
            type="select"
            name="JenisPengawasan"
          />
          <InputFieldComponent
            label="Ruang Lingkup"
            identiti="rLingkup"
            type="text"
            name="RuangLingkup"
            placeholder="Masukan Ruang Lingkup Pengawasan"
            register={register('RuangLingkup')}
            error={errors.RuangLingkup}
          />
          <InputFieldComponent
            label="Tujuan / Sasaran"
            identiti="tSasaran"
            type="text"
            name="TujuanSasaran"
            placeholder="Masukan Tujuan / Sasaran pengawasan"
            register={register('TujuanSasaran')}
            error={errors.TujuanSasaran}
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
            register={register('RencanaPenugasan', {
              required: 'Rencana Penugasan wajib diisi',
            })}
            error={errors.RencanaPenugasan}
          />
          <InputFieldComponent
            label="Rencana Penerbitan"
            identiti="rPenerbitan"
            type="date"
            name="RencanaPenerbitan"
            placeholder="Tentukan rencana Penerbitan"
            register={register('RencanaPenerbitan', {
              required: 'Rencana Penerbitan wajib diisi',
            })}
            error={errors.RencanaPenerbitan}
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
            type="text"
            name="PenanggungJawab"
            placeholder="Tentukan penanggung jawab"
            register={register('PenanggungJawab', {
              required: 'Penanggung Jawab wajib diisi',
              minLength: { value: 1, message: 'Minimal 1 karakter' },
              // pattern: {
              //   value: /^[a-zA-Z\s]*$/,
              //   message: 'Hanya boleh berisi huruf dan spasi',
              // },
            })}
            error={errors.PenanggungJawab}
          />
          <InputFieldComponent
            label="Wakil Penanggung Jawab"
            identiti="wPenanggungJawab"
            type="text"
            name="WakilPenanggungJawab"
            placeholder="Tentukan wakil penanggung jawab"
            register={register('WakilPenanggungJawab', {
              required: 'Wakil Penanggung Jawab wajib diisi',
              minLength: { value: 1, message: 'Minimal 1 karakter' },
              // pattern: {
              //   value: /^[a-zA-Z\s]*$/,
              //   message: 'Hanya boleh berisi huruf dan spasi',
              // },
            })}
            error={errors.WakilPenanggungJawab}
          />
          <InputFieldComponent
            label="Pengendali Teknis/Supervisor"
            identiti="pengendaliTeknis"
            type="text"
            name="Supervisor"
            placeholder="Tentukan pengendali teknis"
            register={register('Supervisor', {
              required: 'Supervisor wajib diisi',
              minLength: { value: 1, message: 'Minimal 1 karakter' },
              // pattern: {
              //   value: /^[a-zA-Z\s]*$/,
              //   message: 'Hanya boleh berisi huruf dan spasi',
              // },
            })}
            error={errors.Supervisor}
          />
          <InputFieldComponent
            label="Ketua TIM"
            identiti="ketuaTim"
            type="text"
            name="KetuaTIM"
            placeholder="Tentukan ketua tim"
            register={register('KetuaTIM', {
              required: 'Ketua TIM wajib diisi',
              minLength: { value: 1, message: 'Minimal 1 karakter' },
              // pattern: {
              //   value: /^[a-zA-Z\s]*$/,
              //   message: 'Hanya boleh berisi huruf dan spasi',
              // },
            })}
            error={errors.KetuaTIM}
          />
          <InputFieldComponent
            label="AnggotaTIM"
            identiti="ATim"
            type="text"
            name="ATim"
            placeholder="Masukan Anggota Tim"
            register={register('ATim', {
              required: 'Anggota TIM wajib diisi',
              minLength: { value: 1, message: 'Minimal 1 karakter' },
              // pattern: {
              //   value: /^[a-zA-Z\s]*$/,
              //   message: 'Hanya boleh berisi huruf dan spasi',
              // },
            })}
            error={errors.ATim}
          />
          <InputFieldComponent
            label="Jumlah"
            identiti="Jumlah"
            type="number"
            name="Jumlah"
            placeholder="Jumlah TIM"
            register={register('Jumlah', {
              required: 'Jumlah wajib diisi',
              min: { value: 1, message: 'Minimal 1 orang' },
              validate: (value) =>
                Number.isInteger(Number(value)) ||
                'Jumlah harus berupa bilangan bulat',
            })}
            error={errors.Jumlah}
          />
          <div className="col-span-2">
            <div className="flex flex-col space-y-2">
              <label htmlFor="Tim" className="text-slate-800">
                TIM
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
                  placeholder="Masukkan nama anggota tim"
                  className="border border-b-2 border-t-0 border-l-0 border-r-0 shadow-md border-slate-600 text-black bg-slate-200/25 flex-1"
                />
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
            <div className="mt-4 space-y-2">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between bg-slate-100 p-2 rounded-md"
                >
                  <span>{member.name}</span>
                  <button
                    onClick={() => removeTeamMember(member.id)}
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
        <section className="md:grid md:grid-cols-2 gap-3">
          <InputFieldComponent
            label="Anggaran (Opsional)"
            identiti="Anggaran"
            type="number"
            name="Anggaran"
            placeholder="Masukan total anggaran"
            register={register('Anggaran', {
              min: { value: 0, message: 'Anggaran tidak boleh negatif' },
              validate: (value) =>
                !value ||
                Number.isInteger(Number(value)) ||
                'Anggaran harus berupa bilangan bulat',
            })}
            error={errors.Anggaran}
          />
          <div className="flex justify-start items-baseline gap-3">
            <div className="flex-1">
              <InputFieldComponent
                label="Jumlah Laporan"
                identiti="jLaporan"
                type="number"
                name="JumlahLaporan"
                placeholder="Masukan jumlah laporan"
                register={register('JumlahLaporan', {
                  required: 'Jumlah Laporan wajib diisi',
                  min: { value: 1, message: 'Minimal 1 laporan' },
                  validate: (value) =>
                    Number.isInteger(Number(value)) ||
                    'Jumlah laporan harus berupa bilangan bulat',
                })}
                error={errors.JumlahLaporan}
              />
            </div>
            <SelectInputField
              label="Jenis Laporan"
              identiti="select-field"
              options={optionsJenisLaporan}
              register={register('JenisLaporan')}
              placeholder="Pilih Jenis Laporan"
              error={errors.JenisLaporan}
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
            error={errors.SaranaDanPrasarana}
          />
          <InputFieldComponent
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
          />
          <div className="md:col-span-2">
            <InputFieldComponent
              label="Keterangan (Opsional)"
              identiti="keterangan"
              type="text"
              name="Keterangan"
              placeholder="Masukan keterangan jika diperlukan"
              register={register('Keterangan')}
              error={errors.Keterangan}
            />
          </div>
        </section>
      </CardComponents>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <ButtonType Text="Ulangi" type="reset" />
        <ButtonType Text="Simpan Data" type="submit" />
      </section>
    </form>
  );
};

export default InputNonPKPT;
