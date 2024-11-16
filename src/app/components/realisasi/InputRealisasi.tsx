'use client';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CardComponents } from '../Global/Card';
import { InputFieldComponent } from '../Global/Input';
import { ButtonType } from '../Global/Button';

interface Props {
  id: number;
}

interface RealisasiFormData {
  PAudit: string;
  JSuratTugas: number;
  Bulan: string;
  NTglSp: string;
  WPenugasan: string;
  TPemeriksa: string;
  PTeknis: string;
  KTim: string;
  ATim: string;
  JObjekPengawasan: number;
  JLaporan: number;
}

const InputRealisasi: React.FC<Props> = ({ id }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RealisasiFormData>({
    defaultValues: {
      PAudit: '',
      JSuratTugas: 0,
      Bulan: '',
      NTglSp: '',
      WPenugasan: '',
      TPemeriksa: '',
      PTeknis: '',
      KTim: '',
      ATim: '',
      JObjekPengawasan: 0,
      JLaporan: 0,
    },
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<RealisasiFormData> = async (data) => {
    try {
      console.log('Form data:', data);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      {/* input realisasi pkpt */}
      <CardComponents>
        <h3 className="mb-3">Realisasi PKPT</h3>
        <div className="md:grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <InputFieldComponent
              label="Program Audit / Kegiatan"
              identiti="PAudit"
              name="PAudit"
              placeholder="Tentukan Program Audit"
              type="text"
              register={register('PAudit', {
                required: 'Program Audit wajib diisi',
              })}
              error={errors.PAudit}
            />
          </div>
          <InputFieldComponent
            label="Jumlah Surat Tugas"
            identiti="JSuratTugas"
            name="JSuratTugas"
            placeholder="Masukan Jumlah Surat Tugas"
            type="number"
            register={register('JSuratTugas', {
              required: 'Jumlah Surat Tugas wajib diisi',
              min: { value: 1, message: 'Minimal 1 surat tugas' },
            })}
            error={errors.JSuratTugas}
          />
          <InputFieldComponent
            label="Bulan"
            identiti="Bulan"
            name="Bulan"
            placeholder="Tentukan Bulan"
            type="text"
            register={register('Bulan', {
              required: 'Bulan wajib diisi',
            })}
            error={errors.Bulan}
          />
          <InputFieldComponent
            label="No/Tgl SP"
            identiti="NTglSp"
            name="NTglSp"
            placeholder="Tentukan Nomor/Tanggal SP"
            type="text"
            register={register('NTglSp', {
              required: 'Nomor/Tanggal SP wajib diisi',
            })}
            error={errors.NTglSp}
          />
          <InputFieldComponent
            label="Waktu Penugasan"
            identiti="WPenugasan"
            name="WPenugasan"
            placeholder="Tentukan waktu penugasan"
            type="time"
            register={register('WPenugasan', {
              required: 'Waktu penugasan wajib diisi',
            })}
            error={errors.WPenugasan}
          />
        </div>
      </CardComponents>
      {/* tim st */}
      <CardComponents>
        <h3 className="mb-3">TIM ST</h3>
        <div className="md:grid grid-cols-2 gap-3">
          <InputFieldComponent
            label="Tim Pemeriksa / Pelaksana Kegiatan"
            identiti="TPemeriksa"
            name="TPemeriksa"
            placeholder="Tentukan Tim Pemeriksa"
            type="text"
            register={register('TPemeriksa', {
              required: 'Tim Pemeriksa wajib diisi',
            })}
            error={errors.TPemeriksa}
          />
          <InputFieldComponent
            label="Pengendali Teknis / Supervisor"
            identiti="PTeknis"
            name="PTeknis"
            placeholder="Tentukan Pengendali Teknis"
            type="text"
            register={register('PTeknis', {
              required: 'Pengendali Teknis wajib diisi',
            })}
            error={errors.PTeknis}
          />
          <InputFieldComponent
            label="Ketua TIM"
            identiti="KTim"
            name="KTim"
            placeholder="Tentukan Ketua TIM"
            type="text"
            register={register('KTim', {
              required: 'Ketua TIM wajib diisi',
            })}
            error={errors.KTim}
          />
          <InputFieldComponent
            label="Anggota TIM"
            identiti="ATim"
            name="ATim"
            placeholder="Tentukan Anggota TIM"
            type="text"
            register={register('ATim', {
              required: 'Anggota TIM wajib diisi',
            })}
            error={errors.ATim}
          />
        </div>
      </CardComponents>
      {/* jumlah objek laporan */}
      <CardComponents>
        <h3 className="mb-3">Jumlah Objek dan Laporan</h3>
        <div className="md:grid grid-cols-2 gap-3">
          <InputFieldComponent
            label="Jumlah Objek Pengawasan"
            identiti="JObjekPengawasan"
            name="JObjekPengawasan"
            placeholder="Tentukan Jumlah Objek Pengawasan"
            type="number"
            register={register('JObjekPengawasan', {
              required: 'Jumlah Objek Pengawasan wajib diisi',
              min: { value: 1, message: 'Minimal 1 objek' },
            })}
            error={errors.JObjekPengawasan}
          />
          <InputFieldComponent
            label="Jumlah Laporan"
            identiti="JLaporan"
            name="JLaporan"
            placeholder="Tentukan Jumlah Laporan"
            type="number"
            register={register('JLaporan', {
              required: 'Jumlah Laporan wajib diisi',
              min: { value: 1, message: 'Minimal 1 laporan' },
            })}
            error={errors.JLaporan}
          />
        </div>
      </CardComponents>
      {/* button action */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <ButtonType Text="Ulangi" type="reset" />
        <ButtonType Text="Simpan Data" type="submit" />
      </section>
    </form>
  );
};

export default InputRealisasi;
