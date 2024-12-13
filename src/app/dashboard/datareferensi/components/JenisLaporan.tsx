'use client';
import { ButtonType } from '@/app/components/Global/Button';
import { CardComponents } from '@/app/components/Global/Card';
import { InputFieldComponent } from '@/app/components/Global/Input';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FirestoreService } from '@/services/firestore.service';
import { JenisLaporanDB } from '@/interface/interfaceReferensi';
import { useFetch } from '@/hooks/useFetch';
import { AxiosService } from '@/services/axiosInstance.service';
import { useFetchAll } from '@/hooks/useFetchAll';

const axiosService = new AxiosService();

const JenisLaporan = () => {
  const {
    data: DataJenisLaporan,
    isLoading,
    error,
    refetch,
  } = useFetchAll<JenisLaporanDB>('/jenis_laporan');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jenis_laporan: '',
      // keterangan: '',
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const onSubmit: SubmitHandler<{
    jenis_laporan: string;
    // keterangan: string;
  }> = async (data) => {
    try {
      const result = await axiosService.addData('jenis_laporan', {
        jenis_laporan: data.jenis_laporan,
        // keterangan: data.keterangan,
        // createdAt: new Date(),
      });

      if (result.success) {
        console.log('Jenis Laporan berhasil disimpan:', result);
        reset(); // Reset form after successful submission
        alert('Data Jenis Laporan berhasil disimpan');
        refetch(); // Refetch data to update the list
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Gagal menyimpan data Jenis Laporan');
    }
  };

  const handleDelete = async (id: number) => {
    if (
      window.confirm('Apakah Anda yakin ingin menghapus jenis laporan ini?')
    ) {
      try {
        const result = await axiosService.deleteData(`/jenis_laporan/${id}`);
        if (result.success) {
          alert('Jenis Laporan berhasil dihapus');
          refetch(); // Refetch data to update the list
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error('Error deleting jenis laporan:', error);
        alert('Gagal menghapus jenis laporan');
      }
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xl"># Jenis Laporan</h3>
      <CardComponents>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 w-full">
          <InputFieldComponent
            label="Jenis laporan"
            identiti="jenis_laporan"
            name="jenis_laporan"
            placeholder="Tuliskan Jenis Laporan"
            type="text"
            register={register('jenis_laporan', {
              required: 'Jenis laporan wajib diisi',
            })}
            error={errors.jenis_laporan}
          />

          {/* <div className="col-span-2">
            <InputFieldComponent
              label="Keterangan"
              identiti="keterangan"
              name="keterangan"
              placeholder="Tuliskan Keterangan"
              type="text"
              register={register('keterangan', {
                required: 'Keterangan wajib diisi',
              })}
              error={errors.keterangan}
            />
          </div> */}

          {/* <div className="col-span-3"> */}
          <ButtonType Text="+ Simpan Jenis Laporan" type="submit" />
          {/* </div> */}
        </form>
      </CardComponents>
      <section className="grid grid-cols-2 gap-3">
        {DataJenisLaporan.map((item) => (
          <CardComponents key={item.id}>
            <h3 className="text-xl font-bold">
              {'>>'} {item.jenis_laporan}
            </h3>
            {/* <p>{item.keterangan}</p> */}
            <button
              onClick={() => handleDelete(item.id)}
              className="py-2 text-center w-full rounded-md shadow-md bg-red-500 hover:bg-red-700 text-white font-semibold"
            >
              Hapus
            </button>
          </CardComponents>
        ))}
      </section>
    </div>
  );
};

export default JenisLaporan;
