'use client';
import React from 'react';
import { CardComponents } from '../../Global/Card';
import { InputFieldComponent, SelectInputField } from '../../Global/Input';
import { ButtonType } from '../../Global/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  FormTemuanHasil,
  TemuanHasilData,
} from '@/interface/interfaceTemuanHasil';
import { AxiosService } from '@/services/axiosInstance.service';
import { useAuthStore } from '@/middleware/Store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useOptions } from '@/data/selectValue';
import TemuanChecker from '@/app/dashboard/pelaporan/ringkasanpengawasan/[id_st]/temuanChecker';
import Swal from 'sweetalert2';
import { useFetchAll } from '@/hooks/useFetchAll';
import { useFetchById } from '@/hooks/useFetchById';
import { SuratTugasData } from '@/interface/interfaceSuratTugas';

interface CompoProps {
  id_st: number;
}

const axiosSecvice = new AxiosService();

const InputRingkasanPengawasan: React.FC<CompoProps> = ({ id_st }) => {
  const { user } = useAuthStore();
  const router = useRouter();
  const { data: DataTemuanHasil, refetch } =
    useFetchAll<TemuanHasilData>('temuan_hasil');

  const TemuanFilterID = DataTemuanHasil.filter(
    (item) => item.id_st === Number(id_st)
  );

  const { data: DataStCheck } = useFetchById<SuratTugasData>(
    'surat_tugas',
    id_st
  );

  const { optionKodeReferensi, optionKodeRekomendasi, optionKodeTemuan } =
    useOptions();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormTemuanHasil>({
    defaultValues: {
      kondisi_temuan: '',
      uraian: '',
    },
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<FormTemuanHasil> = async (data) => {
    try {
      const FielsTemuanHasil: FormTemuanHasil = {
        // id_kode_referensi: Number(data.id_kode_referensi),
        // id_kode_rekomendasi: Number(data.id_kode_rekomendasi),
        id_kode_temuan: Number(data.id_kode_temuan),
        id_st: Number(id_st),
        id_user: Number(user?.id_user),
        // nilai_rekomendasi: Number(data.nilai_rekomendasi),
        kondisi_temuan: data.kondisi_temuan,
        // rekomendasi_saran: data.rekomendasi_saran,
        uraian: data.uraian,
      };
      console.log('Data yang dikirim:', FielsTemuanHasil);
      const result = await axiosSecvice.addData(
        '/temuan_hasil',
        FielsTemuanHasil
      );

      console.log('Respons dari server:', result);

      if (result.success) {
        console.log('Temuan Hasil berhasil disimpan:', result);
        Swal.fire({
          title: 'Berhasil!',
          text: 'Data Temuan Hasil berhasil disimpan. Apakah Anda ingin menginput data lagi?',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Input Lagi',
          cancelButtonText: 'Selesai',
        }).then((result) => {
          if (result.isConfirmed) {
            reset(); // Reset the form to allow new input
          } else {
            router.push('/dashboard/pelaporan/ringkasanpengawasan');
          }
        });
        refetch();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Gagal menyimpan data Jenis Pengawasan');
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xl">Input Temuan Hasil.</h3>

      <CardComponents>
        <h3>Data Surat Tugas</h3>
        <section className="grid lg:grid-cols-3 w-full gap-2">
          {/* <div >
            <small>Bulan</small>
            <p className='text-dark font-semibold'>{DataStCheck?.bulan}</p>
          </div> */}
          <div>
            <small>Nomor St</small>
            <p className="text-dark font-semibold">{DataStCheck?.no_tglsp}</p>
          </div>
          <div>
            <small>Program Audit</small>
            <p className="text-dark font-semibold">
              {DataStCheck?.program_audit}
            </p>
          </div>
          <div>
            <small>Keterangan</small>
            <p className="text-dark font-semibold">{DataStCheck?.keterangan}</p>
          </div>
        </section>
      </CardComponents>

      <CardComponents>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <h3>Form Ringkasan Temuan</h3>
          <section className="grid grid-cols-1 gap-3">
            <InputFieldComponent
              label="Uraian, Audit, Nomor dan Tgl LHP"
              identiti="uraian"
              name="uraian"
              placeholder="Masukan Uraian, Audit, Nomor dan Tgl LHP "
              type="text"
              register={register('uraian', {
                required: 'Masukan Uraian Temuan Hasil',
              })}
              error={errors.uraian}
            />
          </section>
          <h3>Kondisi Temuan</h3>
          <section className="grid lg:grid-cols-3 gap-3">
            <SelectInputField
              label="Kode Temuan"
              identiti="kodeTemuan"
              options={optionKodeTemuan}
              register={register('id_kode_temuan', {
                required: 'pilih Kode Temuan',
              })}
              placeholder="Pilih Kode Temuan"
              // error={errors.JenisPengawasan}
              type="select"
              name="kodeTemuan"
              error={errors.id_kode_temuan}
            />
            <div className="lg:col-span-2">
              <InputFieldComponent
                label="Kondisi Temuan"
                identiti="kondisiTemuan"
                name="kondisiTemuan"
                placeholder="Masukan Kondisi Temuan"
                type="text"
                register={register('kondisi_temuan', {
                  required: 'Masukan kondisi temuan',
                })}
                error={errors.kondisi_temuan}
              />
            </div>
          </section>
          <ButtonType Text="+ Buat Ringkasan Pengawasan" type="submit" />
        </form>
      </CardComponents>
      <TemuanChecker
        DataTemuanHasil={TemuanFilterID}
        refetchData={() => refetch()}
      />
    </div>
  );
};

export default InputRingkasanPengawasan;
