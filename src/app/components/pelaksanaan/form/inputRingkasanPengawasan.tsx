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
import TemuanChecker from '@/app/dashboard/pelaporan/ringkasanpengawasan/form/temuanChecker';
import Swal from 'sweetalert2';
import { useFetchAll } from '@/hooks/useFetchAll';

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
      rekomendasi_saran: '',
      uraian: '',
      nilai_rekomendasi: 0,
    },
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<FormTemuanHasil> = async (data) => {
    try {
      const FielsTemuanHasil: FormTemuanHasil = {
        // id_kode_referensi: Number(data.id_kode_referensi),
        id_kode_referensi: 0,
        id_kode_rekomendasi: Number(data.id_kode_rekomendasi),
        id_kode_temuan: Number(data.id_kode_temuan),
        id_st: Number(id_st),
        id_user: Number(user?.id_user),
        nilai_rekomendasi: Number(data.nilai_rekomendasi),
        kondisi_temuan: data.kondisi_temuan,
        rekomendasi_saran: data.rekomendasi_saran,
        uraian: data.uraian,
      };
      console.log('Data yang dikirim:', FielsTemuanHasil);
      const result = await axiosSecvice.addData(
        '/temuan_hasil',
        FielsTemuanHasil
      );

      console.log('Respons dari server:', result);

      if (result.success) {
        console.log('Jenis Pengawasan berhasil disimpan:', result);
        Swal.fire({
          title: 'Berhasil!',
          text: 'Data Jenis Pengawasan berhasil disimpan. Apakah Anda ingin menginput data lagi?',
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
          <h3>Rekomendasi dan Sasaran</h3>
          <section className="grid lg:grid-cols-3 gap-3">
            <SelectInputField
              label="Kode Rekomendasi"
              identiti="kodeRekomendasi"
              options={optionKodeRekomendasi}
              register={register('id_kode_rekomendasi', {
                required: 'Pilih Kode Rekomendasi',
              })}
              placeholder="Pilih Kode Rekomendasi"
              // error={errors.JenisPengawasan}
              type="select"
              name="kodeRekomendasi"
              error={errors.id_kode_rekomendasi}
            />
            <div className="lg:col-span-2">
              <InputFieldComponent
                label="Nilai Rekomendasi Rp."
                identiti="nilaiRekomendasi"
                name="nilaiRekomendasi"
                placeholder="Masukan Nominal Rekomendasi"
                type="number"
                register={register('nilai_rekomendasi', {
                  min: 0,
                })}
              />
            </div>

            <div className="lg:col-span-3">
              <InputFieldComponent
                label="Rekomendasi/Saran"
                identiti="rekomendasiSaran"
                name="rekomendasiSaran"
                placeholder="Masukan Rekomendasi/Saran"
                type="text"
                register={register('rekomendasi_saran', {
                  required: 'Masukan Rekomendasi dan Saran',
                })}
                error={errors.rekomendasi_saran}
              />
              {/* <SelectInputField
                label="Kode Referensi"
                identiti="kodeReferensi"
                options={optionKodeReferensi}
                register={register('id_kode_referensi', {
                  required: 'Pilih Kode Referensi',
                })}
                error={errors.id_kode_referensi}
                placeholder="Pilih Kode Referensi"
                type="select"
                name="kodeReferensi"
              /> */}
            </div>

            {/* <InputFieldComponent
              label="Link Google Drive"
              identiti="link"
              name="link"
              placeholder="Masukan Nominal Rekomendasi"
              type="number"
              register={'link'}
            /> */}
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
