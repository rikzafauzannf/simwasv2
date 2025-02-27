'use client';
import { ButtonType } from '@/app/components/Global/Button';
import { CardComponents } from '@/app/components/Global/Card';
import { InputFieldComponent } from '@/app/components/Global/Input';
import { useFetchAll } from '@/hooks/useFetchAll';
import { useFetchById } from '@/hooks/useFetchById';
import { FormRekapTemuan } from '@/interface/interfaceRekapTemuan';
import { TemuanHasilData } from '@/interface/interfaceTemuanHasil';
import { FormTindakLanjut } from '@/interface/interfaceTindakLanjut';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import { useAuthStore } from '@/middleware/Store/useAuthStore';
import { AxiosService } from '@/services/axiosInstance.service';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface PageProps {
  params: {
    id_tlhp: number;
  };
}

const axiosSecvice = new AxiosService();

const RekapTemuanFormPage: React.FC<PageProps> = ({ params }) => {
  const id_tlhp = params.id_tlhp;
  const { user } = useAuthStore();
  const route = useRouter();
  const { data: DataTemuanHasil } = useFetchById<TemuanHasilData>(
    'temuan_hasil',
    id_tlhp
  );
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormRekapTemuan>({
    defaultValues: {},
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<FormRekapTemuan> = async (data) => {
    try {
      const DataRekapDeliver: FormRekapTemuan = {
        id_tlhp: Number(id_tlhp),
        id_user: Number(user?.id_user),
        jumlah_kejadian: Number(data.jumlah_kejadian),
        nilai_rp: Number(data.nilai_rp),
        persentase: Number(data.persentase),
      };
      console.log('Data yang dikirim:', DataRekapDeliver);
      const result = await axiosSecvice.addData(
        '/rekap_temuan',
        DataRekapDeliver
      );

      console.log('Respons dari server:', result);

      if (result.success) {
        console.log('Rekap Temuan berhasil disimpan:', result);
        reset();
        alert('Data Rekap Temuan berhasil disimpan');
        route.push('/dashboard/pelaksanaan/rekaptemuan');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Gagal menyimpan data Rekap Temuan');
    }
  };
  return (
    <AuthRoleWrapper allowedRoles={['Pelaksana', 'Auditor']}>
      <div className="space-y-3">
        <h3 className="text-xl">Rekap Temuan</h3>
        <CardComponents>
          <h1>#{DataTemuanHasil?.kondisi_temuan}</h1>
          <div className="grid grid-cols-2 gap-2">
            {/* <div>
              <p>Rekomendasi dan Saran</p>
              <h3>{DataTemuanHasil?.rekomendasi_saran}</h3>
            </div>
            <div>
              <p>Nilai Rekomendasi</p>
              <h3>{DataTemuanHasil?.nilai_rekomendasi}</h3>
            </div> */}
          </div>
          <hr />
          <h2>
            {'>>'} {DataTemuanHasil?.uraian}
          </h2>
        </CardComponents>
        <CardComponents>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid md:grid-cols-2 gap-3 w-full"
          >
            <InputFieldComponent
              label="Jumlah Kejadian"
              identiti="jumlah_kejadian"
              type="text"
              name="jumlah_kejadian"
              placeholder="Tentukan Jumlah Kejadian"
              register={register('jumlah_kejadian', {
                required: 'Jumlah Kejadian Wajib diisi',
              })}
              error={errors.jumlah_kejadian}
            />

            <div className="flex justify-start items-center gap-3 w-full">
              <div className="flex-1">
                <InputFieldComponent
                  label="Persentase"
                  identiti="persentase"
                  type="range"
                  name="persentase"
                  placeholder="Masukan Persentase"
                  register={register('persentase', {
                    required: 'Tentuka Range persentase temuan',
                    valueAsNumber: true,
                  })}
                  error={errors.persentase}
                />
              </div>
              <h1>{watch('persentase')}%</h1>
            </div>

            <div className="col-span-2">
              <InputFieldComponent
                label="Nilai Rupiah"
                identiti="nilai_rp"
                type="text"
                name="nilai_rp"
                placeholder="Masukan Nilai Rupiaj yang ditemukan"
                register={register('nilai_rp', {
                  required: 'NIlai Rupiah wajib diisi',
                })}
                error={errors.nilai_rp}
              />
            </div>
            <div className="md:col-span-2">
              <ButtonType type="submit" Text="Buat Rekap Temuan" />
            </div>
          </form>
        </CardComponents>
      </div>
    </AuthRoleWrapper>
  );
};

export default RekapTemuanFormPage;
