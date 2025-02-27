'use client';
import React from 'react';
import { CardComponents } from '../../Global/Card';
import { InputFieldComponent, SelectInputField } from '../../Global/Input';
import { ButtonType } from '../../Global/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  FormRekomendasiTemuan,
  FormTemuanHasil,
  RekomendasiData,
  TemuanHasilData,
} from '@/interface/interfaceTemuanHasil';
import { AxiosService } from '@/services/axiosInstance.service';
import { useAuthStore } from '@/middleware/Store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useOptions } from '@/data/selectValue';
import Swal from 'sweetalert2';
import { useFetchAll } from '@/hooks/useFetchAll';
import { useFetchById } from '@/hooks/useFetchById';
import RekomendasiChecker from '@/app/dashboard/pelaporan/ringkasanpengawasan/form/[id_st]/[id_temuan]/rekomendasiChecker';

interface CompoProps {
  id_temuan: number;
}

const axiosSecvice = new AxiosService();

const InputRekomendasi: React.FC<CompoProps> = ({ id_temuan }) => {
  const { user } = useAuthStore();
  const router = useRouter();
  const { data: DataByIdTemuan, refetch } = useFetchAll<RekomendasiData>(
    'rekomendasi',  
  );
  const dataFilter = DataByIdTemuan.filter((itemFilter)=>itemFilter.id_tlhp === Number(id_temuan))
  console.log("Data Rekomendasi By Temuan: ",dataFilter)

  const { optionKodeRekomendasi, optionKodeTemuan } = useOptions();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormRekomendasiTemuan>({
    defaultValues: {},
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<FormRekomendasiTemuan> = async (data) => {
    try {
      const FieldHasilRekomendasi: FormRekomendasiTemuan = {
        id_kode_rekomendasi: Number(data.id_kode_rekomendasi),
        id_tlhp: Number(id_temuan),
        id_user: Number(user?.id_user),
        rekomendasi_nilai: Number(data.rekomendasi_nilai),
        rekomendasi_saran: data.rekomendasi_saran,
      };
      console.log('Data yang dikirim:', FieldHasilRekomendasi);
      const result = await axiosSecvice.addData(
        '/rekomendasi',
        FieldHasilRekomendasi
      );

      console.log('Respons dari server:', result);

      if (result.success) {
        console.log('Data Rekomendasi berhasil disimpan:', result);
        Swal.fire({
          title: 'Berhasil!',
          text: 'Data Data Rekomendasi berhasil disimpan. Apakah Anda ingin menginput data lagi?',
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
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <h3>Form Ringkasan Temuan</h3>
          <section className="grid lg:grid-cols-3 gap-3">
            <SelectInputField
              label="Kode Rekomendasi"
              identiti="koderekomendasi"
              options={optionKodeRekomendasi}
              register={register('id_kode_rekomendasi', {
                required: 'pilih Kode Rekomendasi',
              })}
              placeholder="Pilih Kode Rekomendasi"
              // error={errors.JenisPengawasan}
              type="select"
              name="kodeRekomendasi"
              error={errors.id_kode_rekomendasi}
            />
            <InputFieldComponent
              label="Rekomendasi/Saran"
              identiti="Rekomendasi"
              name="Rekomendasi"
              placeholder="Masukan Rekomendasi, Audit, Nomor dan Tgl LHP "
              type="text"
              register={register('rekomendasi_saran', {
                required: 'Masukan Rekomendasi Temuan Hasil',
              })}
              error={errors.rekomendasi_saran}
            />
            <InputFieldComponent
              label="Nilai Rekomendasi"
              identiti="nilairekomendasi"
              name="nilairekomendasi"
              placeholder="Masukan Nilai Rekomendasi"
              type="text"
              register={register('rekomendasi_nilai', {
                required: 'Masukan Nilai Rekomendasi',
              })}
              error={errors.rekomendasi_nilai}
            />
          </section>
          <ButtonType Text="+ Buat Rekomendasi" type="submit" />
        </form>
      </CardComponents>
      <RekomendasiChecker RekomendasiData={dataFilter} refetchData={() => refetch()}/>
    </div>
  );
};

export default InputRekomendasi;
